import { useState } from "react";

interface PropsTypes {
  col: any;
  setColor?: any;
  border?: boolean;
  color?: any
}

export const Color = (props: PropsTypes) => {
    const [colorBorder, setColorBorder] = useState(false);

  const { col, setColor } = props;
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
