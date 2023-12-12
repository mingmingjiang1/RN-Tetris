//import { List } from 'immutable';
import * as reducerType from '../../unit/reducerType';
import { lastRecord } from '../../unit/last-record';
import Block from '../../unit/block';

const initState = () => {
  const tmp = lastRecord();
  if (!tmp || !tmp.cur) { // 无记录 或 有记录 但方块为空, 返回 null
    return null;
  }

  const cur = tmp.cur;
  const option = {
    type: cur.type,
    rotateIndex: cur.rotateIndex,
    shape: List(cur.shape.map(e => List(e))),
    xy: cur.xy,
  };
  return new Block(option);
};

const cur = (state = null, action) => {
  const res = initState();
  switch (action.type) {
    case reducerType.MOVE_BLOCK:
      return action.data;
    default:
      return res || state;
  }
};

export default cur;
