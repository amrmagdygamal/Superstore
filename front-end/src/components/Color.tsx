interface PropsTypes {
  col: any;
  setColor?: any;
  setColorBorder?: any;
  border?: boolean;
}

export const Color = (props: PropsTypes) => {
  const { col, setColor, setColorBorder, border } = props;
  return (
    <div
      style={{ border: border == true ? `3px solid ${col.title}` : 'none' }}
      className="p-2 text-center rounded-circle"
    >
      <li
        style={{ backgroundColor: col.title }}
        onClick={() => {
          if (setColor && setColorBorder) {
            setColor(col);
            setColorBorder(true);
          }
        }}
      ></li>
    </div>
  );
};
