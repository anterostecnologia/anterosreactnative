import React, {
    Component
  } from 'react';
  import PropTypes from 'prop-types';
  import {
    ART,
    Text,
    Modal,
    Dimensions,
    View,
    Platform,
    Picker,
    StyleSheet,
    TouchableHighlight,
    ScrollView
  } from 'react-native';

  const {Surface,Group,Shape} = ART;

  import {AnterosText} from '../Text/AnterosText';

  const {width, height, scale} = Dimensions.get('window');
  const Size = {
    itemHeight: 40,
    widthFactor: 0.6,
    heightFactor: 0.4
  };
  
  const Color = {
    maskColor: '#00000077'
  };


  const COLOR = {
    ACTIVE_COLOR: '#fa952f',
    DEFAULT_COLOR: '#eee',
    DISABLE_COLOR: '#aaa',
    FONT_COLOR: '#999',
    UNDERLAY_COLOR: 'rgba(249, 246, 241, 0.31)'
  };
  
  const MODE = {
    BOARD: 'board',
    STARS: 'stars',
    SMILES: 'smiles',
    ARCS: 'arcs'
  };
  
  const SVG = {
    HAPPY: 'M511.99024 0.02c-282.294354 0-511.98976 229.695406-511.98976 511.98976 0 294.094118 229.695406 511.98976 511.98976 511.98976 282.394352 0 511.98976-217.895642 511.98976-511.98976C1023.98 229.715406 794.384592 0.02 511.99024 0.02zM701.886442 281.614368c36.699266 0 66.49867 29.799404 66.49867 66.49867s-29.799404 66.49867-66.49867 66.49867c-36.699266 0-66.49867-29.799404-66.49867-66.49867S665.187176 281.614368 701.886442 281.614368zM322.094038 281.614368c36.699266 0 66.49867 29.799404 66.49867 66.49867s-29.799404 66.49867-66.49867 66.49867-66.49867-29.799404-66.49867-66.49867C255.595368 311.413772 285.394772 281.614368 322.094038 281.614368zM693.086618 781.904362C648.087518 806.303874 588.688706 824.703506 524.689986 826.303474l0 0.299994-12.699746 0-12.799744 0L499.190496 826.303474c-63.898722-1.699966-123.297534-19.9996-168.296634-44.399112-58.99882-31.899362-87.598248-62.598748-87.598248-93.698126 0-22.299554 16.899662-39.699206 38.49923-39.699206 7.899842 0 15.599688 2.399952 22.299554 7.099858 5.599888 3.899922 11.199776 7.99984 17.099658 12.399752C338.693706 680.906382 356.693346 694.306114 380.49287 705.305894c31.49937 14.399712 76.99846 31.99936 131.597368 32.299354 54.49891-0.199996 99.998-17.799644 131.597368-32.299354 23.699526-10.899782 41.699166-24.299514 59.198816-37.299254 5.899882-4.399912 11.49977-8.49983 17.099658-12.399752 6.699866-4.699906 14.399712-7.099858 22.299554-7.099858 9.9998 0 19.799604 4.099918 26.99946 11.199776 7.399852 7.399852 11.49977 17.599648 11.49977 28.49943C780.684866 719.305614 751.98544 749.905002 693.086618 781.904362z',
    SAD: 'M701.952 281.6c36.864 0 66.56 29.696 66.56 66.56s-29.696 66.56-66.56 66.56-66.56-29.696-66.56-66.56C635.392 311.808 665.088 281.6 701.952 281.6zM512 0C229.888 0 0 229.888 0 512c0 294.4 229.888 512 512 512s512-217.6 512-512C1024 229.888 794.112 0 512 0zM322.048 281.6c36.864 0 66.56 29.696 66.56 66.56s-29.696 66.56-66.56 66.56-66.56-29.696-66.56-66.56C255.488 311.808 285.184 281.6 322.048 281.6zM769.024 779.776c-7.168 7.168-16.896 11.264-27.136 11.264-7.68 0-15.36-2.56-22.016-7.168-5.632-4.096-11.264-8.192-16.896-12.288-17.408-12.8-35.328-26.112-59.392-37.376-31.744-14.336-77.312-32.256-131.584-32.256-54.784 0-99.84 17.92-131.584 32.256-23.552 10.752-41.984 24.576-59.392 37.376-5.632 4.608-11.264 8.704-16.896 12.288-6.656 4.608-14.336 7.168-22.016 7.168-21.504 0-38.4-17.408-38.4-39.936 0-31.232 28.672-61.952 87.552-93.696 45.056-24.576 104.448-42.496 168.448-44.544l0 0 12.8 0 12.8 0 0 0.512c64 1.536 123.392 19.968 168.448 44.544 58.88 31.744 87.552 62.464 87.552 93.696C780.8 762.368 776.704 772.608 769.024 779.776z',
    STAR: 'M 0.000 10.000 L 11.756 16.180 L 9.511 3.090 L 19.021 -6.180 L 5.878 -8.090 L 0.000 -20.000 L -5.878 -8.090 L -19.021 -6.180 L -9.511 3.090 L -11.756 16.180 L 0.000 10.000'
  };
  
  const {ACTIVE_COLOR, DEFAULT_COLOR, FONT_COLOR, UNDERLAY_COLOR, DISABLE_COLOR} = COLOR;
  const {BOARD, SMILES, ARCS, STARS} = MODE;
  
  
  function polarToCartesian (centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees + 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY - (radius * Math.sin(angleInRadians))
    };
  }
  
  // generate d attribute value for ART <Shape>
  function generateArcPath (x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, startAngle);
    var end = polarToCartesian(x, y, radius, endAngle);
    var arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, arcSweep, 0, end.x, end.y
    ].join(' ');
  }
  
  export class AnterosGrading extends Component {
    constructor(props) {
      super(props);
      this.noop = this.noop.bind(this);
      this.renderArcs = this.renderArcs.bind(this);
      this.renderStars = this.renderStars.bind(this);
      this.renderBoard = this.renderBoard.bind(this);
      this.renderSmiles = this.renderSmiles.bind(this);
      this.openGradingModal = this.openGradingModal.bind(this);
    }
    noop () { }
    drawSmile(options) {
      const {
        like,
        active,
        scale = 1,
        activeColor = ACTIVE_COLOR,
        defaultColor = DEFAULT_COLOR,
        enable = true
      } = options || {};
      let fill = !active ? defaultColor : !enable ? DISABLE_COLOR : activeColor;
      return (
        <Surface width={50 * scale} height={50 * scale}>
          <Group x={5 * scale} y={5 * scale}>
            <Shape
              scale={40 / 1024 * scale}
              fill={fill}
              d={like ? SVG.HAPPY : SVG.SAD}/>
          </Group>
        </Surface>
      );
    }
    drawArc(options) {
      let {
        mode,
        activeColor = ACTIVE_COLOR,
        scoreBase = 10,
        scale = 1,
        score,
        fontColor = FONT_COLOR,
        name = '',
        enable,
        isPercentage
      } = options || {};
      isPercentage = mode === ARCS && isPercentage;
      if (isPercentage) scoreBase = 100;
      const angle = score / scoreBase * 360;
      let fontStyle = {
        fontSize: 20 * scale,
        lineHeight: 20 * scale,
        marginTop: -44 * scale,
        color: fontColor
      };
      let nameStyle = {
        fontSize: 16 * scale,
        marginTop: 24 * scale,
        color: fontColor
      };
      activeColor = !enable ? DISABLE_COLOR : activeColor;
      return (
        <View style={[stylesGrading.arcContainer]}>
          <View style={[stylesGrading.arc]}>
            <Surface width={68 * scale} height={68 * scale}>
              <Group x={0} y={0}>
                <Shape
                  scale={scale}
                  stroke={DEFAULT_COLOR}
                  strokeWidth={4}
                  d={generateArcPath(34, 34, 30, 0.01, 360)}
                  />
                {angle ?
                  <Shape
                    scale={scale}
                    stroke={activeColor}
                    strokeWidth={4}
                    d={generateArcPath(34, 34, 30, 0, angle)}
                    /> : undefined
                }
              </Group>
            </Surface>
          </View>
          <AnterosText style={[stylesGrading.arcGrading, fontStyle]}>{isPercentage ? score + '%' : score.toFixed(1)}</AnterosText>
          <AnterosText style={nameStyle}>{name}</AnterosText>
        </View>
      );
    }
    drawStar(options) {
      const {
        color = ACTIVE_COLOR,
        scale = 1,
        key,
        onGrading = this.noop
      } = options || {};
      return (
        <TouchableHighlight
          key={key}
          underlayColor="transparent"
          onPress={() => onGrading(key)}
          >
          <View>
            <Surface width={40 * scale} height={40 * scale}>
              <Group x={20 * scale} y={20 * scale}>
                <Shape
                  fill={color}
                  scale={scale}
                  d={SVG.STAR}
                  />
              </Group>
            </Surface>
          </View>
        </TouchableHighlight>
      );
    }
    parseNumber(num) {
      num = ~~num;
      let arr = [];
      while (num > 0) {
        arr.unshift(num % 1000);
        num = ~~(num / 1000);
      }
      return arr.join();
    }
    openGradingModal () {
      const {readOnly, enable} = this.props;
      if (readOnly || !enable) return;
      this.refs.modal.openModal();
    }
    renderArcs () {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={this.openGradingModal}>
          <View style={stylesGrading.arcs}>
            {this.drawArc({...this.props})}
            {<AnterosGradingModal
              ref="modal"
              {...this.props}
              scored={false}
            />}
          </View>
        </TouchableHighlight>
      );
    }
    renderStars() {
      let {
        score,
        scoreBase,
        scale,
        activeColor,
        defaultColor,
        onGrading,
        enable,
        readOnly
      } = this.props;
      let arr = [];
      activeColor = !enable ? DISABLE_COLOR : activeColor;
      defaultColor = !enable ? DEFAULT_COLOR : defaultColor;
      onGrading = enable && !readOnly ? onGrading : this.noop;
      while (scoreBase--) { arr.push(1); }
      return (
        <View style={stylesGrading.stars}>
          {arr.map((item, index) =>
            score >= index + 1 ?
            this.drawStar({scale: 0.3 * scale,
              color: activeColor,
              key: index + 1,
              onGrading
            }) : this.drawStar({scale: 0.3 * scale,
              color: defaultColor,
              key: index + 1,
              onGrading
            })
          )}
        </View>
      );
    }
    renderSmiles() {
      const {
        isLike,
        onGrading,
        enable,
        readOnly
      } = this.props;
      let onPress = enable && !readOnly ? onGrading : this.noop;
      return (
        <View style={stylesGrading.smiles}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => onPress(true)}>
            <View>
              {this.drawSmile({...this.props, active: isLike, like: true})}
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => onPress(false)}>
            <View>
              {this.drawSmile({...this.props, active: !isLike, like: false})}
            </View>
          </TouchableHighlight>
        </View>
      );
    }
    renderBoard() {
      const {
        score,
        num,
        activeColor,
        defaultColor,
        fontColor,
        enable
      } = this.props;
      let mainColor = !enable ? DISABLE_COLOR : activeColor;
      let font = !enable ? FONT_COLOR : fontColor;
      const BASE = 5;
      let arr = [1, 1, 1, 1, 1];
      return (
        <TouchableHighlight
          underlayColor={UNDERLAY_COLOR}
          onPress={this.openGradingModal}>
          <View style={stylesGrading.board}>
            <View style={stylesGrading.boardGradingWp}>
              <AnterosText style={[stylesGrading.boardGrading, {color: mainColor}]}>{(score % BASE).toFixed(1)}</AnterosText>
            </View>
            <AnterosText style={[stylesGrading.boardNum, {color: font}]}>
              {num < 100000 ? this.parseNumber(num)
                : num > Math.pow(10, 7) ? '999w+'
                : this.parseNumber(num / 10000) + 'w+'}
            </AnterosText>
            <View style={stylesGrading.boardStars}>
              {arr.map((item, index) =>
                score >= index + 1 ?
                this.drawStar({scale: 0.3, color: mainColor, key: index + 1})
                : this.drawStar({scale: 0.3, color: defaultColor, key: index + 1})
              )}
            </View>
            {<AnterosGradingModal
              ref="modal"
              {...this.props}
              scoreBase={BASE}
              scored={false}
            />}
          </View>
        </TouchableHighlight>
      );
    }
    render() {
      const {
        mode
      } = this.props;
      let rankingView = <AnterosText>Rendering</AnterosText>;
      if (mode === BOARD) {
        rankingView = this.renderBoard();
      } else if (mode === ARCS) {
        rankingView = this.renderArcs();
      } else if (mode === STARS){
        rankingView = this.renderStars();
      } else if (mode === SMILES){
        rankingView = this.renderSmiles();
      }
      return (
        <TouchableHighlight>
          {rankingView}
        </TouchableHighlight>
      );
    }
  }
  
  AnterosGrading.defaultProps = {
    mode: 'board',
    enable: true,
    readOnly: false,
    num: 0,
    score: 0,
    scoreBase: 5,
    scale: 1,
    onGrading: () => {},
    name: '',
    isLike: true,
    activeColor: ACTIVE_COLOR,
    defaultColor: DEFAULT_COLOR,
    fontColor: FONT_COLOR,
    cancelText: 'Cancel',
    confirmText: 'Confirm',
    isPercentage: false
  };
  
  AnterosGrading.propTypes = {
    mode: PropTypes.oneOf([BOARD, ARCS, SMILES, STARS]),
    enable: PropTypes.bool,
    readOnly: PropTypes.bool,
    isLike: PropTypes.bool,
    scale: PropTypes.number,
    score: PropTypes.number,
    scoreBase: PropTypes.number,
    onGrading: PropTypes.func,
    num: PropTypes.number,
    name: PropTypes.string,
    isPercentage: PropTypes.bool,
    activeColor: PropTypes.string,
    defaultColor: PropTypes.string,
    fontColor: PropTypes.string,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    cancelTextStyle: PropTypes.object,
    confirmTextStyle: PropTypes.object,
    cancelButtonStyle: PropTypes.object,
    confirmButtonStyle: PropTypes.object
  };
  
const stylesGrading = StyleSheet.create({
    board: {
      alignItems: 'center',
      padding: 4,
      width: 70,
      height: 80,
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: '#ccc'
    },
    boardGradingWp: {
      alignItems: 'center',
      width: 62,
      paddingBottom: 2,
      borderBottomWidth: 0.5,
      borderBottomColor: '#ccc'
    },
    boardGrading: {
      fontSize: 24,
      color: '#fa952f'
    },
    boardNum: {
      color: '#999'
    },
    boardStars: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 4
    },
    stars: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    arcs: {
    },
    arcContainer: {
      alignItems: 'center'
    },
    arc: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    arcGrading: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    smiles: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    }
  });



  export class AnterosGradingModal extends Component {
    static propTypes = {
      scored: PropTypes.bool,
      scoreBase: PropTypes.number,
      visible: PropTypes.bool,
      onGrading: PropTypes.func,
      confirmText: PropTypes.string,
      cancelText: PropTypes.string,
      cancelTextStyle: PropTypes.object,
      confirmTextStyle: PropTypes.object,
      cancelButtonStyle: PropTypes.object,
      confirmButtonStyle: PropTypes.object
    }
    static defaultProps = {
      scored: false,
      scoreBase: 5,
      visible: false,
      onGrading: () => {},
      cancelText: 'Cancel',
      confirmText: 'Confirm'
    }
    constructor (props) {
      super(props);
      this.state = {
        score: this.props.score
      };
      this.isModalVisible = false;
      this.openModal = this.openModal.bind(this);
      this.setModalVisible = this.setModalVisible.bind(this);
      this.onPressCancel = this.onPressCancel.bind(this);
      this.onPressConfirm = this.onPressConfirm.bind(this);
      this.onScrollChange = this.onScrollChange.bind(this);
    }
    setModalVisible (isModalVisible) {
      this.isModalVisible = isModalVisible;
      this.forceUpdate();
    }
    openModal () {
      this.setModalVisible(true);
    }
    onPressCancel () {
      this.setModalVisible(false);
    }
    onPressConfirm () {
      this.props.onGrading(this.state.score);
      this.setModalVisible(false);
    }
    onScrollChange (contentWidth, contentHeight) {
      let posY = ((this.state.score) * 10 - Size.offsetNum) * Size.itemHeight;
      if (!this.refs.scroll) return;
      this.refs.scroll.scrollTo({
        y: posY >= 0 ? posY : 0,
        x: 0
      });
    }
    render () {
      let {
        mode,
        isPercentage,
        scoreBase,
        confirmText,
        cancelText,
        cancelTextStyle,
        confirmTextStyle,
        cancelButtonStyle,
        confirmButtonStyle
      } = this.props;
      let selectArr = [];
      let i = 0;
      isPercentage = mode === MODE.ARCS && isPercentage;
      if (isPercentage) {
        while (++i <= scoreBase) {
          selectArr.push(i);
        }
      } else {
        while (++i <= scoreBase * 10) {
          selectArr.push(i);
        }
        selectArr = selectArr.map(item => item / 10);
      }
      return (
        <Modal
          transparent={true}
          visible={this.isModalVisible}
          onRequestClose={() => {}}>
            <View style={{flex: 1}}>
              <TouchableHighlight
                style={stylesModal.modalMask}
                activeOpacity={1}
                underlayColor={Color.maskColor}
                onPress={this.onPressCancel}>
                <View style={stylesModal.modalContainer}>
                  <View style={stylesModal.modal}>
                  {Platform.OS === 'ios' &&
                    <View>
                      <Picker
                        selectedValue={this.state.score}
                        onValueChange={(value) => !this.props.scored && this.setState({score: value})}>
                        {selectArr.map(item =>
                          <Picker.Item label={isPercentage ? item + '%' : item.toFixed(1)} value={item} key={item}/>
                        )}
                      </Picker>
                    </View>
                  }
                  {Platform.OS === 'android' &&
                    <View style={stylesModal.modalScroll}>
                      <ScrollView ref="scroll" onContentSizeChange={this.onScrollChange}>
                      {selectArr.map((item, index) =>
                        <TouchableHighlight
                          activeOpacity={0.5}
                          underlayColor="transparent"
                          key={'modal-item-' + index}
                          onPress={() => !this.props.scored && this.setState({score: item})}>
                          <View style={[stylesModal.modalItem, this.state.score === item && stylesModal.selectedItem]}>
                            <Text style={[stylesModal.modalText, this.state.score === item && stylesModal.selectedText]}>
                              {isPercentage ? item + '%' : item}
                            </Text>
                          </View>
                        </TouchableHighlight>
                      )}
                      </ScrollView>
                    </View>
                  }
                    <View style={stylesModal.buttonView}>
                      <TouchableHighlight
                        activeOpacity={0.9}
                        underlayColor="transparent"
                        onPress={this.onPressCancel}>
                        <View style={[stylesModal.modalButton, stylesModal.cancelButton, cancelButtonStyle]}>
                          <Text style={[stylesModal.buttonText, stylesModal.cancelText, cancelTextStyle]}>{cancelText}</Text>
                        </View>
                      </TouchableHighlight>
                      <TouchableHighlight
                        activeOpacity={0.9}
                        underlayColor="transparent"
                        onPress={this.onPressConfirm}>
                        <View style={[stylesModal.modalButton, stylesModal.confirmButton, confirmButtonStyle]}>
                          <Text style={[stylesModal.buttonText, stylesModal.confirmText, confirmTextStyle]}>{confirmText}</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
        </Modal>
      );
    }
  }


  



// calculate offset number to place selected item at the center of the screen
Size.offsetNum = Math.floor(height * Size.heightFactor / 2 / Size.itemHeight + 1);

const stylesModal = StyleSheet.create({
  modalMask: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.maskColor
  },
  modalContainer: {
  },
  modal: {
    width: width * Size.widthFactor,
    overflow: 'hidden',
    backgroundColor: '#fff'
  },
  modalItem: {
    height: Size.itemHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2 / scale,
    borderBottomColor: '#bbb'
  },
  selectedItem: {
    backgroundColor: '#e6f6f9'
  },
  modalText: {
    fontSize: 18,
    color: '#999'
  },
  selectedText: {
    fontSize: 22,
    color: '#333'
  },
  modalButtons: {
    borderTopWidth: 2 / scale,
    borderColor: '#c6c6c6',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  modalButton: {
    height: 40,
    width: width * Size.widthFactor / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18
  },
  cancelButton: {
    backgroundColor: '#c7c7c7'
  },
  confirmButton: {
    backgroundColor: '#49aec8'
  },
  modalScroll: {
    height: height * Size.heightFactor
  },
  buttonView: {
    flexDirection: 'row'
  },
  cancelText: {
    color: '#fff'
  },
  confirmText: {
    color: '#fff'
  }
});