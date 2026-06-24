import styles from "./HeroLayout.module.css";

export interface HeroLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export function HeroLayout({ left, right, className = "", ...props }: HeroLayoutProps) {
  const cls = [styles.hero, className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...props}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}
