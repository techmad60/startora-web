interface UploadZoneProps {
  icon: string;
  text: string;
  sub: string;
  done: boolean;
  onToggle?: () => void;
}

/** Client-interactive when onToggle is passed; static (prefilled/locked) otherwise. */
export function UploadZoneItem({ icon, text, sub, done, onToggle }: UploadZoneProps) {
  return (
    <div className={`upload-zone${done ? " done" : ""}`} onClick={onToggle} style={onToggle ? { cursor: "pointer" } : undefined}>
      <div className="upload-zone-icon">{icon}</div>
      <div className="upload-zone-text">{text}</div>
      <div className="upload-zone-sub">{sub}</div>
    </div>
  );
}
