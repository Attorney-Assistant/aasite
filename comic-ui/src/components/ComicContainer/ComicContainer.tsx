import styles from "./ComicContainer.module.css";

export interface ComicContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: "wide" | "narrow";
}

export function ComicContainer({ width = "wide", className = "", ...props }: ComicContainerProps) {
  const cls = [styles.container, width === "narrow" ? styles.narrow : "", className]
    .filter(Boolean).join(" ");
  return <div className={cls} {...props} />;
}
