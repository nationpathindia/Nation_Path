"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(
  () => import("react-quill"),
  {
    ssr: false,
  }
);


/* =====================================================
   QUILL CONFIG
===================================================== */

const modules = {

  toolbar: [

    [
      {
        header: [1, 2, 3, false]
      }
    ],

    [
      "bold",
      "italic",
      "underline"
    ],

    [
      {
        list: "ordered"
      },
      {
        list: "bullet"
      }
    ],

    [
      "blockquote"
    ],

    [
      "link"
    ],

    [
      "clean"
    ]

  ]

};



const formats = [

  "header",

  "bold",
  "italic",
  "underline",

  "list",
  "bullet",

  "blockquote",

  "link"

];





export default function Editor(
  {
    value,
    onChange
  }: any
) {


  return (

    <div className="editor-wrapper">


      <ReactQuill

        theme="snow"

        value={value}

        onChange={onChange}

        modules={modules}

        formats={formats}

        className="
          bg-white
          text-black
          rounded-xl
        "

      />



      <style jsx global>{`

        .editor-wrapper .ql-toolbar {

          background:#ffffff;

          border-radius:12px 12px 0 0;

          border-color:#e5e7eb;

        }



        .editor-wrapper .ql-container {

          background:#ffffff;

          min-height:350px;

          border-radius:0 0 12px 12px;

          border-color:#e5e7eb;

        }



        .editor-wrapper .ql-editor {

          color:#111827 !important;

          background:#ffffff;

          min-height:350px;

          font-size:16px;

          line-height:1.7;

        }




        .editor-wrapper .ql-editor p,

        .editor-wrapper .ql-editor h1,

        .editor-wrapper .ql-editor h2,

        .editor-wrapper .ql-editor h3,

        .editor-wrapper .ql-editor li {

          color:#111827 !important;

        }




        .editor-wrapper .ql-editor ul {

          list-style-type:disc;

          padding-left:30px;

        }



        .editor-wrapper .ql-editor ol {

          list-style-type:decimal;

          padding-left:30px;

        }




        .editor-wrapper .ql-editor strong {

          font-weight:700;

        }




        .editor-wrapper .ql-editor.ql-blank::before {

          color:#9ca3af;

          font-style:normal;

        }




        .editor-wrapper .ql-stroke {

          stroke:#374151;

        }




        .editor-wrapper .ql-fill {

          fill:#374151;

        }




        .editor-wrapper .ql-picker {

          color:#374151;

        }



      `}</style>


    </div>

  );

}