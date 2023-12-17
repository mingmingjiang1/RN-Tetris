import React from 'react';
import propTypes from 'prop-types';
import { i18n, lan } from '../../unit/const';
import {StyleSheet, Text, View, Button, Image, ImageBackground} from 'react-native';

const logos = {
    ['r1']: require('./logo_0.png'),
    ['r2']: require('./logo_1.png'),
    ['r3']: require('./logo_2.png'),
    ['r4']: require('./logo_3.png'),
    ['l1']: require('./logo_0.png'),
    ['l2']: require('./logo_1.png'),
    ['l3']: require('./logo_2.png'),
    ['l4']: require('./logo_3.png'),
};

export default class Logo extends React.Component {
  constructor() {
    super();
    this.state = {
      style: 'r1',
      display: 'none',
    };
  }
  componentDidMount() {
    this.animate(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if ( // 只有在游戏进入开始, 或结束时 触发改变
      (
        [this.props.cur, nextProps.cur].indexOf(false) !== -1 &&
        (this.props.cur !== nextProps.cur)
      ) ||
      (this.props.reset !== nextProps.reset)
    ) {
      this.animate(nextProps);
    }
  }
  shouldComponentUpdate({ cur, reset }) {
    return cur !== this.props.cur || reset !== this.props.reset || !cur;
  }
  animate({ cur, reset }) {
    clearTimeout(Logo.timeout);
    this.setState({
      style: 'r1',
      display: 'none',
    });
    if (cur || reset) {
      this.setState({ display: 'none' });
      return;
    }

    let m = 'r'; // 方向
    let count = 0;

    const set = (func, delay) => {
      if (!func) {
        return;
      }
      Logo.timeout = setTimeout(func, delay);
    };

    const show = (func) => { // 显示
      set(() => {
        this.setState({
          display: 'block',
        });
        if (func) {
          func();
        }
      }, 150);
    };

    const hide = (func) => { // 隐藏
      set(() => {
        this.setState({
          display: 'none',
        });
        if (func) {
          func();
        }
      }, 150);
    };

    const eyes = (func, delay1, delay2) => { // 龙在眨眼睛
      set(() => {
        this.setState({ style: m + 2 });
        set(() => {
          this.setState({ style: m + 1 });
          if (func) {
            func();
          }
        }, delay2);
      }, delay1);
    };

    const run = (func) => { // 开始跑步啦！
      set(() => {
        this.setState({ style: m + 4 });
        set(() => {
          this.setState({ style: m + 3 });
          count++;
          if (count === 10 || count === 20 || count === 30) {
            m = m === 'r' ? 'l' : 'r';
          }
          if (count < 40) {
            run(func);
            return;
          }
          this.setState({ style: m + 1 });
          if (func) {
            set(func, 4000);
          }
        }, 100);
      }, 100);
    };

    const dra = () => {
      count = 0;
      eyes(() => {
        eyes(() => {
          eyes(() => {
            this.setState({ style: m + 2 });
            run(dra);
          }, 150, 150);
        }, 150, 150);
      }, 1000, 1500);
    };

    show(() => { // 忽隐忽现
      hide(() => {
        show(() => {
          hide(() => {
            show(() => {
              dra(); // 开始运动
            });
          });
        });
      });
    });
  }
  render() {
    if (this.props.cur) {
      return null;
    }

    return (
      <View style={{ display: this.state.display,  }}>
        <View style={ { position: 'absolute', top: 120, left: 120, zIndex: 1 }}>
            <Text>俄罗斯方块</Text>

                        <ImageBackground source={ logos[this.state.style] } style={[{ backgroundColor: 'transparent', overflow: 'hidden',
                            height: 50, width: 50 }, { transform: this.state?.style?.startsWith?.('l') ? [{scaleX: -1 }] : [{scaleX: 1 }], }]} resizeMode="contain">
                        <View style={{ width: 50, height: 50 }}></View>
                        </ImageBackground>

        </View>
      </View>
    );
  }
}

Logo.propTypes = {
  cur: propTypes.bool,
  reset: propTypes.bool.isRequired,
};
Logo.statics = {
  timeout: null,
};

const styles = StyleSheet.create({
  r1: {
  },
  r2: {
  },
  r3: {
  },
  r4: {
  },
  l1: {
  },
  l2: {
  },
  l3: {
  },
  l4: {
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
