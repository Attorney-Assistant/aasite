import styles from "./BatSignal.module.css";
import batSignal from "../../assets/bat-signal.svg";

export interface BatSignalProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export function BatSignal({ size = 360, className = "", style, ...props }: BatSignalProps) {
  const cls = [styles.stage, className].filter(Boolean).join(" ");
  return (
    <div
      className={cls}
      style={{ ["--bs-size" as any]: size + "px", ...style }}
      {...props}
    >
      <div className={styles.glow} />
      <img src={batSignal} alt="Bat Signal" className={styles.bat} />
    </div>
  );
}
