import * as reducerType from '../../unit/reducerType';
import { lastRecord } from '../../unit/last-record';

const initState = () => {
  const tmp = lastRecord();
  return tmp && tmp.drop !== undefined ? !!tmp.drop : false;
}

const drop = (state = false, action) => {
  console.log('执行drop文件');
  switch (action.type) {
    case reducerType.DROP:
      return action.data;
    default:
      return state || initState();
  }
};

export default drop;
