// Common/model/index.ts
import React, { createContext, useEffect, useReducer } from 'react';

type ICommonAction = {
  [key: string]: any;
};

type TCommonOutFn = {};

const CommonInitialSate = {};

type ICommonState = typeof CommonInitialSate;

export const useCommonState = (): [ICommonState, TCommonOutFn] => {
  const [state, dispatch] = useReducer(
    (ostate: ICommonState, action: ICommonAction) => {
      return { ...ostate, ...action };
    },
    {
      ...CommonInitialSate,
    }
  );

  return [{ ...state }, {}];
};

export const CommonContext = createContext<[ICommonState, TCommonOutFn]>([
  CommonInitialSate,
  {},
]);
