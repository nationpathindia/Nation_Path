// components/admin/posts/utils/html.ts


export function stripHtml(
  html:string
){


return html.replace(
  /<[^>]*>?/gm,
  ""
);


}