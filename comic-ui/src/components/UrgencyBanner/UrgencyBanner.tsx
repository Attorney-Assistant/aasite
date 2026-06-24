import styles from "./UrgencyBanner.module.css";

export interface UrgencyBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  children?: React.ReactNode;
}

export function UrgencyBanner({ label = "URGENT!", className, children, ...props }: UrgencyBannerProps) {
  const cls = [styles.banner, className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...props}>
      <span className={styles.bannerLabel}>{label}</span>
      <span className={styles.bannerText}>{children}</span>
    </div>
  );
}
