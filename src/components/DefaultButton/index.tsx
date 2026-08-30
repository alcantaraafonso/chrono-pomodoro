import styles from "./styles.module.css";

type DefaultButtonProps = {
  children: React.ReactNode;
  color?: "green" | "red";
} & React.ComponentProps<"button">;

export function DefaultButton({
  children,
  color = "green",
  ...props
}: DefaultButtonProps) {
  return (
    <>
      <button {...props} className={`${styles.button} ${styles[color]}`}>
        {/* tá entre colchetes para pegar o valor da variavel */}
        {children}
      </button>
    </>
  );
}
