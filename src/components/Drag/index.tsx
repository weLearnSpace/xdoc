import classNames from 'classnames';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import DragLine from '../DragLine';
import './index.css';

export interface IDragContentProps {
  left: (...args: any[]) => React.ReactNode;
  right: (...args: any[]) => React.ReactNode;
  initLeftWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  percentageLayout?: boolean;
  [key: string]: any;
}

const DragContent: React.FC<IDragContentProps> = (props) => {
  const {
    left = () => null,
    right = () => null,
    initLeftWidth = 40,
    percentageLayout = true,
    minWidth,
    maxWidth,
  }: any = props;
  const leftRef: any = useRef(null);
  const rightRef: any = useRef(null);
  const dragRef: any = useRef(null);
  const [leftWidth, setWidth]: any = useState(initLeftWidth);

  const onChange = (value: number) => {
    if (percentageLayout) {
      const width = dragRef.current.clientWidth;
      let willWidth = 0;
      if (leftWidth > 1) {
        willWidth = leftWidth / width + value / width;
      } else {
        willWidth = leftWidth + value / width;
      }
      willWidth =
        minWidth && willWidth < minWidth
          ? minWidth
          : maxWidth && willWidth > maxWidth
          ? maxWidth
          : willWidth;
      setWidth(willWidth);
    } else {
      let willWidth = leftWidth + value;
      willWidth =
        minWidth && willWidth < minWidth
          ? minWidth
          : maxWidth && willWidth > maxWidth
          ? maxWidth
          : willWidth;
      setWidth(willWidth);
    }
  };

  useEffect(() => {
    const width = dragRef.current.clientWidth;
    if (leftWidth > 1 && percentageLayout) {
      setWidth(leftWidth / width);
    }
  }, []);

  return (
    <div className="drag_content" ref={dragRef}>
      {left({
        ref: leftRef,
        style: {
          width: leftWidth > 1 ? `${leftWidth}px` : `${leftWidth * 100}%`,
        },
      })}
      <DragLine
        onChange={onChange}
        leftWidth={leftWidth}
        min={leftWidth <= minWidth}
        max={leftWidth >= maxWidth}
      />
      {right({
        ref: rightRef,
        style: {
          flex: 1,
        },
      })}
    </div>
  );
};

export default DragContent;
