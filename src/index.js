import {createStore as reduxCreateStore} from 'redux';

export function createStore(initialState, reduxEnhancer = undefined) {
  const getReduxAction = (state, action) => {
    if (typeof action === 'object') return {...action, _newState: state};

    return {type: action, _newState: state};
  };

  const reduxStore = reduxCreateStore(
    (state, action) => (action._newState ? action._newState : state),
    initialState,
    reduxEnhancer
  );

  const getState = reduxStore.getState;

  const setState = (statePart, action = 'SET_STATE') => {
    const newState = {
      ...getState(),
      ...statePart
    };

    reduxStore.dispatch(getReduxAction(newState, action));
  };

  return {
    reduxStore,
    getState,
    setState
  };
}
