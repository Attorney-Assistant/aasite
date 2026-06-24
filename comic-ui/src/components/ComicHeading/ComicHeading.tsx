import styles from "./ComicHeading.module.css";

export interface ComicHeadingProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
  className?: string;
}

export function ComicHeading({ as = "h2", className, ...props }: ComicHeadingProps) {
  const Tag = as as any;
  return <Tag className={[styles.heading, className].filter(Boolean).join(" ")} {...props} />;
}
