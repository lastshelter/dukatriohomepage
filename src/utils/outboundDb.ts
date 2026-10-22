import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";

export interface OutboundLead {
  id: number;
  company_name: string;
  contact_name: string;
  role: string | null;
  channel: string;
  profile_url: string | null;
  wedge_type: string;
  status: "contacted" | "replied" | "meeting_booked" | "negotiation" | "won" | "lost";
  contacted_at: string;
  last_followup_at: string | null;
  notes: string | null;
}

export type NewOutboundLead = Omit<OutboundLead, "id" | "contacted_at"> & {
  contacted_at?: string;
};

export interface OutboundMetrics {
  totalLeads: number;
  contactedCount: number;
  repliedCount: number;
  meetingBookedCount: number;
  wonCount: number;
  estimatedPipelineEur: number;
}

let dbInstance: DatabaseSync | null = null;

function getDb(): DatabaseSync {
  if (dbInstance) return dbInstance;

  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const dbPath = path.join(dataDir, "outbound_leads.db");
  const db = new DatabaseSync(dbPath);

  // Enable WAL mode for high concurrency
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA synchronous = NORMAL;");

  // Schema creation
  db.exec(`
    CREATE TABLE IF NOT EXISTS outbound_leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company_name TEXT NOT NULL,
        contact_name TEXT NOT NULL,
        role TEXT,
        channel TEXT DEFAULT 'linkedin',
        profile_url TEXT,
        wedge_type TEXT NOT NULL,
        status TEXT DEFAULT 'contacted',
        contacted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_followup_at DATETIME,
        notes TEXT
    );
  `);

  // Seed sample leads if empty
  const countRow = db.prepare("SELECT COUNT(*) as count FROM outbound_leads").get() as { count: number };
  if (countRow.count === 0) {
    const insertStmt = db.prepare(`
      INSERT INTO outbound_leads (company_name, contact_name, role, channel, profile_url, wedge_type, status, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertStmt.run(
      "Balkan Trans Logistics",
      "Marko Nikolic",
      "Operations Director",
      "linkedin",
      "https://linkedin.com",
      "Specialized Fleet & Dispatch Desk",
      "replied",
      "Interested in replacing shared Excel dispatch schedule for 24-vehicle fleet. Follow up on Monday."
    );

    insertStmt.run(
      "Alpe Adria Concrete Group",
      "Stefan Weber",
      "Commercial Director",
      "linkedin",
      "https://linkedin.com",
      "Field Ticket & Material OCR Pipeline",
      "meeting_booked",
      "Discovery call booked for Thursday 14:00 CET. Pain point: 60+ lost delivery slips/month across ready-mix sites."
    );

    insertStmt.run(
      "Adria Capital Syndicate",
      "Luka Jovanovic",
      "Managing Partner",
      "linkedin",
      "https://linkedin.com",
      "B2B Underwriting / BFS Harvest",
      "contacted",
      "Sent case study link for BFS Harvest. Commercial lending syndicate dealing with manual DSCR workbooks."
    );
  }

  dbInstance = db;
  return db;
}

export function getAllOutboundLeads(filters?: { status?: string; search?: string; wedge?: string }): OutboundLead[] {
  const db = getDb();
  let query = "SELECT * FROM outbound_leads WHERE 1=1";
  const params: unknown[] = [];

  if (filters?.status && filters.status !== "all") {
    query += " AND status = ?";
    params.push(filters.status);
  }

  if (filters?.wedge && filters.wedge !== "all") {
    query += " AND wedge_type = ?";
    params.push(filters.wedge);
  }

  if (filters?.search && filters.search.trim().length > 0) {
    const term = `%${filters.search.trim()}%`;
    query += " AND (company_name LIKE ? OR contact_name LIKE ? OR notes LIKE ?)";
    params.push(term, term, term);
  }

  query += " ORDER BY id DESC";

  return db.prepare(query).all(...params) as unknown as OutboundLead[];
}

export function createOutboundLead(lead: NewOutboundLead): OutboundLead {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO outbound_leads (company_name, contact_name, role, channel, profile_url, wedge_type, status, last_followup_at, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    lead.company_name,
    lead.contact_name,
    lead.role || null,
    lead.channel || "linkedin",
    lead.profile_url || null,
    lead.wedge_type,
    lead.status || "contacted",
    lead.last_followup_at || null,
    lead.notes || null
  );

  const newId = Number(result.lastInsertRowid);
  return db.prepare("SELECT * FROM outbound_leads WHERE id = ?").get(newId) as unknown as OutboundLead;
}

export function updateOutboundLead(id: number, updates: Partial<NewOutboundLead>): OutboundLead | null {
  const db = getDb();
  const fields: string[] = [];
  const params: unknown[] = [];

  if (updates.company_name !== undefined) {
    fields.push("company_name = ?");
    params.push(updates.company_name);
  }
  if (updates.contact_name !== undefined) {
    fields.push("contact_name = ?");
    params.push(updates.contact_name);
  }
  if (updates.role !== undefined) {
    fields.push("role = ?");
    params.push(updates.role);
  }
  if (updates.channel !== undefined) {
    fields.push("channel = ?");
    params.push(updates.channel);
  }
  if (updates.profile_url !== undefined) {
    fields.push("profile_url = ?");
    params.push(updates.profile_url);
  }
  if (updates.wedge_type !== undefined) {
    fields.push("wedge_type = ?");
    params.push(updates.wedge_type);
  }
  if (updates.status !== undefined) {
    fields.push("status = ?");
    params.push(updates.status);
  }
  if (updates.last_followup_at !== undefined) {
    fields.push("last_followup_at = ?");
    params.push(updates.last_followup_at);
  }
  if (updates.notes !== undefined) {
    fields.push("notes = ?");
    params.push(updates.notes);
  }

  if (fields.length === 0) {
    return db.prepare("SELECT * FROM outbound_leads WHERE id = ?").get(id) as unknown as OutboundLead | null;
  }

  params.push(id);
  const sql = `UPDATE outbound_leads SET ${fields.join(", ")} WHERE id = ?`;
  db.prepare(sql).run(...params);

  return db.prepare("SELECT * FROM outbound_leads WHERE id = ?").get(id) as unknown as OutboundLead | null;
}

export function deleteOutboundLead(id: number): boolean {
  const db = getDb();
  const stmt = db.prepare("DELETE FROM outbound_leads WHERE id = ?");
  const result = stmt.run(id);
  return result.changes > 0;
}

export function getOutboundMetrics(): OutboundMetrics {
  const db = getDb();
  const rows = db.prepare("SELECT status FROM outbound_leads").all() as unknown as { status: string }[];

  let contactedCount = 0;
  let repliedCount = 0;
  let meetingBookedCount = 0;
  let wonCount = 0;

  for (const row of rows) {
    if (row.status === "contacted") contactedCount++;
    else if (row.status === "replied") repliedCount++;
    else if (row.status === "meeting_booked" || row.status === "negotiation") meetingBookedCount++;
    else if (row.status === "won") wonCount++;
  }

  // Active pipeline: (replied + meetingBooked) * €4,800 + won * €4,800
  const activeDeals = repliedCount + meetingBookedCount;
  const estimatedPipelineEur = activeDeals * 4800 + wonCount * 4800;

  return {
    totalLeads: rows.length,
    contactedCount,
    repliedCount,
    meetingBookedCount,
    wonCount,
    estimatedPipelineEur,
  };
}
