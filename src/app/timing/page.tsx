"use client";

import DemoLayout from "@/components/DemoLayout";
import DemoShell from "@/components/DemoShell";
import TimingBad from "@/components/demos/TimingBad";
import TimingGood from "@/components/demos/TimingGood";

export default function TimingPage() {
  return (
    <DemoLayout
      number={1}
      title="Timing"
      principle="When to respond"
      description="The difference between helpful and annoying is often just a matter of when AI decides to speak up."
      insight=""
      takeaway="Wait for idle moments before suggesting. Require minimum context so suggestions are relevant."
    >
      <DemoShell
        badDescription="Fires on every keystroke. Watch the suggestion flicker."
        goodDescription="Waits 2s after you stop. Min 20 chars."
        bad={<TimingBad />}
        good={<TimingGood />}
      />
    </DemoLayout>
  );
}
