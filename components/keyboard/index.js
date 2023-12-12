import React from 'react';
import Immutable from 'immutable';
import propTypes from 'prop-types';

import store from '../../store';
import todo from '../../control/todo';
import {StyleSheet, Text, View, Button, TouchableHighlight, TouchableOpacity} from 'react-native';

export default class Keyboard extends React.Component {
  componentDidMount() {
    const touchEventCatch = {};

    const mouseDownEventCatch = {};
  }
//  shouldComponentUpdate({ keyboard, filling }) {
//    return !Immutable.is(keyboard, this.props.keyboard) || filling !== this.props.filling;
//  }

    onPress() {
        console.log(9999);
    }

    onPressIn() {
        console.log('in');
//        touchEventCatch['up'] = true;
        todo['down'].down(store);
    }

    onPressOut() {
        console.log('out');
        todo['down'].up(store);
    }

        onPressInSpace() {
            console.log('in');
    //        touchEventCatch['up'] = true;
            todo['space'].down(store);
        }

        onPressOutSpace() {
            console.log('out');
            todo['space'].up(store);
        }

                onPressInLeft() {
                    console.log('left in');
                    todo['left'].down(store);
                }

                onPressOutLeft() {
                    console.log('left out');
                    todo['left'].up(store);
                }

                         onPressInRight() {
                             console.log('left in');
                             todo['right'].down(store);
                         }

                         onPressOutRight() {
                             console.log('left out');
                             todo['right'].up(store);
                         }

                onPressInDown() {
                    console.log('left in');
                    todo['down'].down(store);
                }

                onPressOutDown() {
                    console.log('left out');
                    todo['down'].up(store);
                }

                onPressInRotate() {
                    console.log('left in');
                    todo['rotate'].down(store);
                }

                onPressOutRotate() {
                    console.log('left out');
                    todo['rotate'].up(store);
                }

                 onPressPause() {
                    todo['p'].down(store);
                 }
    onPressReset() {
        todo['r'].down(store);
    }
        onPressMusic() {
            todo['s'].down(store);
        }

  render() {
    const keyboard = this.props.keyboard;
    return (
      <View
        style={styles.keyboard}
      >
        <View style={styles.wrapper1}>
              <View style={{ flexDirection: 'row', marginBottom: 20, justifyContent: 'space-between' }} >
                <TouchableOpacity style={styles.smallBtn} onPress={this.onPressPause} >
                    <Text>暂停</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallBtn} onPress={this.onPressReset} >
                    <Text>重玩</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={this.onPress} onPressIn={this.onPressInSpace}  onPressOut={this.onPressOutSpace} >
                <View style={styles.spaceButton}>
                  <Text>Space</Text>
                </View>
              </TouchableOpacity>
        </View>
       <View style={styles.wrapper}>
                   <TouchableOpacity onPressIn={this.onPressInRotate}  onPressOut={this.onPressOutRotate} >
                     <View style={styles.button}>
                       <Text>旋转</Text>
                     </View>
                   </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                                       <TouchableOpacity onPressIn={this.onPressInLeft}  onPressOut={this.onPressOutLeft} >
                                         <View style={styles.rightbutton}>
                                           <Text>向左</Text>
                                         </View>
                                       </TouchableOpacity>
                                       <TouchableOpacity onPressIn={this.onPressInRight}  onPressOut={this.onPressOutRight} >
                                            <View style={styles.leftbutton}>
                                               <Text>向右</Text>
                                            </View>
                                       </TouchableOpacity>
                    </View>
                   <TouchableOpacity onPressIn={this.onPressInDown}  onPressOut={this.onPressOutDown} >
                    <View style={styles.button}>
                        <Text>加速</Text>
                            </View>
                    </TouchableOpacity>
       </View>
     </View>
    );
  }
}

Keyboard.propTypes = {
  filling: propTypes.number.isRequired,
  keyboard: propTypes.object.isRequired,
};

var styles = StyleSheet.create({
  keyboard: {
        flexDirection: 'row',
  },
  wrapper1: {
    width: 154,
  },
  smallBtn: {
              alignItems: 'center',
              justifyContent: 'center',
        padding: 10,
          height: 60,
          width: 60,
          borderRadius:400,
          backgroundColor:'#5a65f1',
  },
  wrapper: {
    width: 200,
    alignItems: 'center',
  },
  button: {
              alignItems: 'center',
              justifyContent: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
          height: 60,
          width: 60,  //The Width must be the same as the height
          borderRadius:400, //Then Make the Border Radius twice the size of width or Height
          backgroundColor:'#5a65f1',
  },
  rightbutton: {
                alignItems: 'center',
                justifyContent: 'center',
        padding: 10,
            padding: 5,
            height: 60,
            marginRight: 20,
            width: 60,  //The Width must be the same as the height
            borderRadius:400, //Then Make the Border Radius twice the size of width or Height
            backgroundColor:'#5a65f1',
  },
  leftArrow: {
//       marginLeft:5,
//       marginTop:1,
       width:0,
       height:0,
       borderStyle:'solid',
       borderWidth: 20,
       borderTopColor:'#5a65f1',//下箭头颜色
       borderLeftColor:'#111',//右箭头颜色
       borderBottomColor:'#5a65f1',//上箭头颜色
       borderRightColor:'#5a65f1',//左箭头颜色
  },
    leftbutton: {
              alignItems: 'center',
              justifyContent: 'center',
          padding: 10,
              padding: 5,
              height: 60,
              width: 60,  //The Width must be the same as the height
              borderRadius:400, //Then Make the Border Radius twice the size of width or Height
              backgroundColor:'#5a65f1',
              marginLeft: 20,
    },
    spaceButton: {
//        top: 50,
//        left: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 100,
        width: 100,  //The Width must be the same as the height
        borderRadius:400, //Then Make the Border Radius twice the size of width or Height
        backgroundColor:'#5a65f1',
        marginLeft: 20,
    }
});
