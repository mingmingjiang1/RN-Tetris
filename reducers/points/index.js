import * as reducerType from '../../unit/reducerType';
import { lastRecord } from '../../unit/last-record';
import { maxPoint } from '../../unit/const';

let initState = () => { 
  const ans = lastRecord() && !isNaN(parseInt(lastRecord()?.points, 10)) ?
  parseInt(lastRecord().points, 10) : 0;


  console.log('point ======> ', ans);

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
