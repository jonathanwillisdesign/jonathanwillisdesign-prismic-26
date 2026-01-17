import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

/**
 * This endpoint purges Prismic content from Next.js' cache. It is called when
 * content is published in Prismic.
 */
function isAuthorized(request: Request) {
  const secret = process.env.PRISMIC_WEBHOOK_SECRET;

  // If no secret is configured, allow (developer-friendly default).
  // In production, set PRISMIC_WEBHOOK_SECRET and include it in your webhook URL.
  if (!secret) return true;

  const url = new URL(request.url);
  const provided =
    url.searchParams.get("secret") ??
    request.headers.get("x-prismic-webhook-secret") ??
    request.headers.get("x-webhook-secret");

  return Boolean(provided && provided === secret);
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { revalidated: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  // Purge all Prismic-tagged fetches (configured in `src/prismicio.ts`).
  revalidateTag("prismic");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

export async function GET(request: Request) {
  // Handy for quickly testing in a browser:
  // /api/revalidate?secret=YOUR_SECRET
  return POST(request);
}
