"use client";

import { useState } from "react";
import type { DocEntry } from "@/mocks/dashboard-data";

function DocRow({ doc, onOpen }: { doc: DocEntry; onOpen: (doc: DocEntry) => void }) {
  const clickable = doc.status === "view";
  return (
    <div
      className="doc-item"
      style={{ cursor: clickable ? "pointer" : "default", opacity: clickable ? 1 : 0.5 }}
      onClick={clickable ? () => onOpen(doc) : undefined}
    >
      <div className="doc-icon" style={doc.iconStyled ? { background: "var(--ledger-soft)", color: "var(--ledger)" } : undefined}>
        {doc.iconLabel}
      </div>
      <div className="doc-info">
        <div className="doc-name">{doc.name}</div>
        <div className="doc-meta">{doc.meta}</div>
      </div>
      <div style={{ fontSize: 12, color: clickable ? "var(--ledger)" : "var(--ink-soft)", fontWeight: clickable ? 600 : 500 }}>
        {clickable ? "View" : "Pending"}
      </div>
    </div>
  );
}

export function DocsScreen({ certificateDocs, corporateDocs }: { certificateDocs: DocEntry[]; corporateDocs: DocEntry[] }) {
  const [openDoc, setOpenDoc] = useState<DocEntry | null>(null);

  return (
    <div className="body">
      <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 21, fontWeight: 500, margin: "0 0 4px" }}>Documents</h2>
      <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "0 0 18px" }}>All official documents from your filings. Tap to view.</p>

      <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 10, fontFamily: "var(--font-plex-mono), monospace" }}>
        Certificates
      </div>
      {certificateDocs.map((doc) => (
        <DocRow doc={doc} key={doc.id} onOpen={setOpenDoc} />
      ))}

      <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-soft)", margin: "20px 0 10px", fontFamily: "var(--font-plex-mono), monospace" }}>
        Corporate Records
      </div>
      {corporateDocs.map((doc) => (
        <DocRow doc={doc} key={doc.id} onOpen={setOpenDoc} />
      ))}

      <div
        className={`doc-modal${openDoc ? " open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpenDoc(null);
        }}
      >
        <div className="doc-modal-card">
          <div className="doc-modal-handle" />
          <div className="doc-modal-head">
            <div>
              <div className="doc-modal-title">{openDoc?.name ?? "Document"}</div>
              <div className="doc-modal-meta">{openDoc?.meta ?? ""}</div>
            </div>
            <button className="doc-close" onClick={() => setOpenDoc(null)} type="button">
              ✕
            </button>
          </div>
          <div className="doc-preview">
            <div className="doc-line head" />
            <div className="doc-line full" />
            <div className="doc-line med" />
            <div className="doc-line full" />
            <div className="doc-line short" />
            <div className="doc-line full" style={{ marginTop: 14 }} />
            <div className="doc-line full" />
            <div className="doc-line med" />
            <div className="doc-line full" />
            <div className="doc-line full" />
            <div className="doc-line short" />
          </div>
          <button className="btn btn-primary" style={{ marginBottom: 8 }} type="button">
            Download PDF
          </button>
          <button className="btn btn-ghost" onClick={() => setOpenDoc(null)} type="button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
