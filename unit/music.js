import store from '../store';
import RNSound from '../util/rnsound';


console.log(848488484848999999999999999 , '--------------------------------=========>')

export const music = {};


export const initMusic = () => {
  RNSound.addSoundOffset('my_music', 8).then(res => {
    console.log('添加音乐成功', res);
    music.start = () => RNSound.play('my_music').then(res => {
      console.log('播放音乐成功', music)
    }).catch(e => console.log('播放音乐失败', e));
    music.move = () => RNSound.play('my_music').then(res => {
      console.log('播放音乐成功', music)
    }).catch(e => console.log('播放音乐失败', e));
    console.log('添加音乐成功-----', music);
  }).catch(e => console.log('添加音乐失败', e));
};



