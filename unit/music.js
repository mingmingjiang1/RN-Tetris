import Video from 'react-native-video';
import store from '../store';
import React from 'react';
const music = require('./music.mp3');
import { Button, View, TouchableHighlight, Text } from 'react-native';
import Sound from 'react-native-sound';

var whoosh = new Sound(music, Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
  console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

//  // Play the sound with an onEnd callback
  whoosh.play((success) => {
    if (success) {
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
});
