declare module 'redux-simplux' {
  /*
    S = State
   */
   declare type Action = string | {type: string};

   declare type Store<S: Object> = {
     getState: () => S,
     setState: (statePart: $Shape<S>, action: ?Action) => void,
     reduxStore: any
   }

   declare function createStore<S>(initialState: S, reduxEnhancer?: any): Store<S>;
}
