interface PropsTypes {
  col: any
  onClick: any
  border: boolean
}

export const Color = (props: PropsTypes) => {

  const {col, onClick, border} = props
  return (
    <div style={{border: border == true ? `3px solid ${col.title}` : ""}} className="p-2 text-center rounded-circle">
      
        <li style={{backgroundColor: col.title}} onClick={onClick}></li>
      
    </div>
  );
};
