import type { ReactNode } from "react";
import { FocusedShell } from "@/components/shell/FocusedShell";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <FocusedShell>{children}</FocusedShell>;
}
