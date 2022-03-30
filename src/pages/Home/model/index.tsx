// Home/model/index.ts
import React, { createContext, useEffect, useReducer } from 'react';
import { fs } from '@tauri-apps/api';

type IHomeAction = {
  [key: string]: any;
};

type THomeOutFn = {
  changeFileTree?: (...args: any[]) => void;
  getChildrenByPath?: (...args: any[]) => void;
  readTextFile?: (...args: any[]) => void;
};

type TDirItem = {
  children?: TDirItem[];
  name: string;
  path: string;
};

const HomeInitialSate = {
  baseFolder: '/Users/shijinhua/Documents/workspace/yx/wechat-zhike',
  currentOpenFolder: new Set(),
  currentFolder: '',
  activeFile: '',
  fileTree: [],
  fileMaps: {},
  fileTextMaps: {},
};

type IHomeState = typeof HomeInitialSate;

function isFolder(item: TDirItem) {
  return !!item.children;
}

function sortDirItems(items: TDirItem[]) {
  let _folders = [];
  let _files = [];

  for (const item of items) {
    if (isFolder(item)) {
      _folders.push(item);
    } else {
      _files.push(item);
    }
  }

  let folders = _folders.sort(
    (pre: any, next: any) => pre.name.charCodeAt(0) - next.name.charCodeAt(0)
  );
  let files = _files.sort(
    (pre: any, next: any) => pre.name.charCodeAt(0) - next.name.charCodeAt(0)
  );

  return [...folders, ...files];
}

export const useHomeState = (): [IHomeState, THomeOutFn] => {
  const [state, dispatch] = useReducer(
    (ostate: IHomeState, action: IHomeAction) => {
      return { ...ostate, ...action };
    },
    {
      ...HomeInitialSate,
    }
  );

  const changeFileTree = (lists: any[] = []) => {
    dispatch({ fileTree: lists });
  };

  const getChildrenByPath = (path: string) => {
    const { currentOpenFolder } = state;
    if (currentOpenFolder.has(path)) {
      currentOpenFolder.delete(path);
      dispatch({
        currentOpenFolder,
        currentFolder: path,
      });
    } else {
      fs.readDir(path).then((files: any[]) => {
        currentOpenFolder.add(path);
        dispatch({
          currentOpenFolder,
          currentFolder: path,
          fileMaps: {
            ...state.fileMaps,
            [path]: sortDirItems(files),
          },
        });
      });
    }
  };

  const readTextFile = (path: string) => {
    fs.readTextFile(path).then((doc: string) => {
      dispatch({
        fileTextMaps: {
          ...state.fileTextMaps,
          [path]: doc,
        },
        activeFile: path,
      });
    });
  };

  useEffect(() => {
    getChildrenByPath(state.baseFolder);
  }, []);

  return [
    { ...state },
    {
      changeFileTree,
      getChildrenByPath,
      readTextFile,
    },
  ];
};

export const HomeContext = createContext<[IHomeState, THomeOutFn]>([
  HomeInitialSate,
  {},
]);
