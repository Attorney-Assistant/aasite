import styles from "./ComicButton.module.css";

export interface ComicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function ComicButton({ variant = "primary", size = "md", className = "", ...props }: ComicButtonProps) {
  const cls = [styles.btn, styles[size], variant !== "primary" ? styles[variant] : "", className]
    .filter(Boolean).join(" ");
  return <button className={cls} {...props} />;
}
