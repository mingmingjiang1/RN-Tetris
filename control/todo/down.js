import { want } from '../../unit/';
import event from '../../unit/event';
import actions from '../../actions';
import states from '../states';
import { music } from '../../unit/music';

const down = (store) => {
  store.dispatch(actions.keyboard.down(true));
  if (store.getState().cur !== null) {
    event.down({
      key: 'down',
      begin: 40,
      interval: 40,
      callback: (stopDownTrigger) => {
        const state = store.getState();
        if (state?.lock) {
          return;
        }
        if (music?.move) {
          console.log('********************', music)
          music?.move();
        }
        const cur = state.cur;
        if (cur === null) {
          return;
        }
        if (state.pause) {
          states.pause(false);
          return;
        }
        const next = cur.fall();
        if (want(next, state?.matrix, state.matrix)) {
          store.dispatch(actions.moveBlock(next));
          states.auto();
        } else {
          let matrix = state?.matrix;
          const shape = cur.shape;
          const xy = cur.xy;
          shape.forEach((m, k1) => (
            m.forEach((n, k2) => {
              if (n && xy.get(0) + k1 >= 0) { // 竖坐标可以为负
                let line = matrix.get(xy.get(0) + k1);
                console.log('---', line.toJS(), xy.get(0) + k1);
                line = line.set(xy.get(1) + k2, 1);
                matrix = matrix.set(xy.get(0) + k1, line);
                console.log(matrix.toJS());
              }
            })
          ));
          states.nextAround(matrix, stopDownTrigger);
        }
      },
    });
  } else {
    event.down({
      key: 'down',
      begin: 200,
      interval: 100,
      callback: () => {
        if (store.getState()?.lock) {
          return;
        }
        const state = store.getState();
        const cur = state.cur;
        if (cur) {
          return;
        }
        if (music?.move) {
          music?.move();
        }
        let startLines = state?.startLines;
        startLines = startLines - 1 < 0 ? 10 : startLines - 1;
        store.dispatch(actions.startLines(startLines));
      },
    });
  }
};

const up = (store) => {
  store.dispatch(actions.keyboard.down(false));
  event.up({
    key: 'down',
  });
};


export default {
  down,
  up,
};
