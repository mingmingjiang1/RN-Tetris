import * as reducerType from '../../unit/reducerType';
import { lastRecord } from '../../unit/last-record';

const initState = () => {
  const tmp = lastRecord();
  return tmp && tmp.lock !== undefined ? !!tmp.lock : false;
}

const lock = (state = false, action) => {
  switch (action.type) {
    case reducerType.LOCK:
      return action.data;
    default:
      return state || initState();
  }
};

export default lock;
