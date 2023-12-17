import * as reducerType from '../../unit/reducerType';
import { lastRecord } from '../../unit/last-record';

const initState = () => {
  const tmp = lastRecord();
  return tmp && tmp.pause !== undefined ? !!tmp.pause : false;
}
const pause = (state = false, action) => {
  switch (action.type) {
    case reducerType.PAUSE:
      return action.data;
    default:
      return state || initState();
  }
};

export default pause;
