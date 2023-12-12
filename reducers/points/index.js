import * as reducerType from '../../unit/reducerType';
import { lastRecord } from '../../unit/last-record';
import { maxPoint } from '../../unit/const';

const initState = () => {
  const tmp = lastRecord();
  const ans = tmp && !isNaN(parseInt(tmp?.points, 10)) ?
  parseInt(tmp.points, 10) : 0;

  if (ans < 0) {
    ans = 0;
  } else if (ans > maxPoint) {
    ans = maxPoint;
  }
  return ans;
}

const points = (state = 0, action) => {

  switch (action.type) {
    case reducerType.POINTS:
      return action.data > maxPoint ? maxPoint : action.data; // 最大分数
    default:
      return state || initState();
  }
};

export default points;
