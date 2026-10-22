import { NextRequest, NextResponse } from "next/server";
import {
  getAllOutboundLeads,
  createOutboundLead,
  updateOutboundLead,
  deleteOutboundLead,
  getOutboundMetrics,
  type NewOutboundLead,
} from "@/utils/outboundDb";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "all";
    const wedge = searchParams.get("wedge") || "all";
    const search = searchParams.get("search") || "";

    const leads = getAllOutboundLeads({ status, wedge, search });
    const metrics = getOutboundMetrics();

    return NextResponse.json({
      success: true,
      data: {
        leads,
        metrics,
      },
    });
  } catch (error) {
    console.error("[OUTBOUND_API_GET_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch outbound leads" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<NewOutboundLead>;

    if (!body.company_name || !body.contact_name || !body.wedge_type) {
      return NextResponse.json(
        { success: false, error: "company_name, contact_name, and wedge_type are required" },
        { status: 400 }
      );
    }

    const lead = createOutboundLead({
      company_name: String(body.company_name).trim(),
      contact_name: String(body.contact_name).trim(),
      role: body.role ? String(body.role).trim() : null,
      channel: body.channel ? String(body.channel).trim() : "linkedin",
      profile_url: body.profile_url ? String(body.profile_url).trim() : null,
      wedge_type: String(body.wedge_type).trim(),
      status: (body.status as NewOutboundLead["status"]) || "contacted",
      last_followup_at: body.last_followup_at || null,
      notes: body.notes ? String(body.notes).trim() : null,
    });

    const metrics = getOutboundMetrics();

    return NextResponse.json({
      success: true,
      data: {
        lead,
        metrics,
      },
    });
  } catch (error) {
    console.error("[OUTBOUND_API_POST_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to create outbound lead" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const id = Number(body.id);

    if (!id || Number.isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "Valid numeric lead ID is required" },
        { status: 400 }
      );
    }

    const updated = updateOutboundLead(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Lead not found or no changes applied" },
        { status: 404 }
      );
    }

    const metrics = getOutboundMetrics();

    return NextResponse.json({
      success: true,
      data: {
        lead: updated,
        metrics,
      },
    });
  } catch (error) {
    console.error("[OUTBOUND_API_PATCH_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to update outbound lead" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");
    const id = Number(idParam);

    if (!id || Number.isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "Valid numeric lead ID is required" },
        { status: 400 }
      );
    }

    const deleted = deleteOutboundLead(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    const metrics = getOutboundMetrics();

    return NextResponse.json({
      success: true,
      data: {
        id,
        metrics,
      },
    });
  } catch (error) {
    console.error("[OUTBOUND_API_DELETE_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete outbound lead" },
      { status: 500 }
    );
  }
}
