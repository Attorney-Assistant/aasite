import styles from "./ComicLabel.module.css";

export interface ComicLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "red" | "gold";
}

export function ComicLabel({ tone = "red", className, ...props }: ComicLabelProps) {
  const cls = [styles.label, tone === "gold" ? styles.gold : "", className]
    .filter(Boolean).join(" ");
  return <span className={cls} {...props} />;
}
