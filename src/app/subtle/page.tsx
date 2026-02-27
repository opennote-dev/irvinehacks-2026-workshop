"use client";

import DemoLayout from "@/components/DemoLayout";
import DemoShell from "@/components/DemoShell";
import SubtleBad from "@/components/demos/SubtleBad";
import SubtleGood from "@/components/demos/SubtleGood";

const DEMO_TEXT =
  "Hi team, I wanted to follow up on yesterday's standup. The main blocker right now is the API integration with the payments provider, and";

export default function SubtlePage() {
  return (
    <DemoLayout
      number={3}
      title="Subtle"
      principle="How assertive to be"
      description="The best AI assistance is the kind you barely notice."
      insight=""
      takeaway="Never interrupt the user's flow. Present but not pushy."
    >
      <DemoShell
        badDescription="Modal popup with guilt-trip dismiss."
        goodDescription="Ghost text appears quietly. No interruptions."
        badDemoText={DEMO_TEXT}
        goodDemoText={DEMO_TEXT}
        badDemoHint="then wait for the modal"
        goodDemoHint="then stop and wait for ghost text"
        bad={(dt) => <SubtleBad demoText={dt} />}
        good={(dt) => <SubtleGood demoText={dt} />}
      />
    </DemoLayout>
  );
}
