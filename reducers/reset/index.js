import * as reducerType from '../../unit/reducerType';
//import { lastRecord } from '../../util/const';
import { lastRecord } from '../../unit/last-record';

const initState = lastRecord;
const reset = (state = initState, action) => {
  switch (action.type) {
    case reducerType.RESET:
      return action.data;
    default:
      return state;
  }
};

export default reset;
