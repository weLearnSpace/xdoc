import React, { forwardRef } from 'react';
import './index.css';

export interface IPreContentProps {
  [key: string]: any;
}

const PreContent: any = forwardRef<any>((props, ref) => {
  return (
    <div className="pre_content" ref={ref} {...props}>
      123
    </div>
  );
});

export default PreContent;
