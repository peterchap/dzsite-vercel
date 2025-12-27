import { NextRequest, NextResponse } from "next/server";
import { draftMode } from "next/headers";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  const slugParam = url.searchParams.get("slug") || "/";

  if (!process.env.SANITY_PREVIEW_SECRET) {
    return NextResponse.json({ error: "Missing SANITY_PREVIEW_SECRET" }, { status: 500 });
  }

  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return NextResponse.json({ error: "Invalid preview secret" }, { status: 401 });
  }

  draftMode().enable();

  const slug = slugParam.startsWith("/") ? slugParam : `/${slugParam}`;
  const redirectUrl = new URL(slug, url.origin);
  return NextResponse.redirect(redirectUrl);
}
