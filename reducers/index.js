//import { combineReducers } from 'redux-immutable';
import {combineReducers, createStore} from "redux";
import matrix from './matrix';
import cur from './cur';
import reset from './reset';
import keyboard from './keyboard';
import pause from './pause';
import startLines from './startLines';
import points from './points';
import speedStart from './speedStart';
import speedRun from './speedRun';
import next from './next';
import clearLines from './clearLines';
import lock from './lock';
import drop from './drop';
import max from './max';

const rootReducer = combineReducers({
matrix,
cur,
reset,
keyboard,
pause,
speedStart,
points,
speedRun,
startLines,
next,
lock,
clearLines,
drop,
max,
});

export default rootReducer;
