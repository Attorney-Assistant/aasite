import styles from "./ComicEyebrow.module.css";

export interface ComicEyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "red" | "gold";
}

export function ComicEyebrow({ tone = "red", className, ...props }: ComicEyebrowProps) {
  const cls = [styles.eyebrow, tone === "gold" ? styles.gold : "", className]
    .filter(Boolean).join(" ");
  return <span className={cls} {...props} />;
}
