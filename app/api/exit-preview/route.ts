import { NextRequest, NextResponse } from "next/server";
import { draftMode } from "next/headers";

export async function GET(req: NextRequest) {
  (await draftMode()).disable();
  const url = new URL(req.url);
  const redirectUrl = new URL("/", url.origin);
  return NextResponse.redirect(redirectUrl);
}
