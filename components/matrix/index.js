import React from 'react';
import immutable, { List, is } from 'immutable';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import { isClear } from '../../unit/';
import { fillLine, blankLine } from '../../unit/const';
import states from '../../control/states';

class Matrix extends React.Component {
  constructor() {
    super();
    this.state = {
      clearLines: false,
      animateColor: 2,
      isOver: false,
      overState: null,
    };
  }
  componentWillReceiveProps(nextProps = {}) {
    const clears = isClear(nextProps.matrix);
    const overs = nextProps.reset;
    this.setState({
      clearLines: clears,
      isOver: overs,
    });

    console.log(8888882, clears, this.state.clearLines)
    if (clears && !this.state.clearLines) {
      this.clearAnimate(clears);
    }
    if (!clears && overs && !this.state.isOver) {
      this.over(nextProps);
    }
  }
  shouldComponentUpdate(nextProps = {}) { // 使用Immutable 比较两个List 是否相等
    const props = this.props;
    return !(
      is(nextProps.matrix, props.matrix) &&
      is(
        (nextProps.cur && nextProps.cur.shape),
        (props.cur && props.cur.shape)
      ) &&
      is(
        (nextProps.cur && nextProps.cur.xy),
        (props.cur && props.cur.xy)
      )
    ) || this.state.clearLines
    || this.state.isOver;
  }
  getResult(props = this.props) {
    const cur = props.cur;
    const shape = cur && cur.shape;
    const xy = cur && cur.xy;

    console.log(99999, xy, cur, shape);

    let matrix = props.matrix;
    const clearLines = this.state.clearLines;
    if (clearLines) {
      const animateColor = this.state.animateColor;
      clearLines.forEach((index) => {
        matrix = matrix.set(index, List([
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
        ]));
      });
    } else if (shape) {
      shape.forEach((m, k1) => (
        m.forEach((n, k2) => {
          if (n && xy.get(0) + k1 >= 0) { // 竖坐标可以为负
            let line = matrix.get(xy.get(0) + k1);
            let color;
            if (line.get(xy.get(1) + k2) === 1 && !clearLines) { // 矩阵与方块重合
              color = 2;
            } else {
              color = 1;
            }
            line = line.set(xy.get(1) + k2, color);
            matrix = matrix.set(xy.get(0) + k1, line);
          }
        })
      ));
    }
    console.log(matrix, 1234)
    return matrix;
  }
  clearAnimate() {
    const anima = (callback) => {
      setTimeout(() => {
        this.setState({
          animateColor: 0,
        });
        setTimeout(() => {
          this.setState({
            animateColor: 2,
          });
          if (typeof callback === 'function') {
            callback();
          }
        }, 100);
      }, 100);
    };
    anima(() => {
      anima(() => {
        anima(() => {
          setTimeout(() => {
            states.clearLines(this.props.matrix, this.state.clearLines);
          }, 100);
        });
      });
    });
  }

  over(nextProps) {
    let overState = this.getResult(nextProps);
    this.setState({
      overState,
    });

    const exLine = (index) => {
      if (index <= 19) {
        overState = overState.set(19 - index, List(fillLine));
      } else if (index >= 20 && index <= 39) {
        overState = overState.set(index - 20, List(blankLine));
      } else {
        states.overEnd();
        return;
      }
      this.setState({
        overState,
      });
    };

    for (let i = 0; i <= 40; i++) {
      setTimeout(exLine.bind(null, i), 40 * (i + 1));
    }
  }


  render() {
    let matrix;
    if (this.state.isOver) {
      matrix = this.state.overState;
    } else {
      matrix = this.getResult();
    }
    return (
      <View style={styles.matrix}>{
          matrix?.map((p, k1) => (<View style={styles.p} key={k1}>
            {
              p?.map((e, k2) => <View

//                className={classnames({
//                  c: true,
//                  d: e === 2,
//                })}
                style={e === 0 ? styles.b : (e === 1 ? styles.c : styles.d)}
                key={k2}
              ><View style={{ backgroundColor: e === 0 ? '#879372' : (e === 1 ? '#000' : styles.d), height: 10, width: 10 }} /></View>)
            }
          </View>))
      }
      </View>
    );
  }
}

var styles = StyleSheet.create({
  matrix: {
//      flex: 1,
      width: 180,
      flexDirection: 'column',
//      backgroundColor: 'yellow',
  },
  b: {
//    backgroundColor: 'red',
    borderStyle: 'solid',
    borderColor: '#879372',
    alignItems: 'center',
    justifyContent: 'center',
//    width: 20,
//    height: 20,
    flex: 1/10,
    marginRight: 2,
    marginTop: 2,
    borderWidth: 1,
//    padding: 20,
  },
  p: {
    flexDirection: 'row',
    flex: 1/20,
    height: 20
  },

  c: {
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    flex: 1/10,
    marginRight: 2,
    marginTop: 2,
    borderWidth: 1,
  },
  d: {
      alignItems: 'center',
      justifyContent: 'center',
    borderColor: '#560000',
//    backgroundColor: '#560000',
        flex: 1/10,
        marginRight: 2,
        marginTop: 2,
        borderWidth: 1
  }
});

Matrix.propTypes = {
  matrix: propTypes.object.isRequired,
  cur: propTypes.object,
  reset: propTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  matrix: state.matrix,
  cur: state.cur,
  reset: state.reset,
});

export default connect(mapStateToProps)(Matrix);