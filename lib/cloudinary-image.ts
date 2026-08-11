const CLOUDINARY_HOST = "res.cloudinary.com";

/**
 * Check whether a URL is a valid Cloudinary HTTPS URL.
 */
export function isCloudinaryUrl(
  src: string,
): boolean {
  if (!src) {
    return false;
  }

  try {
    const url = new URL(src);

    return (
      url.protocol === "https:" &&
      url.hostname === CLOUDINARY_HOST
    );
  } catch {
    return false;
  }
}

/**
 * Add Cloudinary delivery optimization.
 *
 * IMPORTANT:
 * - Original database URL is never modified.
 * - Only the browser delivery URL is transformed.
 * - Existing Cloudinary transformation segment is replaced.
 */
export function cloudinaryImageUrl(
  src: string,
  width?: number,
): string {
  if (
    !src ||
    !isCloudinaryUrl(src)
  ) {
    return src;
  }

  try {
    const url = new URL(src);

    const parts =
      url.pathname.split("/");

    const uploadIndex =
      parts.indexOf("upload");

    if (uploadIndex === -1) {
      return src;
    }

    const normalizedWidth =
      width &&
      Number.isFinite(width) &&
      width > 0
        ? Math.round(width)
        : null;

    const transformation =
      normalizedWidth
        ? `f_auto,q_auto,w_${normalizedWidth}`
        : "f_auto,q_auto";

    const nextSegment =
      parts[uploadIndex + 1] || "";

    /**
     * Cloudinary transformation detection.
     *
     * Examples:
     *
     * /upload/f_auto,q_auto/
     * /upload/w_600/
     * /upload/c_fill,w_600/
     * /upload/g_auto/
     */
    const looksLikeTransformation =
      nextSegment.includes(",") ||
      nextSegment.startsWith("f_") ||
      nextSegment.startsWith("q_") ||
      nextSegment.startsWith("w_") ||
      nextSegment.startsWith("c_") ||
      nextSegment.startsWith("g_") ||
      nextSegment.startsWith("ar_") ||
      nextSegment.startsWith("dpr_") ||
      nextSegment.startsWith("fl_") ||
      nextSegment.startsWith("e_") ||
      nextSegment.startsWith("r_") ||
      nextSegment.startsWith("bo_");

    if (looksLikeTransformation) {
      parts[uploadIndex + 1] =
        transformation;
    } else {
      parts.splice(
        uploadIndex + 1,
        0,
        transformation,
      );
    }

    url.pathname =
      parts.join("/");

    return url.toString();
  } catch {
    return src;
  }
}

