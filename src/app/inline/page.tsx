"use client";

import DemoLayout from "@/components/DemoLayout";
import DemoShell from "@/components/DemoShell";
import InlineBad from "@/components/demos/InlineBad";
import InlineGood from "@/components/demos/InlineGood";

export default function InlinePage() {
  return (
    <DemoLayout
      number={2}
      title="Inline"
      principle="Where to suggest"
      description="Context switching kills flow. The best suggestions appear where you're already looking."
      insight=""
      takeaway="Put suggestions inline. Tab to accept, keep typing to dismiss."
    >
      <DemoShell
        badDescription="Sidebar chat. You have to copy-paste suggestions."
        goodDescription="Ghost text inline. Tab to accept, keep typing to dismiss."
        bad={<InlineBad />}
        good={<InlineGood />}
      />
    </DemoLayout>
  );
}
