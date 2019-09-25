import React from 'react';
import ReactDOM from 'react-dom';
import Parent from './Parent'
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux'
import ReduxTest from './ReduxTest';
import { Provider } from 'react-redux'


const todolistReducer = (state = [], action) => {
    if(action.type === 'ADD_TODO') {
        let NewState = Object.assign([], state)
        NewState.splice(0,0, action.todo)
        return NewState
    } else if(action.type === 'CHANGE_THE_STATUS') {
        let NewState = Object.assign([], state)
        NewState[action.index].status = !NewState[action.index].status
        return NewState
    } else if(action.type === 'UPDATE_TO_NEW') {
        let NewState = Object.assign([], state)
        /* 
            Take the index from the action which you will pass from the component
            then modify to the new values which you will take from the component
            return new state
        */
    }
    return state
}

const store = createStore(combineReducers({
    todolist: todolistReducer
}), composeWithDevTools())


ReactDOM.render(
    <Provider store={store}>
        <Parent />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

