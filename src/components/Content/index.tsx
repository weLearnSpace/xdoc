import React, { forwardRef } from 'react';
import DragContent from '../Drag';
import EditContent from '../EditContent';
import PreContent from '../PreContent';
import './index.css';

export interface IContentProps {
  [key: string]: any;
}

const Content: any = forwardRef<any>((props, ref) => {
  return (
    <div className="content" ref={ref} {...props}>
      <DragContent
        initLeftWidth={1}
        minWidth={0.2}
        maxWidth={0.8}
        left={(props) => {
          return <EditContent {...props} />;
        }}
        right={(props) => {
          return null;
          // return <PreContent {...props} />;
        }}
      />
    </div>
  );
});

export default Content;
