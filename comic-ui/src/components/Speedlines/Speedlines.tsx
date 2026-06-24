import styles from "./Speedlines.module.css";

export interface SpeedlinesProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Speedlines({ className = "", ...props }: SpeedlinesProps) {
  const cls = [styles.speedlines, className].filter(Boolean).join(" ");
  return <div className={cls} {...props} />;
}
