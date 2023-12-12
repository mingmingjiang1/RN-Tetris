import { List } from 'immutable';
import { Storage } from '../util/fit'
// import AsyncStorage from '@react-native-async-storage/async-storage';
//import i18n from '../../i18n.json';

const i18n = {
               "lan": ["cn", "en", "fr", "fa"],
               "default": "cn",
               "data": {
                 "title": {
                   "cn": "俄罗斯方块",
                   "en": "T E T R I S",
                   "fr": "T E T R I S",
                   "fa": "خانه سازی"
                 },
                 "github": {
                   "cn": "GitHub",
                   "en": "GitHub",
                   "fr": "GitHub",
                   "fa": "گیت‌هاب"
                 },
                 "linkTitle": {
                   "cn": "查看源代码",
                   "en": "View data source",
                   "fr": "Afficher la source des données",
                   "fa": "مشاهده سورس پروژه"
                 },
                 "QRCode":{
                   "cn": "二维码",
                   "en": "QR code",
                   "fr": "QR code",
                   "fa": "کیوآر کد"
                 },
                 "titleCenter": {
                   "cn": "俄罗斯方块<br />TETRIS",
                   "en": "TETRIS",
                   "fr": "TETRIS",
                   "fa": "خانه سازی"
                 },
                 "point": {
                   "cn": "得分",
                   "en": "Point",
                   "fr": "Score",
                   "fa": "امتیاز"
                 },
                 "highestScore": {
                   "cn": "最高分",
                   "en": "Max",
                   "fr": "Max",
                   "fa": "حداکثر"
                 },
                 "lastRound": {
                   "cn": "上轮得分",
                   "en": "Last Round",
                   "fr": "Dernier Tour",
                   "fa": "آخرین دور"
                 },
                 "cleans": {
                   "cn": "消除行",
                   "en": "Cleans",
                   "fr": "Lignes",
                   "fa": "پاک کرد"
                 },
                 "level": {
                   "cn": "级别",
                   "en": "Level",
                   "fr": "Difficulté",
                   "fa": "سطح"
                 },
                 "startLine": {
                   "cn": "起始行",
                   "en": "Start Line",
                   "fr": "Ligne Départ",
                   "fa": "خط شروع"
                 },
                 "next": {
                   "cn": "下一个",
                   "en": "Next",
                   "fr": "Prochain",
                   "fa": "بعدی"
                 },
                 "pause": {
                   "cn": "暂停",
                   "en": "Pause",
                   "fr": "Pause",
                   "fa": "مکث"
                 },
                 "sound": {
                   "cn": "音效",
                   "en": "Sound",
                   "fr": "Sonore",
                   "fa": "صدا"
                 },
                 "reset": {
                   "cn": "重玩",
                   "en": "Reset",
                   "fr": "Réinitialiser",
                   "fa": "ریست"
                 },
                 "rotation": {
                   "cn": "旋转",
                   "en": "Rotation",
                   "fr": "Rotation",
                   "fa": "چرخش"
                 },
                 "left": {
                   "cn": "左移",
                   "en": "Left",
                   "fr": "Gauche",
                   "fa": "چپ"
                 },
                 "right": {
                   "cn": "右移",
                   "en": "Right",
                   "fr": "Droite",
                   "fa": "راست"
                 },
                 "down": {
                   "cn": "下移",
                   "en": "Down",
                   "fr": "Bas",
                   "fa": "پایین"
                 },
                 "drop": {
                   "cn": "掉落",
                   "en": "Drop",
                   "fr": "Tomber",
                   "fa": "سقوط"
                 }
               }
             };


const blockShape = {
  I: [
    [1, 1, 1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
};

const origin = {
  I: [[-1, 1], [1, -1]],
  L: [[0, 0]],
  J: [[0, 0]],
  Z: [[0, 0]],
  S: [[0, 0]],
  O: [[0, 0]],
  T: [[0, 0], [1, 0], [-1, 1], [0, -1]],
};

const blockType = Object.keys(blockShape);

const speeds = [800, 650, 500, 370, 250, 160];

const delays = [50, 60, 70, 80, 90, 100];

const fillLine = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const blankLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const blankMatrix = (() => {
  const matrix = [];
  for (let i = 0; i < 20; i++) {
    matrix.push(List(blankLine));
  }
  return List(matrix);
})();

const clearPoints = [100, 300, 700, 1500];

const StorageKey = 'REACT_TETRIS';

const maxPoint = 999999;

const transform = (function () {
  const trans = ['transform', 'webkitTransform', 'msTransform', 'mozTransform', 'oTransform'];
//  const body = document.body;
//  return trans.filter((e) => body.style[e] !== undefined)[0];
}());

const eachLines = 20; // 每消除eachLines行, 增加速度

const getParam = (param) => { // 获取浏览器参数
  const r = new RegExp(`\\?(?:.+&)?${param}=(.*?)(?:&.*)?$`);
  const m = window.location.toString().match(r);
  return m ? decodeURI(m[1]) : '';
};

//const lan = (() => {
//  let l = getParam('lan').toLowerCase();
//  l = i18n.lan.indexOf(l) === -1 ? i18n.default : l;
//  return l;
//})();


module.exports = {
  blockShape,
  origin,
  blockType,
  speeds,
  delays,
  fillLine,
  blankLine,
  blankMatrix,
  clearPoints,
  StorageKey,
  maxPoint,
  eachLines,
  transform,
  lan: 'cn',
  i18n: i18n.data,
};
