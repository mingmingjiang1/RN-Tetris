import React from 'react';
import propTypes from 'prop-types';

import Number from '../Number';
import {StyleSheet, Text, View, Button, TouchableHighlight} from 'react-native';

export default class Point extends React.Component {
  constructor() {
    super();
    this.state = {
      label: '',
      number: 0,
    };
  }
  componentWillMount() {
    this.onChange(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.onChange(nextProps);
  }
  shouldComponentUpdate({ cur, point, max }) {
    const props = this.props;
    return cur !== props.cur || point !== props.point || max !== props.max || !props.cur;
  }
  onChange({ cur, point, max }) {
    clearInterval(Point.timeout);
    if (cur) { // 在游戏进行中
      this.setState({
        label: point >= max ? '最高分' : '得分',
        number: point,
      });
    } else { // 游戏未开始
    console.log(555223455, point, max)
      const toggle = () => { // 最高分与上轮得分交替出现
        this.setState({
          label: '上轮得分',
          number: point,
        });
        Point.timeout = setTimeout(() => {
          this.setState({
            label: '最高分',
            number: max,
          });
          Point.timeout = setTimeout(toggle, 3000);
        }, 3000);
      };

      if (point !== 0) { // 如果为上轮没玩, 也不用提示了
        toggle();
      } else {
        this.setState({
          label: '最高分',
          number: max,
        });
      }
    }
  }

  render() {
  console.log(111111111111111111222, this.state.number)
    return (
      <View>
        <View>
            <Text>{ 'Nih' }: {this.state.number}</Text>
            <Number number={this.state.number} />
        </View>
      </View>
    );
  }
}

Point.statics = {
  timeout: null,
};

Point.propTypes = {
  cur: propTypes.bool,
  max: propTypes.number.isRequired,
  point: propTypes.number.isRequired,
};

