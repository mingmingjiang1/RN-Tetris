import * as reducerType from '../../unit/reducerType';
import { maxPoint } from '../../unit/const';
import { lastRecord } from '../../unit/last-record';

let initState = () => {
  let tmp = lastRecord();
  tmp = tmp && !isNaN(parseInt(tmp.max, 10)) ? parseInt(tmp.max, 10) : 0;
  if (tmp < 0) {
    tmp = 0;
  } else if (tmp > maxPoint) {
    tmp = maxPoint;
  }
  return tmp;
}


const parse = (state = 0, action) => {
  switch (action.type) {
    case reducerType.MAX:
      return action.data > 999999 ? 999999 : action.data; // 最大分数
    default:
      return state || initState();
  }
};

export default parse;
