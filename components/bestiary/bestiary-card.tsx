"use client";

import { BestiaryCompactCard } from "@/components/bestiary/bestiary-compact-card";
import { BestiaryCard as BestiaryFullCard } from "@/components/bestiary/bestiary-full-card";
import type { BestiaryEntry, BestiaryStateRow, BestiaryTrackFlag } from "@/types/bestiary";

type BestiaryCardProps = {
  entry: BestiaryEntry;
  row: BestiaryStateRow;
  disabled: boolean;
  revealAll?: boolean;
  onFlag: (flag: BestiaryTrackFlag, value: boolean) => Promise<void>;
};

export function BestiaryCard(props: BestiaryCardProps) {
  return props.entry.depth === "compact"
    ? <BestiaryCompactCard {...props} />
    : <BestiaryFullCard {...props} />;
}
