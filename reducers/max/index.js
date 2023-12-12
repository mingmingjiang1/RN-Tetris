import * as reducerType from '../../unit/reducerType';
import { maxPoint } from '../../unit/const';
import { lastRecord } from '../../unit/last-record';


let initState = () => { 
  const tmp = lastRecord();
  const ans = tmp && !isNaN(parseInt(tmp?.max, 10)) ?
  parseInt(tmp.max, 10) : 0;

  if (ans < 0) {
    ans = 0;
  } else if (ans > maxPoint) {
    ans = maxPoint;
  }
  return ans;
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
