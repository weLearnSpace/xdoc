import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import './index.css';

export interface IDragLineProps {
  [key: string]: any;
}

const DragLine: React.FC<IDragLineProps> = (props) => {
  const { min, max, onChange, leftWidth } = props;
  const ref: any = useRef(null);
  const cls = classNames('drag_line', {
    drag_line_min: min,
    drag_line_max: max,
  });

  useEffect(() => {
    ref.current.onmousedown = (e: React.MouseEvent<HTMLElement>) => {
      document.onmousemove = (ev: any) => {
        onChange(ev.clientX - e.clientX);
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    };
  }, [leftWidth]);

  return <div className={cls} ref={ref}></div>;
};

export default DragLine;
