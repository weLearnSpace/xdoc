import React, { forwardRef, useContext, useState } from 'react';
import { Editor, Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import mermaid from '@bytemd/plugin-mermaid';
import breaks from '@bytemd/plugin-breaks';
import footnotes from '@bytemd/plugin-footnotes';
import frontmatter from '@bytemd/plugin-frontmatter';
import gemoji from '@bytemd/plugin-gemoji';
import highlight from '@bytemd/plugin-highlight-ssr';
import math from '@bytemd/plugin-math-ssr';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import './index.css';

import 'bytemd/dist/index.min.css';
import 'github-markdown-css/github-markdown.css';
// 引入高亮css
import 'highlight.js/styles/vs.css';
import { HomeContext } from '../../pages/Home/model';

const plugins = [
  gfm(),
  mermaid(),
  breaks(),
  footnotes(),
  frontmatter(),
  gemoji(),
  highlight(),
  math(),
  mediumZoom(),
];

export interface IEditContentProps {
  [key: string]: any;
}

const EditContent: any = forwardRef<any>((props, ref) => {
  const [value, setValue] = useState('');
  const [state, funs]: any = useContext(HomeContext);
  return (
    <div className="edit_content" ref={ref} {...props}>
      <Editor
        value={state.fileTextMaps[state.activeFile] ?? ''}
        plugins={plugins}
        onChange={(v) => {
          setValue(v);
        }}
      />
    </div>
  );
});

export default EditContent;
