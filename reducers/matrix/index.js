import { List } from 'immutable';
import * as reducerType from '../../unit/reducerType';
import { blankMatrix } from '../../unit/const';
import { lastRecord } from '../../unit/last-record';


const initState = () => {
  const tmp = lastRecord();
  console.log('matrix reducer ======>', tmp);
  return tmp && Array.isArray(tmp.matrix) ? tmp.matrix.map(e => e) : blankMatrix;
}
console.log('加载matrix文件');
const matrix = (state = blankMatrix, action) => {
  console.log('执行matrix文件', state, initState());
  switch (action.type) {
    case reducerType.MATRIX:
      return action.data;
    default:
      return state;
  }
};

export default matrix;
