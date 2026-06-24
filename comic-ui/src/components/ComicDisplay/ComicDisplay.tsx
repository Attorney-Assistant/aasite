import styles from "./ComicDisplay.module.css";

export interface ComicDisplayProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
  className?: string;
}

export function ComicDisplay({ as = "h1", className, ...props }: ComicDisplayProps) {
  const Tag = as as any;
  return <Tag className={[styles.display, className].filter(Boolean).join(" ")} {...props} />;
}
