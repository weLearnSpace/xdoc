import React, { forwardRef, memo, useContext, useEffect, useRef } from 'react';
import { fs, dialog } from '@tauri-apps/api';
import './index.css';
import { HomeContext } from '../../pages/Home/model';
import classNames from 'classnames';

export interface IFileBarProps {
  dataSource: any[];
  [key: string]: any;
}

const FileBar: any = forwardRef<any, IFileBarProps>((props, ref) => {
  const { dataSource, ...next } = props;
  const [state, funs]: any = useContext(HomeContext);

  const renderFolder = (path: any) => {
    const dataSource = (state.fileMaps[path] ?? []).sort();
    return dataSource.map((ds: any) => {
      if (!ds.children) {
        return (
          <div
            className="file"
            onClick={() => {
              funs.readTextFile(ds.path);
            }}
          >
            {ds.name}
          </div>
        );
      }
      return (
        <div className="folder">
          <div
            className={classNames('folder_header', {
              folder_header_active: ds.path === state.currentFolder,
            })}
            onClick={() => {
              funs.getChildrenByPath(ds.path);
            }}
          >
            <div className="name">{ds.name}</div>
          </div>
          {state.currentOpenFolder.has(ds.path) && (
            <div>{renderFolder(ds.path)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="file_bar" ref={ref} {...next}>
      <div className="file_bar_header">
        <div>资源管理</div>
      </div>
      <div className="file_content">{renderFolder(state.baseFolder)}</div>
    </div>
  );
});

export default FileBar;
