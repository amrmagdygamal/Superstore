

interface PropsTypes {
  col: any;
  setColor?: any;
  border?: boolean;
  color?: any
}

export const Color = (props: PropsTypes) => {

  const { col } = props;
  return (
    <div
      
      className="p-2 text-center rounded-circle"
    >
      <li
        style={{ backgroundColor: col.title }}
      ></li>
    </div>
  );
};
