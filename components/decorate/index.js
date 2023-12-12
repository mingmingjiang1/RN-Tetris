import React from 'react';

import { i18n, lan } from '../../unit/const';
import {StyleSheet, Text, View, Button, TouchableHighlight} from 'react-native';

export default class Decorate extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <View className={styles.decorate}>
        <View className={styles.topBorder}>
          <View  style={{ width: 40 }} />
          <View />
          <View />
          <View />
          <View />
          <View style={{ width: 40 }} />
          <View />
          <View />
          <View />
          <View />
          <Text style={{ position: 'relative', left: 120, fontSize: 26 }} >俄罗斯方块</Text>
                  <View style={styles.view}>
                    <View style={styles.em} />
                    <View style={styles.b} />
                    <View style={styles.b} />
                    <View style={{ clear: 'both' }} />
                    <View style={styles.b} />
                    <View style={styles.b} />
                    <View style={{ clear: 'both' }}/>
                    <View style={styles.b} />
                    <View />
                  </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  decorate: {
//    position: 'relative',
  },
  view: {
    position: 'absolute',
    height: 100,
    left: 0,
//    right: -70,
//    top: 20,
//    width: 44,
  },
  topBorder: {
    position: 'absolute',
    height: 10,
//    width:100%;
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
  span: {
        display: 'block',
        width:10,
        height:10,
        overflow: 'hidden',
        backgroundColor: '#000',
  },
    em: {
        borderStyle: 'solid',
        width: 10,
        height: 10,
  //      flex: 1/10,
        marginRight: 2,
        marginTop: 2,
        padding: 2,
        borderWidth: 1,
    },
  b: {
      borderStyle: 'solid',
      width: 10,
      height: 10,
//      flex: 1/10,
      marginRight: 2,
      marginTop: 2,
      padding: 2,
      borderWidth: 1,
      backgroundColor: 'red',
  }
});
