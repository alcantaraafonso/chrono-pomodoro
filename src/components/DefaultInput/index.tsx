import styles from "./styles.module.css";

type DefaultInputProps = {
  id: string;
  labelText?: string;
} & React.ComponentProps<"input">;

export function DefaultInput({
  type,
  id,
  labelText,
  ...props
}: DefaultInputProps) {
  return (
    <>
      {labelText && (
        <label htmlFor="" id={id}>
          {labelText}
        </label>
      )}
      <input type={type} id={id} {...props} className={styles.input} />
    </>
  );
}
