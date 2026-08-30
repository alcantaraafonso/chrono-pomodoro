import styles from "./styles.module.css";

type DefaultInputProps = {
  id: string;
  labelText?: string;
} & React.ComponentProps<"input">;

export function DefaultInput(props: DefaultInputProps) {
  const { type, id, labelText, ...rest } = props;
  return (
    <>
      {labelText && (
        <label htmlFor="" id={id}>
          {labelText}
        </label>
      )}
      <input type={type} id={id} {...rest} className={styles.input} />
    </>
  );
}
