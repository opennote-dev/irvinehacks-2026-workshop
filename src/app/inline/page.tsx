"use client";

import DemoLayout from "@/components/DemoLayout";
import DemoShell from "@/components/DemoShell";
import InlineBad from "@/components/demos/InlineBad";
import InlineGood from "@/components/demos/InlineGood";

const DEMO_TEXT =
  "Meeting notes from the Q3 planning session: we need to finalize the roadmap by Friday. Key priorities include shipping the new dashboard and";

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
        badDemoText={DEMO_TEXT}
        goodDemoText={DEMO_TEXT}
        badDemoHint="then ask the chat for help"
        goodDemoHint="then stop and wait for ghost text"
        bad={(dt) => <InlineBad demoText={dt} />}
        good={(dt) => <InlineGood demoText={dt} />}
      />
    </DemoLayout>
  );
}
