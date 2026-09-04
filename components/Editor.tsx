"use client";

import dynamic from "next/dynamic";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import "react-quill/dist/quill.snow.css";

/* =====================================================
   REACT QUILL

   IMPORTANT:
   dynamic() loses ReactQuill ref typing.

   Cast as any so ref works correctly.
===================================================== */

const ReactQuill = dynamic(
  () => import("react-quill"),
  {
    ssr: false,
  }
) as any;


/* =====================================================
   CLOUDINARY UPLOAD
===================================================== */

async function uploadToCloudinary(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed");
  }

  if (file.size > 2 * 1024 * 1024) {
    throw new Error("Image size must be under 2MB");
  }

  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const uploadPreset =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Cloudinary configuration is missing"
    );
  }

  const formData = new FormData();

  formData.append("file", file);

  formData.append(
    "upload_preset",
    uploadPreset
  );

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (
    !response.ok ||
    !data.secure_url
  ) {
    throw new Error(
      data?.error?.message ||
        "Cloudinary upload failed"
    );
  }

  return data.secure_url;
}


/* =====================================================
   QUILL CONFIG
===================================================== */

const modules = {
  toolbar: [
    [
      {
        header: [
          1,
          2,
          3,
          false,
        ],
      },
    ],

    [
      "bold",
      "italic",
      "underline",
    ],

    [
      {
        list: "ordered",
      },
      {
        list: "bullet",
      },
    ],

    [
      "blockquote",
    ],

    [
      "link",
      "image",
    ],

    [
      "clean",
    ],
  ],
};


const formats = [
  "header",

  "bold",
  "italic",
  "underline",

  "list",
  "bullet",

  "blockquote",

  "link",

  "image",
];


/* =====================================================
   EDITOR
===================================================== */

interface EditorProps {
  value?: string;
  onChange?: (value: string) => void;
}


export default function Editor({
  value,
  onChange,
}: EditorProps) {

  const quillRef =
    useRef<any>(null);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const savedSelectionRef =
    useRef<any>(null);


  const [ready, setReady] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);


  /* ===================================================
     SELECTED IMAGE
  =================================================== */

  const [selectedImage, setSelectedImage] =
    useState<{
      index: number;
      url: string;
      caption: string;
      alt: string;
    } | null>(null);


  const [caption, setCaption] =
    useState("");

  const [altText, setAltText] =
    useState("");


  /* ===================================================
     GET QUILL
  =================================================== */

  function getQuill() {
    try {
      if (!quillRef.current) {
        return null;
      }

      return quillRef.current.getEditor();

    } catch {
      return null;
    }
  }


  /* ===================================================
     EDITOR READY
  =================================================== */

  useEffect(() => {
    const timer =
      window.setInterval(() => {

        const quill =
          getQuill();

        if (quill) {
          setReady(true);

          window.clearInterval(timer);
        }

      }, 100);


    return () => {
      window.clearInterval(timer);
    };

  }, []);


  /* ===================================================
     SAVE SELECTION
  =================================================== */

  function saveSelection() {
    const quill =
      getQuill();

    if (!quill) {
      return;
    }

    try {
      const selection =
        quill.getSelection();

      if (selection) {
        savedSelectionRef.current =
          selection;
      }

    } catch {
      // Ignore
    }
  }


  /* ===================================================
     FIND IMAGE INDEX
  =================================================== */

  function getImageIndex(
    imageNode: HTMLImageElement
  ) {

    const quill =
      getQuill();

    if (!quill) {
      return -1;
    }

    try {

      const blot =
        quill.scroll.find(
          imageNode
        );

      if (!blot) {
        return -1;
      }

      return quill.getIndex(blot);

    } catch {
      return -1;
    }
  }


  /* ===================================================
     IMAGE CLICK
  =================================================== */

  function handleEditorClick(
    event: React.MouseEvent<HTMLDivElement>
  ) {

    const target =
      event.target as HTMLElement;

    if (
      target.tagName !== "IMG"
    ) {
      return;
    }


    const image =
      target as HTMLImageElement;

    const index =
      getImageIndex(image);

    if (index < 0) {
      return;
    }


    /*
      Look immediately after image
      for caption information.
    */

    const quill =
      getQuill();

    let existingCaption = "";
    let existingAlt = "";


    if (quill) {
      try {

        const delta =
          quill.getContents(
            index,
            3
          );

        const ops =
          delta?.ops || [];


        /*
          Caption is stored as
          the next text line.
        */

        for (const op of ops) {

          if (
            typeof op.insert ===
            "string"
          ) {

            const text =
              op.insert
                .replace(
                  /\n/g,
                  " "
                )
                .trim();

            if (text) {
              existingCaption =
                text;

              break;
            }

          }

        }

      } catch {
        // Ignore
      }
    }


    /*
      ALT TEXT
    */

    existingAlt =
      image.getAttribute("alt") ||
      "";


    setSelectedImage({
      index,

      url:
        image.getAttribute("src") ||
        "",

      caption:
        existingCaption,

      alt:
        existingAlt,
    });


    setCaption(
      existingCaption
    );

    setAltText(
      existingAlt
    );


    event.preventDefault();
  }


  /* ===================================================
     OPEN IMAGE PICKER
  =================================================== */

  function openImagePicker() {

    if (!ready) {

      window.alert(
        "Editor is still loading. Please wait."
      );

      return;
    }


    saveSelection();

    fileInputRef.current?.click();
  }


  /* ===================================================
     INSERT IMAGE
  =================================================== */

  async function insertImage(
    file: File
  ) {

    const quill =
      getQuill();

    if (!quill) {
      throw new Error(
        "Editor is not ready."
      );
    }


    let range =
      savedSelectionRef.current;


    if (!range) {
      range =
        quill.getSelection();
    }


    if (!range) {

      range = {
        index:
          Math.max(
            0,
            quill.getLength() - 1
          ),

        length: 0,
      };

    }


    const imageUrl =
      await uploadToCloudinary(
        file
      );


    quill.focus();


    quill.insertEmbed(
      range.index,
      "image",
      imageUrl,
      "user"
    );


    quill.insertText(
      range.index + 1,
      "\n",
      "user"
    );


    quill.setSelection(
      range.index + 2,
      0,
      "silent"
    );


    savedSelectionRef.current = {
      index:
        range.index + 2,

      length: 0,
    };


    /*
      Refresh parent value
    */

    if (onChange) {
      onChange(
        quill.root.innerHTML
      );
    }

  }


  /* ===================================================
     FILE UPLOAD
  =================================================== */

  async function handleImageUpload(
    event:
      React.ChangeEvent<HTMLInputElement>
  ) {

    const file =
      event.target.files?.[0];

    event.target.value = "";


    if (!file) {
      return;
    }


    if (!ready) {

      window.alert(
        "Editor is still loading."
      );

      return;
    }


    try {

      setUploading(true);

      await insertImage(file);

    }
    catch (error: any) {

      console.error(
        "Image upload failed:",
        error
      );

      window.alert(
        error?.message ||
          "Image upload failed"
      );

    }
    finally {

      setUploading(false);

    }

  }


  /* ===================================================
     QUILL IMAGE TOOLBAR
  =================================================== */

  useEffect(() => {

    if (!ready) {
      return;
    }


    const quill =
      getQuill();

    if (!quill) {
      return;
    }


    try {

      const toolbar =
        quill.getModule(
          "toolbar"
        );

      if (!toolbar) {
        return;
      }


      toolbar.addHandler(
        "image",
        () => {

          saveSelection();

          fileInputRef.current?.click();

        }
      );

    }
    catch (error) {

      console.error(
        "Toolbar setup failed:",
        error
      );

    }

  }, [ready]);


  /* ===================================================
     SAVE IMAGE DETAILS
  =================================================== */

  function saveImageDetails() {

    if (!selectedImage) {
      return;
    }


    const quill =
      getQuill();

    if (!quill) {
      return;
    }


    const index =
      selectedImage.index;


    /* -----------------------------------------------
       ALT TEXT
    ----------------------------------------------- */

    try {

      const leaf =
        quill.getLeaf(index);

      const imageNode =
        leaf?.[0]?.domNode;


      if (
        imageNode &&
        imageNode instanceof
          HTMLImageElement
      ) {

        imageNode.setAttribute(
          "alt",
          altText.trim()
        );

      }

    }
    catch {
      // Ignore
    }


    /* -----------------------------------------------
       CAPTION
    ----------------------------------------------- */

    try {

      const length =
        quill.getLength();

      const afterImage =
        Math.min(
          index + 1,
          length
        );


      /*
        Try to remove existing
        caption line.
      */

      const line =
        quill.getLine(
          afterImage
        );


      if (line) {

        const lineIndex =
          quill.getIndex(
            line[0]
          );

        const lineLength =
          line[1];

        const lineText =
          quill.getText(
            lineIndex,
            lineLength
          );


        if (
          lineText &&
          lineText.trim()
        ) {

          quill.deleteText(
            lineIndex,
            lineLength,
            "silent"
          );

        }

      }


      /*
        Insert new caption
      */

      if (
        caption.trim()
      ) {

        quill.insertText(
          afterImage,
          "\n" +
            caption.trim() +
            "\n",
          {
            italic: true,
          },
          "user"
        );

      }

    }
    catch (error) {

      console.error(
        "Caption save failed:",
        error
      );

    }


    /*
      Refresh React state.
    */

    if (onChange) {
      onChange(
        quill.root.innerHTML
      );
    }


    setSelectedImage(null);

    setCaption("");

    setAltText("");

  }


  /* ===================================================
     REMOVE IMAGE
  =================================================== */

  function removeSelectedImage() {

    if (!selectedImage) {
      return;
    }


    const quill =
      getQuill();

    if (!quill) {
      return;
    }


    const index =
      selectedImage.index;


    try {

      /*
        Remove image itself.
      */

      quill.deleteText(
        index,
        1,
        "user"
      );


      /*
        Remove immediate
        caption/newline if present.
      */

      const text =
        quill.getText(
          index,
          100
        );


      if (
        text.trim()
      ) {

        const newlineIndex =
          text.indexOf("\n");


        if (
          newlineIndex >= 0
        ) {

          quill.deleteText(
            index,
            newlineIndex + 1,
            "user"
          );

        }

      }


      if (onChange) {
        onChange(
          quill.root.innerHTML
        );
      }

    }
    catch (error) {

      console.error(
        "Image remove failed:",
        error
      );

    }


    setSelectedImage(null);

    setCaption("");

    setAltText("");

  }


  /* ===================================================
     RENDER
  =================================================== */

  return (

    <div
      className="
        editor-wrapper
        relative
      "
    >

      {/* =============================================
          HIDDEN FILE INPUT
      ============================================== */}

      <input
        ref={fileInputRef}

        type="file"

        accept="image/*"

        className="hidden"

        onChange={
          handleImageUpload
        }
      />


      {/* =============================================
          STATUS
      ============================================== */}

      {!ready && (

        <div
          className="
            mb-2
            rounded-lg
            border
            border-yellow-500/30
            bg-yellow-500/10
            px-3
            py-2
            text-sm
            text-yellow-400
          "
        >
          Loading editor...
        </div>

      )}


      {uploading && (

        <div
          className="
            mb-2
            rounded-lg
            border
            border-orange-500/30
            bg-orange-500/10
            px-3
            py-2
            text-sm
            text-orange-400
          "
        >
          Uploading image to Cloudinary...
        </div>

      )}


      {/* =============================================
          QUILL
      ============================================== */}

      <div
        onClick={
          handleEditorClick
        }
      >

        <ReactQuill

          ref={quillRef}

          theme="snow"

          value={
            typeof value === "string"
              ? value
              : ""
          }

          onChange={
            onChange
          }

          onChangeSelection={
            saveSelection
          }

          modules={
            modules
          }

          formats={
            formats
          }

          className="
            bg-white
            text-black
            rounded-xl
          "

        />

      </div>


      {/* =============================================
          INSERT IMAGE BUTTON
      ============================================== */}

      <button

        type="button"

        disabled={
          !ready ||
          uploading
        }

        onClick={
          openImagePicker
        }

        className="
          mt-3
          rounded-lg
          bg-orange-600
          px-4
          py-2
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-orange-700
          disabled:cursor-not-allowed
          disabled:opacity-50
        "

      >

        {uploading
          ? "Uploading..."
          : "🖼️ Insert Image"
        }

      </button>


      {/* =============================================
          IMAGE CONTROL PANEL
      ============================================== */}

      {selectedImage && (

        <div
          className="
            mt-4
            rounded-2xl
            border
            border-orange-500/30
            bg-[#0e1726]
            p-5
            shadow-xl
          "
        >

          <div
            className="
              mb-4
              flex
              items-center
              justify-between
              gap-4
            "
          >

            <div>

              <h3
                className="
                  font-semibold
                  text-white
                "
              >
                🖼️ Image Settings
              </h3>


              <p
                className="
                  mt-1
                  text-xs
                  text-gray-400
                "
              >
                Click an image in the article
                to edit its details.
              </p>

            </div>


            <button

              type="button"

              onClick={() => {

                setSelectedImage(null);

                setCaption("");

                setAltText("");

              }}

              className="
                rounded-lg
                bg-white/10
                px-3
                py-2
                text-xs
                text-gray-300
                hover:bg-white/20
              "

            >
              Close
            </button>

          </div>


          {/* IMAGE PREVIEW */}

          <img

            src={
              selectedImage.url
            }

            alt="Selected"

            className="
              mb-4
              max-h-64
              w-full
              rounded-xl
              object-contain
              bg-black/20
              p-2
            "

          />


          {/* CAPTION */}

          <div className="mb-4">

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-300
              "
            >
              Image Caption
            </label>


            <input

              type="text"

              value={caption}

              onChange={(e) =>
                setCaption(
                  e.target.value
                )
              }

              placeholder="Enter image caption"

              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-black/30
                p-3
                text-white
                outline-none
                focus:border-orange-500
              "

            />

          </div>


          {/* ALT TEXT */}

          <div className="mb-5">

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-300
              "
            >
              SEO Alt Text
            </label>


            <input

              type="text"

              value={altText}

              onChange={(e) =>
                setAltText(
                  e.target.value
                )
              }

              placeholder="Describe the image for SEO/accessibility"

              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-black/30
                p-3
                text-white
                outline-none
                focus:border-orange-500
              "

            />

          </div>


          {/* ACTIONS */}

          <div
            className="
              flex
              flex-wrap
              gap-3
            "
          >

            <button

              type="button"

              onClick={
                saveImageDetails
              }

              className="
                rounded-xl
                bg-orange-600
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                hover:bg-orange-700
              "

            >
              💾 Save Image Details
            </button>


            <button

              type="button"

              onClick={
                removeSelectedImage
              }

              className="
                rounded-xl
                bg-red-600
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                hover:bg-red-700
              "

            >
              🗑️ Remove Image
            </button>

          </div>

        </div>

      )}


      {/* =============================================
          STYLES
      ============================================== */}

      <style jsx global>{`

        .editor-wrapper .ql-toolbar {

          background: #ffffff;

          border-radius:
            12px 12px 0 0;

          border-color:
            #e5e7eb;

        }


        .editor-wrapper .ql-container {

          background: #ffffff;

          min-height: 350px;

          border-radius:
            0 0 12px 12px;

          border-color:
            #e5e7eb;

        }


        .editor-wrapper .ql-editor {

          color: #111827 !important;

          background: #ffffff;

          min-height: 350px;

          font-size: 16px;

          line-height: 1.7;

        }


        .editor-wrapper
        .ql-editor p,

        .editor-wrapper
        .ql-editor h1,

        .editor-wrapper
        .ql-editor h2,

        .editor-wrapper
        .ql-editor h3,

        .editor-wrapper
        .ql-editor li {

          color: #111827 !important;

        }


        .editor-wrapper
        .ql-editor ul {

          list-style-type: disc;

          padding-left: 30px;

        }


        .editor-wrapper
        .ql-editor ol {

          list-style-type: decimal;

          padding-left: 30px;

        }


        .editor-wrapper
        .ql-editor strong {

          font-weight: 700;

        }


        .editor-wrapper
        .ql-editor img {

          display: block;

          max-width: 100%;

          height: auto;

          margin: 24px auto;

          border-radius: 12px;

          cursor: pointer;

          transition:
            outline
            0.15s ease,
            transform
            0.15s ease;

        }


        .editor-wrapper
        .ql-editor img:hover {

          outline:
            3px solid
            rgba(234, 88, 12, 0.35);

          cursor: pointer;

        }


        .editor-wrapper
        .ql-editor.ql-blank::before {

          color: #9ca3af;

          font-style: normal;

        }


        .editor-wrapper
        .ql-stroke {

          stroke: #374151;

        }


        .editor-wrapper
        .ql-fill {

          fill: #374151;

        }


        .editor-wrapper
        .ql-picker {

          color: #374151;

        }

      `}</style>

    </div>

  );

}