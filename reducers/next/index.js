import { getNextType } from '../../unit';
import * as reducerType from '../../unit/reducerType';
import { blockType } from '../../unit/const';
import { lastRecord } from '../../unit/last-record';

const next = getNextType();

const initState = () => {
  const tmp = lastRecord();
  return tmp && blockType.indexOf(tmp.next) !== -1 ?
  tmp.next : next;
}

const parse = (state = null, action) => {
  switch (action.type) {
    case reducerType.NEXT_BLOCK:
      return action.data;
    default:
      return state || initState();
  }
};

export default parse;
