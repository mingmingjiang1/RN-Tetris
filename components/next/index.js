import React from 'react';
import propTypes from 'prop-types';
import { blockShape } from '../../unit/const';
import {StyleSheet, Text, View, Button, TouchableHighlight} from 'react-native';

const xy = { // 方块在下一个中的坐标
  I: [1, 0],
  L: [0, 0],
  J: [0, 0],
  Z: [0, 0],
  S: [0, 0],
  O: [0, 1],
  T: [0, 0],
};

const empty = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

export default class Next extends React.Component {
  constructor() {
    super();
    this.state = {
      block: empty,
    };
  }
  componentWillMount() {
    this.build(this.props.data);
  }
  componentWillReceiveProps(nextProps) {
    this.build(nextProps.data);
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.data !== this.props.data;
  }
  build(type) {
    const shape = blockShape[type];
    console.log(333399999, type, blockShape)
    const block = empty.map(e => ([...e]));
    shape.forEach((m, k1) => {
      m.forEach((n, k2) => {
        if (n) {
          block[k1 + xy[type][0]][k2 + xy[type][1]] = 1;
        }
      });
    });
    this.setState({ block });
  }
  render() {
    return (
      <View className={styles.next}>
        {
          this.state.block.map((arr, k1) => (
            <View style={{ flexDirection: 'row', width: 60, height: 15 }} key={k1}>
              {
                arr.map((e, k2) => (
                  <View
                    style={e === 0 ? styles.b : (e === 1 ? styles.c : styles.d)}
                     key={k2}
                   ><View style={{ backgroundColor: e === 0 ? '#879372' : '#000', height: 9, width: 9 }} />
                  </View>
                ))
              }
            </View>
          ))
        }
      </View>
    );
  }
}

Next.propTypes = {
  data: propTypes.string,
};

const styles = StyleSheet.create({
  next: {
  },
  c: {
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    marginRight: 2,
    marginTop: 2,
    flex: 1/4,
    borderWidth: 1,
//    backgroundColor: '#000',
  },
    b: {
      borderStyle: 'solid',
      borderColor: '#879372',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1/4,
      marginRight: 2,
      marginTop: 2,
      borderWidth: 1,
    },
});
