// Opens a clean, print-ready document in a new tab and triggers the print
// dialog, so the facilitator can "Save as PDF".

export function esc(s: string): string {
  return String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}

export function printHtml(title: string, bodyHtml: string): void {
  const w = window.open("", "_blank");
  if (!w) {
    alert("Please allow pop-ups for this site to save the PDF.");
    return;
  }
  w.document.write(`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title>
  <style>
    *{box-sizing:border-box;}
    body{font-family:Georgia,'Times New Roman',serif; color:#241d12; margin:46px; line-height:1.5;}
    .k{font-family:ui-monospace,Menlo,monospace; font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:#a3451c; margin:0 0 6px;}
    h1{font-size:25px; margin:0 0 6px; line-height:1.15;}
    .sub{color:#6b5d4c; margin:0 0 22px; font-size:13px;}
    .persona-desc{font-size:15px; white-space:pre-wrap; background:#faf5ec; border:1px solid #e0d3bd; border-radius:8px; padding:14px 16px;}
    table{border-collapse:collapse; width:100%; margin-top:10px;}
    th,td{border:1px solid #cbb99d; padding:10px 12px; text-align:left; vertical-align:top; font-size:14px;}
    th{background:#efe6d6; font-size:12px; letter-spacing:.03em;}
    td.q{background:#faf5ec; color:#6b5d4c; width:34%;}
    .foot{margin-top:28px; color:#8a7a63; font-size:11px;}
    @media print{ body{margin:0.4in;} }
  </style></head><body>${bodyHtml}
  <script>window.onload=function(){setTimeout(function(){window.print();},200);};</script>
  </body></html>`);
  w.document.close();
}
