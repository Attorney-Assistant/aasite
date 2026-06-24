import styles from "./ComicCard.module.css";

export interface ComicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function ComicCard({ className, ...props }: ComicCardProps) {
  const cls = [styles.card, className].filter(Boolean).join(" ");
  return <div className={cls} {...props} />;
}
