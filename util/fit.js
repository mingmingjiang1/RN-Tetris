// util.js
import {
     Dimensions,
     PixelRatio
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default  {
    'ScreenWidth':Dimensions.get('window').width,// 屏幕宽度
    'ScreenHeight':Dimensions.get('window').height, // 屏幕高度
    'PixelRatio':PixelRatio.get(), // 屏幕缩放比例
    'ResolutionX':Dimensions.get('window').width* PixelRatio.get(), // X分辨率
    'ResolutionY':Dimensions.get('window').height* PixelRatio.get() // Y分辨率
}

// 设备宽度，单位 dp
const deviceWidthDp = Dimensions.get('window').width;

// 设计稿宽度（这里为640px），单位 px
const uiWidthPx = 640;

// px 转 dp（设计稿中的 px 转 rn 中的 dp）
export const pTd = (uiElePx) => {
  return uiElePx * deviceWidthDp / uiWidthPx;
}

export class Storage {
  static cache = {
  };

  static isInit = false;

  static async init () {
    const keys = await AsyncStorage.getAllKeys(); 
    const items = await AsyncStorage.multiGet(keys, (err, stores) => {
      stores?.map((result, i, store) => {
        Storage.cache[result[0]] = result[1];
        console.log(88888, result, Storage.cache);
      });
    });
    Storage.isInit = true;
  }

  static getItem(key) {
    console.log(8888998878, Storage.cache);
    return Storage.cache[key];
  }

  static setItem(key, data) {
    AsyncStorage.setItem(key, data);
    Storage.cache[key] = data;
  }
} 