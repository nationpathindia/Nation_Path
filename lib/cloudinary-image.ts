const CLOUDINARY_HOST = "res.cloudinary.com";

export function isCloudinaryUrl(src: string): boolean {
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

export function cloudinaryImageUrl(
  src: string,
  width?: number
): string {
  if (!src || !isCloudinaryUrl(src)) {
    return src;
  }

  try {
    const url = new URL(src);
    const parts = url.pathname.split("/");

    const uploadIndex = parts.indexOf("upload");

    if (uploadIndex === -1) {
      return src;
    }

    const transformation =
      width && Number.isFinite(width) && width > 0
        ? `f_auto,q_auto,w_${Math.round(width)}`
        : "f_auto,q_auto";

    const nextSegment =
      parts[uploadIndex + 1] || "";

    /*
     * Cloudinary may already have transformations
     * after /upload/.
     *
     * Do not touch the original asset path.
     */

    const looksLikeTransformation =
      nextSegment.includes(",") ||
      nextSegment.startsWith("f_") ||
      nextSegment.startsWith("q_") ||
      nextSegment.startsWith("w_") ||
      nextSegment.startsWith("c_") ||
      nextSegment.startsWith("g_") ||
      nextSegment.startsWith("ar_") ||
      nextSegment.startsWith("dpr_");

    if (looksLikeTransformation) {
      parts[uploadIndex + 1] = transformation;
    } else {
      parts.splice(
        uploadIndex + 1,
        0,
        transformation
      );
    }

    url.pathname = parts.join("/");

    return url.toString();
  } catch {
    return src;
  }
}