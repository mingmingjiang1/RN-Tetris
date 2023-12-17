import { blockType, StorageKey } from './const';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { Storage } from '../util/fit';



export function getNextType() { // 随机获取下一个方块类型
    const len = blockType.length;
    return blockType[Math.floor(Math.random() * len)];
  };
export function  want(next, matrix) { // 方块是否能移到到指定位置
    const xy = next.xy;
    const shape = next.shape;
    const horizontal = shape.get(0).size;
    return shape.every((m, k1) => (
      m.every((n, k2) => {
        if (xy[1] < 0) { // left
          return false;
        }
        if (xy[1] + horizontal > 10) { // right
          return false;
        }
        if (xy[0] + k1 < 0) { // top
          return true;
        }
        if (xy[0] + k1 >= 20) { // bottom
          return false;
        }
        if (n) {
          if (matrix.get(xy[0] + k1).get(xy[1] + k2)) {
            return false;
          }
          return true;
        }
        return true;
      })
    ));
  };
  export function  isClear(matrix) { // 是否达到消除状态
    const clearLines = [];
    matrix.forEach((m, k) => {
      if (m.every(n => !!n)) {
        clearLines.push(k);
      }
    });
    if (clearLines.length === 0) {
      return false;
    }
    return clearLines;
  };
  export function  isOver(matrix) { // 游戏是否结束, 第一行落下方块为依据
    return matrix.get(0).some(n => !!n);
  };
  export function  subscribeRecord(store) { // 将状态记录到 localStorage
    store.subscribe(() => {
      let data = store.getState();
      if (data.lock) { // 当状态为锁定, 不记录
        return;
      }
      console.log('storage-----------------------------------: ', JSON.stringify(data.matrix));
      data = JSON.stringify(data);
      data = encodeURIComponent(data);

        try {
        Storage.setItem(
            StorageKey,
            data
          );
        } catch (error) {
          // Error saving data
          console.log('error3444: ', error);
        }
//      localStorage.setItem(StorageKey, data);
    });
  };
  export function  isMobile() { // 判断是否为移动端
    const ua = navigator.userAgent;
    const android = /Android (\d+\.\d+)/.test(ua);
    const iphone = ua.indexOf('iPhone') > -1;
    const ipod = ua.indexOf('iPod') > -1;
    const ipad = ua.indexOf('iPad') > -1;
    const nokiaN = ua.indexOf('NokiaN') > -1;
    return android || iphone || ipod || ipad || nokiaN;
  };

