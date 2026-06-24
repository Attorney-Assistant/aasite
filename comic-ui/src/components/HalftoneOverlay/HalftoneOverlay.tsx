import styles from "./HalftoneOverlay.module.css";

export interface HalftoneOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  opacity?: number;
}

export function HalftoneOverlay({ opacity = 0.05, className = "", style, ...props }: HalftoneOverlayProps) {
  const cls = [styles.overlay, className].filter(Boolean).join(" ");
  return (
    <div
      className={cls}
      style={{ ["--ht-opacity" as any]: opacity, ...style }}
      {...props}
    />
  );
}
