"use client";

import DemoLayout from "@/components/DemoLayout";
import DemoShell from "@/components/DemoShell";
import SubtleBad from "@/components/demos/SubtleBad";
import SubtleGood from "@/components/demos/SubtleGood";

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
        bad={<SubtleBad />}
        good={<SubtleGood />}
      />
    </DemoLayout>
  );
}
