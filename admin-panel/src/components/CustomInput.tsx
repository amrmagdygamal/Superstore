const CustomInput = (props: any) => {
  const { type, label, i_id, i_class, name, val, onChan } = props;

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
        onBlur={onChan}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CustomInput;
