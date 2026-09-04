"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  createDefaultPost,
} from "./createDefaultPost";

import type {
  PostFormData,
} from "./types";

import {
  usePostSubmit,
} from "./hooks/usePostSubmit";

import BasicSection from "./sections/BasicSection";
import MediaSection from "./sections/MediaSection";
import VideoSection from "./sections/VideoSection";
import IntelligenceSection from "./sections/IntelligenceSection";
import FAQSection from "./sections/FAQSection";
import PublishSection from "./sections/PublishSection";
import ControlsSection from "./sections/ControlsSection";
import SEOSection from "./sections/SEOSection";


interface ArticleFormProps {
  mode?:
    | "create"
    | "edit";

  initialData?:
    Partial<PostFormData>;

  postType?:
    | "news"
    | "editorial";
}


export default function ArticleForm({

  mode = "create",

  initialData,

  postType

}: ArticleFormProps) {


  const router = useRouter();

  const searchParams =
    useSearchParams();


  const typeFromUrl =
    (
      postType
      ||
      searchParams.get("type")
      ||
      "news"
    ) as "news" | "editorial";


  const [form, setForm] =
    useState<PostFormData>(
      createDefaultPost(typeFromUrl)
    );


  const [categories, setCategories] =
    useState<any[]>([]);


  const [uploading, setUploading] =
    useState(false);


  const [localError, setLocalError] =
    useState("");


  const [slugLocked, setSlugLocked] =
    useState(
      mode === "create"
    );


  const [metaLocked, setMetaLocked] =
    useState(
      mode === "create"
    );


  const [autosaveStatus, setAutosaveStatus] =
    useState<
      | "idle"
      | "saving"
      | "saved"
      | "error"
    >("idle");


  const [autosaveMessage, setAutosaveMessage] =
    useState("");


  /*
    Prevent autosave during initial
    edit-data hydration.
  */
  const initialHydrationRef =
    useRef(false);


  /*
    Prevent multiple autosave CREATE
    requests at the same time.
  */
  const autosaveCreatingRef =
    useRef(false);


  /*
    Prevent manual submit from racing
    with an active autosave CREATE.
  */
  const manualSubmittingRef =
    useRef(false);


  /*
    Lock the database article ID as soon
    as autosave creates the draft.

    This is more reliable than waiting
    for React state to update.
  */
  const autosaveArticleIdRef =
    useRef<string | null>(null);


  /*
    Latest autosave timer.
  */
  const autosaveTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);


  /*
    Track the last successfully saved
    autosave snapshot.
  */
  const lastSavedSnapshotRef =
    useRef("");


  /*
    Prevent an old autosave effect from
    creating another article after the
    draft ID has already been created.
  */
  const autosaveGenerationRef =
    useRef(0);


  /*
    Once manual submit succeeds, autosave
    must never create/update another article
    during this form session.
  */
  const manualSubmitCompletedRef =
    useRef(false);


  const {
    submitPost,
    loading,
    message,
    error
  } = usePostSubmit();


  /* =====================================================
     EDIT DATA LOAD
  ===================================================== */

  useEffect(() => {

    if (
      mode === "edit"
      &&
      initialData
    ) {

      initialHydrationRef.current = false;

      /*
        Existing article ID is immediately
        locked into the autosave ref.
      */
      autosaveArticleIdRef.current =
        initialData.id
        ||
        null;

      setForm(prev => ({

        ...prev,

        ...createDefaultPost(
          initialData.postType || typeFromUrl
        ),

        ...initialData,

        id:
          initialData.id,

        postType:
          postType
          ||
          initialData.postType
          ||
          typeFromUrl,

        isEditorial:
          (
            postType
            ||
            initialData.postType
            ||
            typeFromUrl
          )
          ===
          "editorial"

      }));


      /*
        Give React one render cycle to
        hydrate the existing article.
      */
      const timer = setTimeout(() => {

        initialHydrationRef.current = true;

      }, 100);


      return () =>
        clearTimeout(timer);

    }


    /*
      Create mode starts without
      an article ID.
    */
    autosaveArticleIdRef.current = null;

    initialHydrationRef.current = true;

    manualSubmitCompletedRef.current = false;

    lastSavedSnapshotRef.current = "";

  }, [
    mode,
    initialData,
    typeFromUrl,
    postType
  ]);


  /* =====================================================
     FIELD UPDATE
  ===================================================== */

  function updateField(
    key: keyof PostFormData,
    value: any
  ) {

    setForm(prev => ({

      ...prev,

      [key]: value

    }));

  }


  /* =====================================================
     AUTO SLUG
  ===================================================== */

  useEffect(() => {

    if (
      slugLocked
      &&
      form.title
    ) {

      const slug =

        form.title

          .toLowerCase()

          .trim()

          .replace(
            /[^a-z0-9]+/g,
            "-"
          )

          .replace(
            /^-+|-+$/g,
            ""
          );


      setForm(prev => ({

        ...prev,

        slug

      }));

    }

  }, [
    form.title,
    slugLocked
  ]);


  /* =====================================================
     AUTO SEO
  ===================================================== */

  useEffect(() => {

    if (
      metaLocked
      &&
      form.title
    ) {

      setForm(prev => ({

        ...prev,

        metaTitle:
          form.title.substring(
            0,
            60
          ),

        metaDescription:

          form.shortBrief

            ?

            form.shortBrief.substring(
              0,
              160
            )

            :

            form.title.substring(
              0,
              160
            )

      }));

    }

  }, [
    form.title,
    form.shortBrief,
    metaLocked
  ]);


  /* =====================================================
     LOAD CATEGORIES
  ===================================================== */

  useEffect(() => {

    async function loadCategories() {

      try {

        const res =
          await fetch(
            "/api/categories"
          );


        const data =
          await res.json();


        setCategories(

          Array.isArray(data)

            ?

            data

            :

            data?.categories || []

        );

      }

      catch (err) {

        console.error(
          "Category loading failed",
          err
        );

        setCategories([]);

      }

    }


    loadCategories();

  }, []);


  /* =====================================================
     AI IMPORT
  ===================================================== */

  useEffect(() => {

    if (
      mode === "edit"
    ) {

      return;
    }


    const stored =
      sessionStorage.getItem(
        "nationpath_ai_article"
      );


    if (!stored) {

      return;
    }


    try {

      const aiArticle =
        JSON.parse(stored);


      setForm(prev => ({

        ...prev,

        ...aiArticle,

        postType:
          typeFromUrl,

        isEditorial:
          typeFromUrl === "editorial",

        status:
          "draft"

      }));


      sessionStorage.removeItem(
        "nationpath_ai_article"
      );

    }

    catch (err) {

      console.error(
        "AI import failed",
        err
      );

    }

  }, [
    mode,
    typeFromUrl
  ]);


  /* =====================================================
     AUTOSAVE PAYLOAD
  ===================================================== */

  function buildAutosavePayload() {

    const payload: any = {

      ...form,

      postType:
        form.postType
        ||
        typeFromUrl,

      isEditorial:
        typeFromUrl === "editorial"
        ||
        Boolean(form.isEditorial),

      /*
        New articles are always initially
        saved as drafts.

        Existing articles preserve
        their current status.
      */
      status:
        mode === "create"
          ? "draft"
          : form.status

    };


    return payload;

  }


  /* =====================================================
     AUTOSAVE
  ===================================================== */

  useEffect(() => {

    /*
      Never autosave after successful
      manual submit.
    */
    if (
      manualSubmitCompletedRef.current
    ) {

      return;

    }


    /*
      Do not autosave until the form
      is initialized.
    */
    if (
      !initialHydrationRef.current
    ) {

      return;

    }


    /*
      Preserve an in-progress article.

      A title, content, or short brief
      is enough to create a draft.
    */
    const hasArticleInput =

      Boolean(
        form.title?.trim()
      )

      ||

      Boolean(
        form.content?.trim()
      )

      ||

      Boolean(
        form.shortBrief?.trim()
      );


    if (!hasArticleInput) {

      return;

    }


    /*
      Clear previous timer.
    */
    if (
      autosaveTimerRef.current
    ) {

      clearTimeout(
        autosaveTimerRef.current
      );

      autosaveTimerRef.current = null;

    }


    /*
      If an autosave CREATE is already
      running, do not schedule another.
    */
    if (
      autosaveCreatingRef.current
    ) {

      return;

    }


    const payload =
      buildAutosavePayload();


    /*
      Use the database article ID as part
      of the snapshot once it exists.
    */
    const currentArticleId =
      autosaveArticleIdRef.current
      ||
      form.id
      ||
      null;


    const snapshot =
      JSON.stringify({

        ...payload,

        id:
          currentArticleId

      });


    /*
      Nothing changed since last
      successful autosave.
    */
    if (
      snapshot ===
      lastSavedSnapshotRef.current
    ) {

      return;

    }


    /*
      Increment generation for this
      autosave cycle.
    */
    const generation =
      ++autosaveGenerationRef.current;


    /*
      Debounce autosave.
    */
    autosaveTimerRef.current =

      setTimeout(async () => {

        /*
          Abort stale timer callbacks.
        */
        if (
          generation !==
          autosaveGenerationRef.current
        ) {

          return;

        }


        /*
          Never autosave after manual
          submission has completed.
        */
        if (
          manualSubmitCompletedRef.current
        ) {

          return;

        }


        /*
          CREATE MODE
        */
        if (
          mode === "create"
          &&
          !autosaveArticleIdRef.current
          &&
          !form.id
        ) {

          /*
            HARD CREATE LOCK

            Only one CREATE request can
            ever be active at a time.
          */
          if (
            autosaveCreatingRef.current
          ) {

            return;

          }


          autosaveCreatingRef.current =
            true;


          try {

            setAutosaveStatus(
              "saving"
            );

            setAutosaveMessage(
              "Saving draft..."
            );


            const response =
              await fetch(
                "/api/articles",
                {
                  method: "POST",

                  headers: {
                    "Content-Type":
                      "application/json"
                  },

                  body:
                    JSON.stringify(
                      payload
                    )
                }
              );


            const data =
              await response.json();


            if (!response.ok) {

              throw new Error(
                data?.error
                ||
                "Draft autosave failed"
              );

            }


            const createdArticle =
              data?.article;


            if (
              !createdArticle?.id
            ) {

              throw new Error(
                "Draft was created but no article ID was returned"
              );

            }


            /*
              CRITICAL:

              Lock the created database ID
              BEFORE updating React state.

              This prevents another autosave
              from creating a second article.
            */
            autosaveArticleIdRef.current =
              createdArticle.id;


            /*
              Invalidate any stale CREATE
              callbacks.
            */
            autosaveGenerationRef.current++;


            setForm(prev => ({

              ...prev,

              id:
                createdArticle.id,

              slug:
                createdArticle.slug
                ||
                prev.slug,

              status:
                createdArticle.status
                ||
                "draft"

            }));


            /*
              Snapshot must include the
              newly created ID.
            */
            lastSavedSnapshotRef.current =
              JSON.stringify({

                ...payload,

                id:
                  createdArticle.id,

                slug:
                  createdArticle.slug
                  ||
                  payload.slug,

                status:
                  createdArticle.status
                  ||
                  "draft"

              });


            setAutosaveStatus(
              "saved"
            );

            setAutosaveMessage(
              "Draft saved"
            );

          }

          catch (err: any) {

            console.error(
              "ARTICLE AUTOSAVE ERROR",
              err
            );


            setAutosaveStatus(
              "error"
            );

            setAutosaveMessage(
              err?.message
              ||
              "Autosave failed"
            );

          }

          finally {

            autosaveCreatingRef.current =
              false;

          }


          return;

        }


        /*
          EXISTING ARTICLE AUTOSAVE
        */
        const existingId =
          autosaveArticleIdRef.current
          ||
          form.id
          ||
          null;


        if (!existingId) {

          return;

        }


        /*
          Never PUT while a CREATE is
          still in progress.
        */
        if (
          autosaveCreatingRef.current
        ) {

          return;

        }


        try {

          setAutosaveStatus(
            "saving"
          );

          setAutosaveMessage(
            "Saving draft..."
          );


          const response =
            await fetch(

              `/api/articles/${existingId}`,

              {
                method: "PUT",

                headers: {
                  "Content-Type":
                    "application/json"
                },

                body:
                  JSON.stringify({

                    ...payload,

                    id:
                      existingId

                  })

              }

            );


          const data =
            await response.json();


          if (!response.ok) {

            throw new Error(
              data?.error
              ||
              "Draft autosave failed"
            );

          }


          /*
            Use the exact article ID
            in the saved snapshot.
          */
          lastSavedSnapshotRef.current =
            JSON.stringify({

              ...payload,

              id:
                existingId

            });


          setAutosaveStatus(
            "saved"
          );

          setAutosaveMessage(
            "Draft saved"
          );

        }

        catch (err: any) {

          console.error(
            "ARTICLE AUTOSAVE ERROR",
            err
          );


          setAutosaveStatus(
            "error"
          );

          setAutosaveMessage(
            err?.message
            ||
            "Autosave failed"
          );

        }

      }, 2000);


    return () => {

      if (
        autosaveTimerRef.current
      ) {

        clearTimeout(
          autosaveTimerRef.current
        );

        autosaveTimerRef.current = null;

      }

    };

  }, [
    form,
    mode,
    typeFromUrl
  ]);


  /* =====================================================
     CLEANUP
  ===================================================== */

  useEffect(() => {

    return () => {

      if (
        autosaveTimerRef.current
      ) {

        clearTimeout(
          autosaveTimerRef.current
        );

        autosaveTimerRef.current = null;

      }

      autosaveGenerationRef.current++;

    };

  }, []);


  /* =====================================================
     MANUAL SUBMIT
  ===================================================== */

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();


    /*
      Prevent double clicking the
      Create / Update button.
    */
    if (
      manualSubmittingRef.current
      ||
      loading
    ) {

      return;

    }


    /*
      If autosave CREATE is currently
      creating the first draft, wait for it.
    */
    if (
      autosaveCreatingRef.current
    ) {

      setLocalError(
        "Draft is being saved. Please wait a moment..."
      );

      return;

    }


    setLocalError("");

    manualSubmittingRef.current =
      true;


    /*
      Cancel any pending autosave timer
      before manual submit.

      This prevents a pending CREATE
      from running around the same time
      as manual submission.
    */
    if (
      autosaveTimerRef.current
    ) {

      clearTimeout(
        autosaveTimerRef.current
      );

      autosaveTimerRef.current = null;

    }


    /*
      Invalidate any stale autosave
      callback.
    */
    autosaveGenerationRef.current++;


    try {

      /*
        If autosave has already created
        the draft, use that exact database ID.
      */
      const existingArticleId =
        autosaveArticleIdRef.current
        ||
        form.id
        ||
        undefined;


      const submitForm = {

        ...form,

        id:
          existingArticleId

      };


      /*
        CRITICAL FIX:

        If autosave already created a draft,
        submit as EDIT.

        Therefore:

          Draft → Publish

        becomes:

          PUT /api/articles/{id}

        instead of:

          POST /api/articles
      */
      const submitMode =
        existingArticleId
          ? "edit"
          : mode;


      const success =
        await submitPost(
          submitForm,
          submitMode
        );


      if (success) {

        /*
          Stop all future autosave activity
          for this form session.
        */
        manualSubmitCompletedRef.current =
          true;


        autosaveGenerationRef.current++;


        if (
          autosaveTimerRef.current
        ) {

          clearTimeout(
            autosaveTimerRef.current
          );

          autosaveTimerRef.current = null;

        }


        setTimeout(() => {

          router.push(
            "/admin/posts"
          );

        }, 1000);

      }

    }

    finally {

      manualSubmittingRef.current =
        false;

    }

  }


  /* =====================================================
     UI
  ===================================================== */

  return (

    <div

      className="
        min-h-screen
        bg-[#050816]
        text-white
        p-4
        md:p-8
      "

    >


      <div className="mb-8">


        <h1 className="text-3xl font-bold">

          {
            mode === "edit"

              ?

              `Edit ${typeFromUrl.toUpperCase()} Post`

              :

              `Create ${typeFromUrl.toUpperCase()} Post`
          }

        </h1>


        <p className="mt-2 text-orange-400">

          NationPath Editorial CMS

        </p>


      </div>


      {
        (message || localError)
        &&

        <div

          className="
            mb-5
            rounded-xl
            border
            border-blue-500
            bg-blue-600/20
            p-4
            text-blue-300
          "

        >

          {message || localError}

        </div>
      }


      {
        error
        &&

        <div

          className="
            mb-5
            rounded-xl
            border
            border-red-500
            bg-red-600/20
            p-4
            text-red-300
          "

        >

          {error}

        </div>
      }


      <div className="mb-5 flex justify-end">

        <span

          className={`
            text-xs
            transition
            ${
              autosaveStatus === "saving"
                ? "text-yellow-400"
                :
              autosaveStatus === "saved"
                ? "text-green-400"
                :
              autosaveStatus === "error"
                ? "text-red-400"
                :
                "text-gray-500"
            }
          `}

        >

          {
            autosaveMessage
          }

        </span>

      </div>


      <form

        onSubmit={handleSubmit}

        className="
          grid
          grid-cols-1
          gap-8
          xl:grid-cols-3
        "

      >


        <div className="space-y-6 xl:col-span-2">


          <BasicSection

            form={form}

            updateField={updateField}

            slugLocked={slugLocked}

            setSlugLocked={setSlugLocked}

          />


          <IntelligenceSection

            form={form}

            updateField={updateField}

          />


          <MediaSection

            form={form}

            updateField={updateField}

            uploading={uploading}

            setUploading={setUploading}

            setError={setLocalError}

          />


          <VideoSection

            form={form}

            updateField={updateField}

          />


          <FAQSection

            form={form}

            updateField={updateField}

          />

        </div>


        <div className="space-y-6">


          <PublishSection

            form={form}

            updateField={updateField}

            categories={categories}

          />


          <ControlsSection

            form={form}

            updateField={updateField}

          />


          <SEOSection

            form={form}

            updateField={updateField}

            metaLocked={metaLocked}

            setMetaLocked={setMetaLocked}

          />


          <button

            type="submit"

            disabled={
              loading ||
              manualSubmittingRef.current
            }

            className="
              w-full
              rounded-xl
              bg-orange-600
              py-4
              font-semibold
              transition
              hover:bg-orange-700
              disabled:opacity-50
            "

          >

            {

              loading

                ?

                mode === "edit"

                  ?

                  "Updating..."

                  :

                  "Saving..."

                :

                mode === "edit"

                  ?

                  "Update Post"

                  :

                  "Create Post"

            }

          </button>


        </div>


      </form>


    </div>

  );

}