import styles from "./BurstBadge.module.css";
import burst1 from "../../assets/burst-1.svg";
import burst2 from "../../assets/burst-2.svg";
import burst3 from "../../assets/burst-3.svg";
import burst4 from "../../assets/burst-4.svg";

const bursts: Record<1 | 2 | 3 | 4, string> = {
  1: burst1,
  2: burst2,
  3: burst3,
  4: burst4,
};

export interface BurstBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  burst?: 1 | 2 | 3 | 4;
}

export function BurstBadge({ burst = 1, className = "", children, ...props }: BurstBadgeProps) {
  const cls = [styles.badge, className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...props}>
      <img src={bursts[burst]} alt="" className={styles.burstImg} />
      <span className={styles.text}>{children}</span>
    </div>
  );
}
