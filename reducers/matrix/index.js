//import { List } from 'immutable';
import * as reducerType from '../../unit/reducerType';
import { blankMatrix } from '../../unit/const';

const initState = blankMatrix;

const matrix = (state = initState, action) => {
  switch (action.type) {
    case reducerType.MATRIX:
      return action.data;
    default:
      return state;
  }
};

export default matrix;
