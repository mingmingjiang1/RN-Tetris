import * as reducerType from '../../unit/reducerType';
import { lastRecord } from '../../unit/last-record';

const initState = () => {
  let tmp = lastRecord();
  let ans = tmp && !isNaN(parseInt(tmp.clearLines, 10)) ?
  parseInt(tmp.clearLines, 10) : 0;
  if (ans < 0) {
    ans = 0;
  }
  return ans;
}

const clearLines = (state = 0, action) => {
  switch (action.type) {
    case reducerType.CLEAR_LINES:
      return action.data;
    default:
      return state;
  }
};

export default clearLines;
