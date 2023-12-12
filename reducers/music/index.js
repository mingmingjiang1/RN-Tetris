import * as reducerType from '../../unit/reducerType';
import { lastRecord } from '../../unit/last-record';


const initState = () => {
  const tmp = lastRecord()
  return tmp && tmp.music !== undefined ? !!tmp.music : true;
}

const music = (state = true, action) => {
  switch (action.type) {
    case reducerType.MUSIC:
      return action.data;
    default:
      return state || initState();
  }
};

export default music;
