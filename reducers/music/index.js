import * as reducerType from '../../unit/reducerType';
import { lastRecord } from '../../unit/last-record';


let initState = () => {
  const tmp = lastRecord();
  tmp && tmp.music !== undefined ? !!tmp.music : true;
}
const music = (state = false, action) => {
  switch (action.type) {
    case reducerType.MUSIC:
      return action.data;
    default:
      return state || initState();
  }
};

export default music;
