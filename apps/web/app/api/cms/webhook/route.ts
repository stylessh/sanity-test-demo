import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "random-secret-value";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || authHeader !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Sanity webhook payload structure
    const { _type, _id } = body;

    // Handle different document types and revalidation
    if (_type === "homepage") {
      revalidatePath("/");
    }

    if (_type === "post") {
      revalidatePath("/");
      revalidatePath("/posts");

      if (_id) {
        revalidatePath(`/posts/${_id}`);
      }

      revalidateTag("posts", {
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Revalidation triggered",
        type: _type,
        id: _id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
