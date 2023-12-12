import event from '../../unit/event';
import states from '../states';
import actions from '../../actions';

const down = (store) => {
  store.dispatch(actions.keyboard.reset(true));
  if (store.getState().lock) {
    return;
  }
  if (store.getState().cur !== null) {
    event.down({
      key: 'r',
      once: true,
      callback: () => {
        states.overStart();
      },
    });
  } else {
    event.down({
      key: 'r',
      once: true,
      callback: () => {
        if (store.getState().lock) {
          return;
        }
        states.start();
      },
    });
  }
};

const up = (store) => {
  store.dispatch(actions.keyboard.reset(false));
  event.up({
    key: 'r',
  });
};

export default {
  down,
  up,
};
