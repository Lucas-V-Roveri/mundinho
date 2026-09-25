import { cn } from "@/lib/cn";

export function SkinFace({
  src,
  name,
  size = "lg",
  className,
}: {
  src: string;
  name: string;
  size?: "sm" | "lg";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "skin-face-frame relative inline-block shrink-0 overflow-hidden border-2 border-night-950 bg-stone-300",
        size === "sm" ? "size-8" : "size-20",
        className,
      )}
    >
      <img src={src} alt={`Rosto da skin de ${name}`} className="skin-face-sheet skin-face-base" />
      <img src={src} alt="" aria-hidden="true" className="skin-face-sheet skin-face-hat" />
    </span>
  );
}
