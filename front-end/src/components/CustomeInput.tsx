
const CustomInput = (props: any) => {
  const { type, name, placeholder, classname } = props;
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-control ${classname}`}
      />
    </div>
  );
};

export default CustomInput;