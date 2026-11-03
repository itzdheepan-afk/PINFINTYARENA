import { NextResponse } from "next/server";
import { DEFAULT_SITE_CONTENT } from "@/data/defaultSiteContent";
import { SiteContent } from "@/types/siteContent";

let serverSiteContent: SiteContent = { ...DEFAULT_SITE_CONTENT };

export async function GET() {
  return NextResponse.json({
    success: true,
    content: serverSiteContent,
  });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    serverSiteContent = {
      ...serverSiteContent,
      ...body,
    };
    return NextResponse.json({
      success: true,
      message: "Site content updated successfully",
      content: serverSiteContent,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to update content" },
      { status: 500 }
    );
  }
}

export async function POST() {
  serverSiteContent = { ...DEFAULT_SITE_CONTENT };
  return NextResponse.json({
    success: true,
    message: "Site content reset to factory defaults",
    content: serverSiteContent,
  });
}
