import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';


import Matrix from '../components/matrix';
import Decorate from '../components/decorate';
import Keyboard from '../components/keyboard';
import Point from '../components/point';
import Number from '../components/Number';
import Next from '../components/next';
import Logo from '../components/logo';
//import Guide from '../components/guide';
import { transform, speeds } from '../unit/const';
import { lastRecord } from '../unit/last-record';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import states from '../control/states';


class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      w: Dimensions.get('window').width,
      h: Dimensions.get('window').height,
    };
  }
  componentDidMount() {
  console.log('rrrrr', lastRecord());
    if (lastRecord()) { // 读取记录
      if (lastRecord()?.cur && !lastRecord()?.pause) { // 拿到上一次游戏的状态, 如果在游戏中且没有暂停, 游戏继续
        const speedRun = this.props.speedRun;
        let timeout = speeds[speedRun - 1] / 2; // 继续时, 给予当前下落速度一半的停留时间
        // 停留时间不小于最快速的速度
        timeout = speedRun < speeds[speeds.length - 1] ? speeds[speeds.length - 1] : speedRun;
        states.auto(timeout);
      }
      if (!lastRecord.cur) {
        states.overStart();
      }
    } else {
      states.overStart();
    }
  }


  render() {
    let filling = 0;
    const size = (() => {
      const w = this.state.w;
      const h = this.state.h;
      const ratio = h / w;
      let scale;
      let css = {};
      if (ratio < 1.5) {
        scale = h / 960;
      } else {
        scale = w / 400;
        filling = (h - (960 * scale)) / scale / 3;
        css = {
//          paddingTop: Math.floor(filling) + 42,
//          paddingBottom: Math.floor(filling),
//          marginTop: Math.floor(-480 - (filling * 1.5)),
        };
      }

      const scale2 = Dimensions.get('window').scale;
      css['transform'] = `scale(1)`;
      return css;
    })();

    console.log(7775555777, this.props.points);

    return (
        <View style={{ backgroundColor: '#009688', flex: 1, justifyContent: 'space-evenly', borderStyle: 'solid', width: '100%', ...size }} >
            <Decorate />
            <View>
                <Logo cur={!!this.props.cur} reset={this.props.reset} />
                <View  style={{ alignItems: 'center', width: 400, height: 300 }}>
                            <View style={{flexDirection: 'row', flex: 1, backgroundColor: '#9ead86'}}>
                                        <Matrix
                                            matrix={this.props.matrix}
                                            cur={this.props.cur}
                                            reset={this.props.reset}
                                         />
                                         <View style={{ width: 90}}>
                                            <Point cur={!!this.props.cur} point={this.props.points} max={this.props.max} />
                                            <View><Text>{ this.props.cur ? '消除行' : '起始行' }</Text></View>
                                            <Number number={this.props.cur ? this.props.clearLines : this.props.startLines} />
                                                            <View><Text>级别</Text></View>
                                                            <Number
                                                              number={this.props.cur ? this.props.speedRun : this.props.speedStart}
                                                              length={1}
                                                            />
                                                            <View><Text>下一个</Text></View>
                                                            <Next data={this.props.next} />
                                         </View>
                            </View>
                </View>
            </View>
            <Keyboard filling={filling} keyboard={this.props.keyboard} />
        </View>
    );
  }
}

Index.propTypes = {
  pause: propTypes.bool.isRequired,
  matrix: propTypes.object.isRequired,
  reset: propTypes.bool.isRequired,
  keyboard: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  pause: state.pause,
  matrix: state.matrix,
  cur: state.cur,
  reset: state.reset,
  keyboard: state.keyboard,
    speedStart: state.speedStart,
    speedRun: state.speedRun,
    startLines: state.startLines,
    clearLines: state.clearLines,
    points: state.points,
    max: state.max,
    reset: state.reset,
    drop: state.drop,
     next: state.next,
});

export default connect(mapStateToProps)(Index);
