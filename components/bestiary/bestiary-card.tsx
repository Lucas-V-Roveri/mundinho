"use client";

import { BestiaryCompactCard } from "@/components/bestiary/bestiary-compact-card";
import { BestiaryCard as BestiaryFullCard } from "@/components/bestiary/bestiary-full-card";
import { sanitizeBestiaryMedia } from "@/lib/bestiary-media";
import type { BestiaryEntry, BestiaryStateRow, BestiaryTrackFlag } from "@/types/bestiary";

type BestiaryCardProps = {
  entry: BestiaryEntry;
  row: BestiaryStateRow;
  disabled: boolean;
  revealAll?: boolean;
  onFlag: (flag: BestiaryTrackFlag, value: boolean) => Promise<void>;
};

export function BestiaryCard(props: BestiaryCardProps) {
  const safeProps = { ...props, entry: sanitizeBestiaryMedia(props.entry) };

  return safeProps.entry.depth === "compact"
    ? <BestiaryCompactCard {...safeProps} />
    : <BestiaryFullCard {...safeProps} />;
}
