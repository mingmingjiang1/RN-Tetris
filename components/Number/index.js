import React from 'react';
import propTypes from 'prop-types';
import { StyleSheet, Text, View, Dimensions, Platform, ImageBackground } from 'react-native';

const image = {uri: require('./score.png')};

const imageList = {
    ['n']: require('./score_n.png'),
    ['0']: require('./score_0.png'),
    ['1']: require('./score_1.png'),
//    ['2']: require('./score_2.png'),
//    ['3']: require('./score_3.png'),
};

const render = (data) => (
  <View style={styles.number}>
    {
      data.map((e, k) => {
      console.log(33933, e, imageList[e], data);
      const tmp = `score_${e}.png`;
        return (
                         <ImageBackground source={ imageList[e] } resizeMode="contain" style={styles.image}>
                           <View style={styles.span} key={k} />
                         </ImageBackground>
                     )
      })
    }
  </View>
);

const formate = (num) => (
  num < 10 ? `0${num}`.split('') : `${num}`.split('')
);


export default class Number extends React.Component {
  constructor() {
    super();
    this.state = {
      time_count: false,
      time: new Date(),
    };
  }
  componentWillMount() {
    if (!this.props.time) {
      return;
    }
    const clock = () => {
      const count = +Number.timeInterval;
      Number.timeInterval = setTimeout(() => {
        this.setState({
          time: new Date(),
          time_count: count, // 用来做 shouldComponentUpdate 优化
        });
        clock();
      }, 1000);
    };
    clock();
  }
  shouldComponentUpdate({ number }) {
    if (this.props.time) { // 右下角时钟
      if (this.state.time_count !== Number.time_count) {
        if (this.state.time_count !== false) {
          Number.time_count = this.state.time_count; // 记录clock上一次的缓存
        }
        return true;
      }
      return false; // 经过判断这次的时间已经渲染, 返回false
    }
    return this.props.number !== number;
  }
  componentWillUnmount() {
    if (!this.props.time) {
      return;
    }
    clearTimeout(Number.timeInterval);
  }
  render() {
    if (this.props.time) { // 右下角时钟
      const now = this.state.time;
      const hour = formate(now.getHours());
      const min = formate(now.getMinutes());
      const sec = now.getSeconds() % 2;
      const t = hour.concat(sec ? 'd' : 'd_c', min);
      return (render(t));
    }

    const num = `${this.props.number}`.split('');
    console.log(5555555, num, this.props.length, this.props.length - num.length)
    for (let i = 0, len = this.props.length - num.length; i < len; i++) {
      num.unshift('n');
    }
    console.log(888888, num);
    return (render(num));
  }
}

Number.statics = {
  timeInterval: null,
  time_count: null,
};

Number.propTypes = {
  number: propTypes.number,
  length: propTypes.number,
  time: propTypes.bool,
};

Number.defaultProps = {
  length: 6,
};

var styles = StyleSheet.create({
  number: {
     height: 24,
     fontSize: 14,
     float: 'right',
     flexDirection: 'row',
  },
  span: {
      float: 'left',
      width: 12,
      height: 12,
//      borderColor: 'yellow',
//      borderWidth: 1,
//      backgroundPosition: '0 0',
//      backgroundImage: 'url(https://legacy.reactjs.org/logo-og.png)',
     },
    image: {

    },
});
