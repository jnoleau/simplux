# Simplux

Simplux is a simple state container with no indirection, no magic. It is built with [Redux](https://github.com/reactjs/redux) so you can reuse all the middlewares / all the tools you are used to.

![simplux](https://cloud.githubusercontent.com/assets/1775047/22173939/225879b8-dfd1-11e6-8ffb-783020543590.png)

**Before proceeding further**, you should read this article to understand what this lib is solving.

## Usage

`npm install --save simplux`

To understand, nothing better than a classical example : the counter

```js
import { createStore } from simplux;

const initialState = { counter: 0 };
const store = createStore(initialState);

function increment() {
  const current = store.getState().counter;
  this.setState({counter: current + 1});
}
function decrement() {
  const current = store.getState().counter;
  // you can choose the name of the final action dispatched by redux
  this.setState({counter: current + 1}, 'DECREMENT'); 
}

// ... 

increment(); // { counter: 1 }
increment(); // { counter: 2 }
decrement(); // { counter: 1 }
``` 

With React, use need to add `npm install --save react-redux`

```js
import {increment, decrement} from './actions'; // functions described above
import store from './store'; // store created by createStore
import {Provider, connect} from 'react-redux';

// this component is just a dumb stateless generical counter for rendering
const CounterDumb = (props) => (
  <div>
    <button onClick={props.onClickMinus}> - </button>
    {props.value}
    <button onClick={props.onClickPlus}> + </button>
  </div>
);

// This component is stateless too but know the controller, it knows "increment" & "decrement". 
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
* it is not necessary, it is juste an example.
*  const Counter = (props) => (
*   <div>
*     <button onClick={decrement}> - </button>
*     {props.value}
*     <button onClick={increment}> + </button>
*   </div>
* ); is fine !!
* 
*/

const CounterContainer = connect(
  (state) => ({value: state.counter}), // mapsStateToProps
)(CounterDumb);

render(
  <Provider store={store.reduxStore}>
    <CounterContainer />
  </Provider>,
  document.getElementById('root')
);
```

