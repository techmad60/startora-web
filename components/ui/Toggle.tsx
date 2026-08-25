"use client";

export function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return <div className={`toggle${on ? "" : " off"}`} onClick={onChange} />;
}
