import { want } from '../../unit/';
import event from '../../unit/event';
import actions from '../../actions';
import states from '../states';
import { music } from '../../unit/music';

const down = (store) => {
  store.dispatch(actions.keyboard.rotate(true));
  if (store.getState().cur !== null) {
    event.down({
      key: 'rotate',
      once: true,
      callback: () => {
        const state = store.getState();
        if (state?.lock) {
          return;
        }
        if (state.pause) {
          states.pause(false);
        }
        const cur = state.cur;
        if (cur === null) {
          return;
        }
        if (music?.rotate) {
          music?.rotate();
        }
        const next = cur.rotate();
        if (want(next, state.matrix)) {
          store.dispatch(actions.moveBlock(next));
        }
      },
    });
  } else {
    event.down({
      key: 'rotate',
      begin: 200,
      interval: 100,
      callback: () => {
        if (store.getState()?.lock) {
          return;
        }
        if (music?.move) {
          music?.move();
        }
        const state = store.getState();
        const cur = state.cur;
        if (cur) {
          return;
        }
        let startLines = state?.startLines;
        startLines = startLines + 1 > 10 ? 0 : startLines + 1;
        store.dispatch(actions.startLines(startLines));
      },
    });
  }
};

const up = (store) => {
  store.dispatch(actions.keyboard.rotate(false));
  event.up({
    key: 'rotate',
  });
};

export default {
  down,
  up,
};
