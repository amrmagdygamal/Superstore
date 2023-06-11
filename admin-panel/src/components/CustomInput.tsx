interface propsType {
  type: string
  label?: string
  i_id?: string 
  name: string
  val?: number | string 
  i_class?: string
  onChan?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const CustomInput = (props: propsType) => {
  const { type, label, i_id, i_class, name, val, onChan, onBlur } = props;

  return (
    <div className="form-floating mt-3">
      <input
        type={type}
        name={name}
        id={i_id}
        placeholder={label}
        className={`form-control ${i_class}`}
        value={val}
        onChange={onChan}
        onBlur={onBlur}
      />
      <label htmlFor={i_id}>{label}</label>
    </div>
  );
};

export default CustomInput;
