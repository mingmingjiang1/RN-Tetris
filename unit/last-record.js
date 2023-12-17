import { Storage } from '../util/fit';

const StorageKey = 'REACT_TETRIS';

export const lastRecord = () => { // 上一把的状态
    let data = '';
    try {

      data = Storage.getItem(StorageKey);
        if (!data) {
          return false;
        }
            data = decodeURIComponent(data);
            data = JSON.parse(data);
            console.log('解析数据 storage =====>', data);
    } catch (error) {
      // Error retrieving data
      console.log('error2222: ', error);
    }
    return data;
  };