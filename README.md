# Simplux ( redux-simplux )

Simplux is a simple state container with no indirection, no magic. It is built on [Redux](https://github.com/reactjs/redux) so you can reuse all the middlewares / all the tools you are used to.

![simplux](https://cloud.githubusercontent.com/assets/1775047/22173939/225879b8-dfd1-11e6-8ffb-783020543590.png)

**Before proceeding further**, you should read [this article](https://jnoleau.github.io/cocoweet/The-state/) to understand what this lib is solving.

## Usage

(You need redux if you don't have because it's a peer dependency : `npm install --save redux`)

`npm install --save redux-simplux`

To understand, nothing better than a classical example : the counter

```js
import { createStore } from 'redux-simplux';

const initialState = { counter: 0 };
const store = createStore(initialState);

function increment() {
  const current = store.getState().counter;
  store.setState({counter: current + 1});
}
function decrement() {
  const current = store.getState().counter;
  // you can choose the name of the final action dispatched by redux
  store.setState({counter: current - 1}, 'DECREMENT');
}

// ...

increment(); // { counter: 1 }
increment(); // { counter: 2 }
decrement(); // { counter: 1 }
```

To use with React, you need to add `npm install --save react-redux`

```js
import {increment, decrement} from './actions'; // functions described above
import store from './store'; // store created by createStore
import {Provider, connect} from 'react-redux';

// CounterDumb is just a dumb stateless generic counter for rendering
const CounterDumb = (props) => (
  <div>
    <button onClick={props.onClickMinus}> - </button>
    {props.value}
    <button onClick={props.onClickPlus}> + </button>
  </div>
);

// CounterControlled is stateless too but knows the controller, it knows "increment" & "decrement".
// (NB : you can also map this in mapDispatchToProps arg of the connect function)
const CounterControlled = (props) => (
  <CounterDumb
    value={props.value}
    onClickMinus={decrement}
    onClickPlus={increment}
    />
);

/*
* Don't do over-engineering. You don't need to separate CounterDumb and CounterControlled if
* it is not necessary, it is just an example.
*  const Counter = (props) => (
*   <div>
*     <button onClick={decrement}> - </button>
*     {props.value}
*     <button onClick={increment}> + </button>
*   </div>
* ); is fine too !!
*
*/

const CounterContainer = connect(
  (state) => ({value: state.counter}), // mapsStateToProps
)(CounterControlled);

render(
  <Provider store={store.reduxStore}>
    <CounterContainer />
  </Provider>,
  document.getElementById('root')
);
```

## Api

* `createStore(initialState: State, reduxEnhancer = undefined): Store<State>`

Create the store and return it. The first parameter is mandatory and needs to be a plain Object. The second parameter is optional and is used when creating the redux internal store, please refer to the redux documentation if you want more information.

* `getState(): State`

Retrieve the current state

* `setState(newState: $Shape<State>, reduxAction: string | Object = 'SET_STATE'): void`

Set the new current state. To mimic the `React.setState` behavior, the newState parameter could be an object containing only the keys to update (but it's just a simple merge). For example :

```
// suppose your current state is {x: 1, y: 2}

setState({x: 3}); // your state is now {x: 3, y: 2}
```

*Note : The new state is a new Object (new reference) so you can use the lib with immutability pattern.*

The second parameter reduxAction is optional. You can specify the redux action that will be dispatched by the redux internal store. This can be useful if you have defined or want to define specifics behaviors with enhancers (middlewares) or for your tools (Redux Devtools, logging, ..). You can give a string or a plain Object.

* `reduxStore`

The internal redux store
