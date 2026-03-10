export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.hostname === "beauty.hiinstitute.com") {
    url.hostname = "hiskinbeauty.com";
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
