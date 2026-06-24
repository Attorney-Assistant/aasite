import styles from "./Skyline.module.css";
import skyline from "../../assets/skyline.svg";

export interface SkylineProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skyline({ className = "", style, ...props }: SkylineProps) {
  const cls = [styles.skyline, className].filter(Boolean).join(" ");
  return (
    <div
      className={cls}
      style={{ backgroundImage: "url(" + skyline + ")", ...style }}
      {...props}
    />
  );
}
