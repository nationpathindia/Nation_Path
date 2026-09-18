// components/admin/posts/sections/MediaSection.tsx

"use client";

import { useState, useRef, useEffect } from "react";
import type { PostFormData, ImageGalleryItem } from "../types";

interface Props {
  form: PostFormData;
  updateField: (key: keyof PostFormData, value: any) => void;
  uploading?: boolean;
  setUploading?: (value: boolean) => void;
  setError?: (value: string) => void;
  categories?: any[];
}

interface ImageEditorModalProps {
  image: ImageGalleryItem;
  title: string;
  categoryName?: string;
  onClose: () => void;
  onSave: (
    editedImage: ImageGalleryItem,
    originalUrl: string
  ) => void;
}

function ImageEditorModal({
  image,
  title,
  categoryName,
  onClose,
  onSave,
}: ImageEditorModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [showTitle, setShowTitle] = useState(true);
  const [showDesc, setShowDesc] = useState(false);
  const [showWatermark, setShowWatermark] = useState(true);
  const [aiCaption, setAiCaption] = useState("");
  const [generatingCaption, setGeneratingCaption] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [canvasError, setCanvasError] = useState("");

  const getCategoryColors = (catName: string) => {
    const colorMap: Record<
      string,
      { bg: string; text: string }
    > = {
      Government: { bg: "#DC2626", text: "#FFFFFF" },
      India: { bg: "#2563EB", text: "#FFFFFF" },
      World: { bg: "#7C3AED", text: "#FFFFFF" },
      Business: { bg: "#059669", text: "#FFFFFF" },
      Technology: { bg: "#0891B2", text: "#FFFFFF" },
      Sports: { bg: "#EA580C", text: "#FFFFFF" },
      Entertainment: { bg: "#DB2777", text: "#FFFFFF" },
      Health: { bg: "#EC4899", text: "#FFFFFF" },
      Science: { bg: "#F59E0B", text: "#FFFFFF" },
      Legal: { bg: "#4F46E5", text: "#FFFFFF" },
      Automobiles: { bg: "#6366F1", text: "#FFFFFF" },
    };

    return (
      colorMap[catName || "General"] || {
        bg: "#6B7280",
        text: "#FFFFFF",
      }
    );
  };

  function getR2KeyFromUrl(url: string): string | null {
    const publicUrl =
      process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

    if (!publicUrl) {
      return null;
    }

    try {
      const imageUrl = new URL(url);
      const configuredUrl = new URL(
        publicUrl.replace(/\/$/, "")
      );

      if (imageUrl.origin !== configuredUrl.origin) {
        return null;
      }

      const key = decodeURIComponent(
        imageUrl.pathname.replace(/^\/+/, "")
      );

      if (!key.startsWith("articles/")) {
        return null;
      }

      return key;
    } catch {
      return null;
    }
  }

  async function deleteOldR2Image(url: string) {
    const key = getR2KeyFromUrl(url);

    if (!key) {
      return {
        deleted: false,
        key: null,
      };
    }

    const res = await fetch("/api/upload", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(
        data.message ||
          "Failed to delete original R2 image"
      );
    }

    return {
      deleted: true,
      key,
    };
  }

  useEffect(() => {
    let cancelled = false;

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      setCanvasError(
        "Canvas is not supported in this browser."
      );
      return;
    }

    setCanvasReady(false);
    setCanvasError("");

    const loadImage = (
      src: string,
      useCors = false
    ) => {
      return new Promise<HTMLImageElement>(
        (resolve, reject) => {
          const img = new Image();

          /*
           * IMPORTANT:
           * crossOrigin MUST be assigned before src.
           */
          if (useCors) {
            img.crossOrigin = "anonymous";
          }

          img.onload = () => {
            resolve(img);
          };

          img.onerror = () => {
            reject(
              new Error(
                `Unable to load image: ${src}`
              )
            );
          };

          /*
           * Cache-busting is especially useful after
           * changing R2 CORS configuration.
           */
          const isRemoteImage =
            /^https?:\/\//i.test(src);

          const finalSrc =
            isRemoteImage
              ? `${src}${
                  src.includes("?")
                    ? "&"
                    : "?"
                }canvas=${Date.now()}`
              : src;

          img.src = finalSrc;
        }
      );
    };

    async function renderCanvas() {
      try {
        /*
         * Main article image may be R2 or Cloudinary.
         * CORS is enabled for canvas-safe remote images.
         */
        const [mainImg, logoImg] =
          await Promise.all([
            loadImage(image.url, true),
            loadImage("/logo.png", false),
          ]);

        if (cancelled) {
          return;
        }

        canvas.width = 1200;
        canvas.height = 630;

        ctx.clearRect(
          0,
          0,
          canvas.width,
          canvas.height
        );

        /*
         * Draw source image using cover behaviour
         * instead of stretching it.
         */
        const sourceWidth =
          mainImg.naturalWidth ||
          mainImg.width;

        const sourceHeight =
          mainImg.naturalHeight ||
          mainImg.height;

        if (!sourceWidth || !sourceHeight) {
          throw new Error(
            "Main image loaded without valid dimensions."
          );
        }

        const canvasRatio =
          1200 / 630;

        const imageRatio =
          sourceWidth / sourceHeight;

        let sx = 0;
        let sy = 0;
        let sw = sourceWidth;
        let sh = sourceHeight;

        if (imageRatio > canvasRatio) {
          sw =
            sourceHeight *
            canvasRatio;

          sx =
            (sourceWidth - sw) / 2;
        } else {
          sh =
            sourceWidth /
            canvasRatio;

          sy =
            (sourceHeight - sh) / 2;
        }

        ctx.drawImage(
          mainImg,
          sx,
          sy,
          sw,
          sh,
          0,
          0,
          1200,
          630
        );

        // 1. Bottom gradient
        const gradient =
          ctx.createLinearGradient(
            0,
            380,
            0,
            630
          );

        gradient.addColorStop(
          0,
          "rgba(0, 0, 0, 0)"
        );

        gradient.addColorStop(
          0.3,
          "rgba(0, 0, 0, 0.6)"
        );

        gradient.addColorStop(
          1,
          "rgba(0, 0, 0, 0.95)"
        );

        ctx.fillStyle = gradient;
        ctx.fillRect(
          0,
          380,
          1200,
          250
        );

        // 2. Category badge
        if (categoryName) {
          const colors =
            getCategoryColors(
              categoryName
            );

          const badgeText =
            categoryName.toUpperCase();

          ctx.font =
            "bold 20px 'Segoe UI', Arial, sans-serif";

          const textWidth =
            ctx.measureText(
              badgeText
            ).width;

          const padding = 30;

          const badgeWidth =
            textWidth +
            padding * 2;

          const badgeHeight = 50;

          const badgeX =
            1200 -
            badgeWidth -
            40;

          const badgeY = 40;

          ctx.shadowColor =
            "rgba(0, 0, 0, 0.5)";

          ctx.shadowBlur = 8;
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;

          ctx.fillStyle =
            colors.bg;

          ctx.beginPath();

          ctx.roundRect(
            badgeX,
            badgeY,
            badgeWidth,
            badgeHeight,
            8
          );

          ctx.fill();

          ctx.shadowColor =
            "transparent";

          ctx.fillStyle =
            colors.text;

          ctx.textBaseline =
            "middle";

          ctx.fillText(
            badgeText,
            badgeX + padding,
            badgeY +
              badgeHeight / 2
          );
        }

        // 3. Title overlay
        if (showTitle && title) {
          ctx.fillStyle = "#FFFFFF";

          ctx.font =
            "bold 32px 'Segoe UI', Arial, sans-serif";

          ctx.textAlign = "center";
          ctx.textBaseline = "top";

          const maxWidth = 1100;
          const words =
            title.split(" ");

          const lines: string[] = [];
          let line = "";

          for (
            let n = 0;
            n < words.length;
            n++
          ) {
            const testLine =
              line +
              words[n] +
              " ";

            const metrics =
              ctx.measureText(
                testLine
              );

            if (
              metrics.width >
                maxWidth &&
              n > 0
            ) {
              lines.push(line);
              line =
                words[n] + " ";
            } else {
              line = testLine;
            }
          }

          lines.push(line);

          const lineHeight = 40;
          const startY = 440;

          lines.forEach(
            (currentLine, index) => {
              ctx.fillText(
                currentLine.trim(),
                600,
                startY +
                  index *
                    lineHeight
              );
            }
          );

          ctx.textAlign = "left";
        }

        // 4. Caption
        if (
          showDesc &&
          image.caption
        ) {
          const captionText =
            image.caption.length >
            120
              ? image.caption.substring(
                  0,
                  120
                ) + "..."
              : image.caption;

          ctx.font =
            "22px 'Segoe UI', Arial, sans-serif";

          const captionWidth =
            ctx.measureText(
              captionText
            ).width;

          ctx.fillStyle =
            "rgba(0, 0, 0, 0.7)";

          ctx.fillRect(
            40,
            590,
            captionWidth + 30,
            35
          );

          ctx.fillStyle = "#FFFFFF";

          ctx.textBaseline =
            "bottom";

          ctx.fillText(
            captionText,
            55,
            615
          );
        }

        // 5. Watermark
        if (showWatermark) {
          const logoWidth = 250;
          const logoHeight = 250;

          const logoX =
            1200 -
            logoWidth -
            40;

          const logoY =
            630 / 2 -
            logoHeight / 2;

          ctx.shadowColor =
            "rgba(0, 0, 0, 0.5)";

          ctx.shadowBlur = 15;
          ctx.shadowOffsetX = 3;
          ctx.shadowOffsetY = 3;

          ctx.globalAlpha = 0.3;

          ctx.drawImage(
            logoImg,
            logoX,
            logoY,
            logoWidth,
            logoHeight
          );

          ctx.globalAlpha = 1;

          ctx.shadowColor =
            "transparent";

          ctx.fillStyle =
            "rgba(255, 255, 255, 0.8)";

          ctx.font =
            "12px 'Segoe UI', Arial";

          ctx.textBaseline =
            "bottom";

          ctx.fillText(
            "© 2026 NationPath. All rights reserved.",
            40,
            625
          );
        }

        /*
         * Confirm canvas actually contains renderable
         * pixels before allowing Save & Process.
         */
        try {
          ctx.getImageData(
            0,
            0,
            1,
            1
          );
        } catch (canvasSecurityError) {
          throw new Error(
            "Image cannot be processed because R2/Cloudinary CORS is not allowing canvas access."
          );
        }

        if (!cancelled) {
          setCanvasReady(true);
          setCanvasError("");
        }
      } catch (error) {
        console.error(
          "Image editor canvas render failed:",
          error
        );

        if (!cancelled) {
          setCanvasReady(false);

          setCanvasError(
            error instanceof Error
              ? error.message
              : "Unable to load image for editing."
          );
        }
      }
    }

    renderCanvas();

    return () => {
      cancelled = true;
    };
  }, [
    image.url,
    image.caption,
    title,
    categoryName,
    showTitle,
    showDesc,
    showWatermark,
  ]);

  async function handleAIGenerateCaption() {
    setGeneratingCaption(true);

    try {
      const res = await fetch(
        "/api/ai/news/generate-caption",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title,
            keywords: [],
            imageAlt: image.alt,
          }),
        }
      );

      const data =
        await res.json();

      if (data.caption) {
        setAiCaption(
          data.caption
        );
      }
    } catch (error) {
      console.error(
        "Caption generation failed:",
        error
      );
    } finally {
      setGeneratingCaption(
        false
      );
    }
  }

  function handleDownload() {
    const canvas =
      canvasRef.current;

    if (
      !canvas ||
      !canvasReady
    ) {
      return;
    }

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          return;
        }

        const url =
          URL.createObjectURL(
            blob
          );

        const a =
          document.createElement(
            "a"
          );

        a.href = url;

        a.download =
          `nationpath-${Date.now()}.webp`;

        document.body.appendChild(a);

        a.click();

        a.remove();

        URL.revokeObjectURL(url);
      },
      "image/webp",
      0.85
    );
  }

  async function handleSave() {
    const canvas =
      canvasRef.current;

    if (
      !canvas ||
      processing ||
      !canvasReady
    ) {
      if (!canvasReady) {
        alert(
          "Image preview is not ready yet. Please wait for the image to load."
        );
      }

      return;
    }

    setProcessing(true);

    try {
      // 1. Convert final canvas to WebP
      const blob =
        await new Promise<Blob | null>(
          (resolve) => {
            canvas.toBlob(
              (result) =>
                resolve(result),
              "image/webp",
              0.85
            );
          }
        );

      if (!blob) {
        throw new Error(
          "Failed to process image."
        );
      }

      if (blob.size === 0) {
        throw new Error(
          "Processed image is empty."
        );
      }

      // 2. Create final processed file
      const processedFile =
        new File(
          [blob],
          `nationpath-${Date.now()}.webp`,
          {
            type: "image/webp",
          }
        );

      // 3. Upload FINAL image to R2
      const formData =
        new FormData();

      formData.append(
        "file",
        processedFile
      );

      const uploadRes =
        await fetch(
          "/api/upload",
          {
            method: "POST",
            body: formData,
          }
        );

      const uploadData =
        await uploadRes.json();

      if (
        !uploadRes.ok ||
        !uploadData.success ||
        !uploadData.url
      ) {
        throw new Error(
          uploadData.message ||
            "Processed image upload failed."
        );
      }

      /*
       * 4. Final image is safely in R2.
       *
       * Delete ONLY the original R2 object.
       * Cloudinary URLs return null from
       * getR2KeyFromUrl() and are untouched.
       */
      try {
        await deleteOldR2Image(
          image.url
        );
      } catch (deleteError) {
        /*
         * Do not intentionally leave two R2 objects.
         * Roll back the newly-created final object.
         */
        try {
          if (uploadData.key) {
            await fetch(
              "/api/upload",
              {
                method: "DELETE",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                  key: uploadData.key,
                }),
              }
            );
          }
        } catch (rollbackError) {
          console.error(
            "R2 rollback failed:",
            rollbackError
          );
        }

        throw deleteError;
      }

      // 5. Replace the gallery item
      const editedImage: ImageGalleryItem =
        {
          ...image,
          url: uploadData.url,
          alt:
            image.alt ||
            `${title} - NationPath Image`,
          caption:
            aiCaption ||
            image.caption,
          source: "upload",
          license: "owned",
          credit: "NationPath",
          isPrimary:
            image.isPrimary,
        };

      onSave(
        editedImage,
        image.url
      );

      onClose();
    } catch (error) {
      console.error(
        "Image processing/upload failed:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to process image."
      );
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#0e1726] rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">
          🎨 Image Editor
        </h3>

        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full h-auto rounded-xl border border-white/10 mb-4"
          />

          {!canvasReady &&
            !canvasError && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 pointer-events-none">
                <span className="text-orange-400 text-sm">
                  Loading image preview...
                </span>
              </div>
            )}
        </div>

        {canvasError && (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            <strong>
              Image preview failed:
            </strong>{" "}
            {canvasError}
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div className="flex gap-4 flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showTitle}
                onChange={(e) =>
                  setShowTitle(
                    e.target.checked
                  )
                }
                disabled={processing}
                className="w-4 h-4"
              />

              <span>
                Show Title Overlay
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showDesc}
                onChange={(e) =>
                  setShowDesc(
                    e.target.checked
                  )
                }
                disabled={processing}
                className="w-4 h-4"
              />

              <span>
                Show Description
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={
                  showWatermark
                }
                onChange={(e) =>
                  setShowWatermark(
                    e.target.checked
                  )
                }
                disabled={processing}
                className="w-4 h-4"
              />

              <span>
                NationPath Watermark
              </span>
            </label>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-orange-400">
                🤖 AI Caption Generator
              </span>

              <button
                type="button"
                onClick={
                  handleAIGenerateCaption
                }
                disabled={
                  generatingCaption ||
                  processing
                }
                className="text-xs bg-orange-600 px-3 py-1 rounded-lg hover:bg-orange-700 disabled:opacity-50"
              >
                {generatingCaption
                  ? "Generating..."
                  : "Generate Caption"}
              </button>
            </div>

            <textarea
              value={aiCaption}
              onChange={(e) =>
                setAiCaption(
                  e.target.value
                )
              }
              disabled={processing}
              placeholder="AI-generated caption will appear here..."
              className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-sm"
              rows={2}
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={processing}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDownload}
            disabled={
              processing ||
              !canvasReady
            }
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            📥 Download
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={
              processing ||
              !canvasReady
            }
            className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 disabled:opacity-50"
          >
            {processing
              ? "⏳ Processing & Replacing..."
              : "✅ Save & Process"}
          </button>
        </div>
      </div>
    </div>
  );
}

function syncPrimaryImages(
  gallery: ImageGalleryItem[]
) {
  const primary =
    gallery.find(
      (item) => item.isPrimary
    ) || gallery[0];

  return {
    imageGallery:
      gallery.map(
        (item, index) => ({
          ...item,
          isPrimary: primary
            ? item.url ===
              primary.url
            : index === 0,
        })
      ),

    images: primary
      ? [primary.url]
      : [],
  };
}

export default function MediaSection({
  form,
  updateField,
  uploading = false,
  setUploading,
  setError,
  categories = [],
}: Props) {
  const [
    editingImage,
    setEditingImage,
  ] = useState<ImageGalleryItem | null>(
    null
  );

  const [
    loadingAIImages,
    setLoadingAIImages,
  ] = useState(false);

  async function uploadImages(
    files: FileList
  ) {
    if (
      form.imageGallery.length +
        files.length >
      10
    ) {
      setError?.(
        "Maximum 10 images allowed"
      );
      return;
    }

    setUploading?.(true);
    setError?.("");

    try {
      const uploaded: ImageGalleryItem[] =
        [];

      for (const file of Array.from(
        files
      )) {
        if (
          !file.type.startsWith(
            "image/"
          )
        ) {
          throw new Error(
            "Only image files allowed"
          );
        }

        if (
          file.size >
          2 * 1024 * 1024
        ) {
          throw new Error(
            "Image size must be under 2MB"
          );
        }

        const fd =
          new FormData();

        fd.append("file", file);

        const res =
          await fetch(
            "/api/upload",
            {
              method: "POST",
              body: fd,
            }
          );

        const data =
          await res.json();

        if (
          !res.ok ||
          !data.success ||
          !data.url
        ) {
          throw new Error(
            data.message ||
              "Image upload failed"
          );
        }

        uploaded.push({
          url: data.url,
          alt: form.title
            ? `${form.title} - NationPath Image`
            : "NationPath Image",
          caption:
            form.title ||
            "NationPath Article",
          isPrimary: false,
          source: "upload",
          license: "owned",
          credit: "NationPath",
        });
      }

      const merged = [
        ...form.imageGallery,
        ...uploaded,
      ];

      const synced =
        syncPrimaryImages(
          merged
        );

      updateField(
        "imageGallery",
        synced.imageGallery
      );

      updateField(
        "images",
        synced.images
      );
    } catch (error: any) {
      setError?.(
        error.message ||
          "Image upload failed"
      );
    } finally {
      setUploading?.(false);
    }
  }

  async function fetchAIImages() {
    if (!form.title) {
      setError?.(
        "Please enter a title first to fetch relevant images"
      );
      return;
    }

    setLoadingAIImages(true);
    setError?.("");

    try {
      const res =
        await fetch(
          "/api/ai/news/fetch-images",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              title: form.title,
              keywords:
                form.metaKeywords
                  ? form.metaKeywords.split(
                      ","
                    )
                  : [],
            }),
          }
        );

      const data =
        await res.json();

      if (
        data.images &&
        data.images.length > 0
      ) {
        const readyImages =
          data.images.map(
            (img: any) => ({
              ...img,
              caption:
                img.caption ||
                `${form.title} | Visual representation for NationPath Intelligence Bureau.`,
              alt:
                img.alt ||
                form.title,
            })
          );

        const merged = [
          ...form.imageGallery,
          ...readyImages,
        ];

        const synced =
          syncPrimaryImages(
            merged
          );

        updateField(
          "imageGallery",
          synced.imageGallery
        );

        updateField(
          "images",
          synced.images
        );

        setError?.("");
      } else {
        setError?.(
          "No relevant images found. Try different keywords."
        );
      }
    } catch (error: any) {
      setError?.(
        error.message ||
          "Failed to fetch AI images"
      );
    } finally {
      setLoadingAIImages(
        false
      );
    }
  }

  function setPrimary(index: number) {
    const updated =
      form.imageGallery.map(
        (item, i) => ({
          ...item,
          isPrimary:
            i === index,
        })
      );

    const synced =
      syncPrimaryImages(
        updated
      );

    updateField(
      "imageGallery",
      synced.imageGallery
    );

    updateField(
      "images",
      synced.images
    );
  }

  function removeImage(index: number) {
    const updated =
      form.imageGallery.filter(
        (_, i) => i !== index
      );

    const synced =
      syncPrimaryImages(
        updated
      );

    updateField(
      "imageGallery",
      synced.imageGallery
    );

    updateField(
      "images",
      synced.images
    );
  }

  function updateImage(
    index: number,
    key: "alt" | "caption",
    value: string
  ) {
    updateField(
      "imageGallery",
      form.imageGallery.map(
        (item, i) =>
          i === index
            ? {
                ...item,
                [key]: value,
              }
            : item
      )
    );
  }

  function handleSaveEditedImage(
    editedImage: ImageGalleryItem,
    originalUrl: string
  ) {
    const updated =
      form.imageGallery.map(
        (img) =>
          img.url === originalUrl
            ? editedImage
            : img
      );

    const synced =
      syncPrimaryImages(
        updated
      );

    updateField(
      "imageGallery",
      synced.imageGallery
    );

    updateField(
      "images",
      synced.images
    );
  }

  const currentCategory =
    categories.find(
      (c) =>
        c.id ===
        form.categoryId
    );

  const categoryName =
    currentCategory?.name;

  return (
    <div className="bg-[#0e1726] border border-white/10 rounded-2xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">
          🖼️ Media Gallery
        </h2>

        <button
          type="button"
          onClick={
            fetchAIImages
          }
          disabled={
            loadingAIImages ||
            !form.title
          }
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-sm font-semibold"
        >
          {loadingAIImages ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />

                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>

              Fetching...
            </>
          ) : (
            <>🌐 Fetch AI Images</>
          )}
        </button>
      </div>

      <p className="text-sm text-gray-400">
        Upload your own images or fetch AI-suggested images from Unsplash & Pexels
      </p>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) {
            uploadImages(
              e.target.files
            );

            e.target.value = "";
          }
        }}
        className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
      />

      {uploading && (
        <p className="text-orange-400 text-sm">
          Uploading images to R2...
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {form.imageGallery.map(
          (img, index) => (
            <div
              key={`${img.url}-${index}`}
              className="bg-black/20 rounded-xl p-4 space-y-3"
            >
              <img
                src={img.url}
                alt={img.alt}
                crossOrigin="anonymous"
                className="w-full h-48 object-cover rounded-xl cursor-pointer hover:opacity-80 transition"
                onClick={() =>
                  setEditingImage(
                    img
                  )
                }
              />

              <div className="flex gap-2 flex-wrap">
                <span className="text-xs px-2 py-1 rounded bg-blue-900/30 text-blue-400 border border-blue-800/50">
                  {img.source ===
                  "upload"
                    ? "📤 Uploaded"
                    : img.source ===
                      "unsplash"
                    ? "🎨 Unsplash"
                    : img.source ===
                      "pexels"
                    ? "📸 Pexels"
                    : "🖼️ Image"}
                </span>

                {img.source ===
                  "upload" &&
                  img.url.includes(
                    "media.nationpathindia.com"
                  ) && (
                    <span className="text-xs px-2 py-1 rounded bg-orange-900/30 text-orange-400 border border-orange-800/50">
                      ☁️ R2
                    </span>
                  )}

                {img.isPrimary && (
                  <span className="text-xs px-2 py-1 rounded bg-orange-900/30 text-orange-400 border border-orange-800/50">
                    ⭐ Primary
                  </span>
                )}
              </div>

              <input
                className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-sm"
                placeholder="SEO Alt Text"
                value={img.alt}
                onChange={(e) =>
                  updateImage(
                    index,
                    "alt",
                    e.target.value
                  )
                }
              />

              <input
                className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-sm"
                placeholder="Caption"
                value={
                  img.caption
                }
                onChange={(e) =>
                  updateImage(
                    index,
                    "caption",
                    e.target.value
                  )
                }
              />

              {img.credit && (
                <p className="text-xs text-gray-500">
                  📸 {img.credit} •{" "}
                  {img.license}
                </p>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setEditingImage(
                      img
                    )
                  }
                  className="flex-1 bg-purple-600 px-4 py-2 rounded-lg text-sm hover:bg-purple-700"
                >
                  ✏️ Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setPrimary(
                      index
                    )
                  }
                  className="flex-1 bg-orange-600 px-4 py-2 rounded-lg text-sm hover:bg-orange-700"
                >
                  {img.isPrimary
                    ? "⭐ Primary"
                    : "Set Primary"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    removeImage(
                      index
                    )
                  }
                  className="bg-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-700"
                >
                  🗑️
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {editingImage && (
        <ImageEditorModal
          image={
            editingImage
          }
          title={
            form.title ||
            "NationPath Article"
          }
          categoryName={
            categoryName
          }
          onClose={() =>
            setEditingImage(
              null
            )
          }
          onSave={
            handleSaveEditedImage
          }
        />
      )}
    </div>
  );
}