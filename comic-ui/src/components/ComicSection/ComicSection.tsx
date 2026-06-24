import styles from "./ComicSection.module.css";

export interface ComicSectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: "navy" | "navy-deep";
}

export function ComicSection({ tone = "navy", className = "", ...props }: ComicSectionProps) {
  const cls = [styles.section, tone === "navy-deep" ? styles.deep : "", className]
    .filter(Boolean).join(" ");
  return <section className={cls} {...props} />;
}
