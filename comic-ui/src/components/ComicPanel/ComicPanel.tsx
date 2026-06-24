import styles from "./ComicPanel.module.css";

export interface ComicPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function ComicPanel({ className, children, ...props }: ComicPanelProps) {
  const cls = [styles.panel, className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...props}>
      <span className={styles.tape + " " + styles.tapeTL}>★</span>
      <span className={styles.tape + " " + styles.tapeTR}>★</span>
      {children}
    </div>
  );
}
