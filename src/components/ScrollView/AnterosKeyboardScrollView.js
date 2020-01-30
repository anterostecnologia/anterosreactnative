import React from 'react'
import PropTypes from 'prop-types'
import ReactNative, {
  Keyboard,
  Platform,
  UIManager,
  TextInput,
  ScrollView,
  ListView,
  FlatList,
  SectionList,
  findNodeHandle
} from 'react-native'
import { isIphoneX } from '../Utils/AnterosHelper'

const _KAM_DEFAULT_TAB_BAR_HEIGHT = isIphoneX() ? 83 : 49
const _KAM_KEYBOARD_OPENING_TIME = 250
const _KAM_EXTRA_HEIGHT = 75

function getDisplayName(WrappedComponent) {
    //return WrappedComponent.displayName || WrappedComponent.name || 'Component'
    return 'Component'
  }
  
function listenToKeyboardEvents(ScrollableComponent) {
    return class extends React.Component {
        _rnkasv_keyboardView
        keyboardWillShowEvent
        keyboardWillHideEvent
        position
        defaultResetScrollToCoords
        resetCoords
        mountedComponent
        handleOnScroll
        state

        static displayName = `KeyboardAware${getDisplayName(ScrollableComponent)}`

        static propTypes = {
        viewIsInsideTabBar: PropTypes.bool,
        resetScrollToCoords: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired
        }),
        enableResetScrollToCoords: PropTypes.bool,
        enableAutomaticScroll: PropTypes.bool,
        extraHeight: PropTypes.number,
        extraScrollHeight: PropTypes.number,
        keyboardOpeningTime: PropTypes.number,
        onScroll: PropTypes.func,
        contentContainerStyle: PropTypes.any,
        enableOnAndroid: PropTypes.bool,
        innerRef: PropTypes.func
        }

        static defaultProps = {
        enableAutomaticScroll: true,
        extraHeight: _KAM_EXTRA_HEIGHT,
        extraScrollHeight: 0,
        enableResetScrollToCoords: true,
        keyboardOpeningTime: _KAM_KEYBOARD_OPENING_TIME,
        viewIsInsideTabBar: false
        }

        constructor(props) {
        super(props)
        this.keyboardWillShowEvent = undefined
        this.keyboardWillHideEvent = undefined
        this.position = { x: 0, y: 0 }
        this.defaultResetScrollToCoords = null
        const keyboardSpace = props.viewIsInsideTabBar
            ? _KAM_DEFAULT_TAB_BAR_HEIGHT
            : 0
        this.state = { keyboardSpace }

        
        
        }



        componentDidMount() {
        this.mountedComponent = true
        
        if (Platform.OS === 'ios') {
            this.keyboardWillShowEvent = Keyboard.addListener(
            'keyboardWillShow',
            this._updateKeyboardSpace
            )
            this.keyboardWillHideEvent = Keyboard.addListener(
            'keyboardWillHide',
            this._resetKeyboardSpace
            )
        } else if (Platform.OS === 'android' && this.props.enableOnAndroid) {
            this.keyboardWillShowEvent = Keyboard.addListener(
            'keyboardDidShow',
            this._updateKeyboardSpace
            )
            this.keyboardWillHideEvent = Keyboard.addListener(
            'keyboardDidHide',
            this._resetKeyboardSpace
            )
        }


        // setTimeout(() => this.scrollToPosition(100,200),1000);

        }

        componentWillReceiveProps(nextProps) {
        if (nextProps.viewIsInsideTabBar !== this.props.viewIsInsideTabBar) {
            const keyboardSpace = nextProps.viewIsInsideTabBar
            ? _KAM_DEFAULT_TAB_BAR_HEIGHT
            : 0
            if (this.state.keyboardSpace !== keyboardSpace) {
            this.setState({ keyboardSpace })
            }
        }
        }

        componentWillUnmount() {
        this.mountedComponent = false
        this.keyboardWillShowEvent && this.keyboardWillShowEvent.remove()
        this.keyboardWillHideEvent && this.keyboardWillHideEvent.remove()
        }

        getScrollResponder = () => {
        return (
            this._rnkasv_keyboardView &&
            this._rnkasv_keyboardView.getScrollResponder()
        )
        }

        scrollToPosition = (x, y, animated = true) => {
        const responder = this.getScrollResponder()
        responder && responder.scrollResponderScrollTo({ x, y, animated })
        }

        scrollToEnd = (animated = true) => {
        const responder = this.getScrollResponder()
        responder && responder.scrollResponderScrollToEnd({ animated })
        }

        scrollForExtraHeightOnAndroid = (extraHeight) => {
        this.scrollToPosition(0, this.position.y + extraHeight, true)
        }

        /**
         * @param keyboardOpeningTime: takes a different keyboardOpeningTime in consideration.
         * @param extraHeight: takes an extra height in consideration.
         */
        scrollToFocusedInput = (
        reactNode,
        extraHeight,
        keyboardOpeningTime
        ) => {
        if (extraHeight === undefined) {
            extraHeight = this.props.extraHeight || 0
        }
        if (keyboardOpeningTime === undefined) {
            keyboardOpeningTime = this.props.keyboardOpeningTime || 0
        }
        setTimeout(() => {
            if (!this.mountedComponent) {
            return
            }
            const responder = this.getScrollResponder()
            responder &&
            responder.scrollResponderScrollNativeHandleToKeyboard(
                reactNode,
                extraHeight,
                true
            )
        }, keyboardOpeningTime)
        }

        scrollIntoView = async (
        element,
        options = {}
        ) => {
        if (!this._rnkasv_keyboardView || !element) {
            return
        }

        const [
            parentLayout,
            childLayout
        ] = await Promise.all([
            this._measureElement(this._rnkasv_keyboardView),
            this._measureElement(element)
        ])

        const getScrollPosition = options.getScrollPosition || this._defaultGetScrollPosition
        const { x, y, animated } = getScrollPosition(parentLayout, childLayout, this.position)
        this.scrollToPosition(x, y, animated)
        }

        _defaultGetScrollPosition = (
        parentLayout,
        childLayout,
        contentOffset
        ) => {
        return {
            x: 0,
            y: Math.max(0, childLayout.y - parentLayout.y + contentOffset.y),
            animated: true,
        }
        }

        _measureElement = (element) => {
        const node = findNodeHandle(element)
        return new Promise((resolve) => {
            UIManager.measureInWindow(node, (x, y, width, height) => {
            resolve({ x, y, width, height })
            })
        })
        }

        // Keyboard actions
        _updateKeyboardSpace = (frames) => {
        // Automatically scroll to focused TextInput
        if (this.props.enableAutomaticScroll) {
            let keyboardSpace = frames.endCoordinates.height + this.props.extraScrollHeight
            if (this.props.viewIsInsideTabBar) {
            keyboardSpace -= _KAM_DEFAULT_TAB_BAR_HEIGHT
            }
            this.setState({ keyboardSpace })
            const currentlyFocusedField = TextInput.State.currentlyFocusedField()
            const responder = this.getScrollResponder()
            if (!currentlyFocusedField || !responder) {
            return
            }
            UIManager.viewIsDescendantOf(
            currentlyFocusedField,
            responder.getInnerViewNode(),
            (isAncestor) => {
                if (isAncestor) {
                // Check if the TextInput will be hidden by the keyboard
                UIManager.measureInWindow(
                    currentlyFocusedField,
                    (x, y, width, height) => {
                    const textInputBottomPosition = y + height
                    const keyboardPosition = frames.endCoordinates.screenY
                    const totalExtraHeight =
                        this.props.extraScrollHeight + this.props.extraHeight
                    if (Platform.OS === 'ios') {
                        if (
                        textInputBottomPosition >
                        keyboardPosition - totalExtraHeight
                        ) {
                        this._scrollToFocusedInputWithNodeHandle(
                            currentlyFocusedField
                        )
                        }
                    } else {
                        // On android, the system would scroll the text input just
                        // above the keyboard so we just neet to scroll the extra
                        // height part
                        if (textInputBottomPosition > keyboardPosition) {
                        // Since the system already scrolled the whole view up
                        // we should reduce that amount
                        keyboardSpace =
                            keyboardSpace -
                            (textInputBottomPosition - keyboardPosition)
                        this.setState({ keyboardSpace })
                        this.scrollForExtraHeightOnAndroid(totalExtraHeight)
                        } else if (
                        textInputBottomPosition >
                        keyboardPosition - totalExtraHeight
                        ) {
                        this.scrollForExtraHeightOnAndroid(
                            totalExtraHeight -
                            (keyboardPosition - textInputBottomPosition)
                        )
                        }
                    }
                    }
                )
                }
            }
            )
        }
        if (!this.resetCoords) {
            if (!this.defaultResetScrollToCoords) {
            this.defaultResetScrollToCoords = this.position
            }
        }
        }

        _resetKeyboardSpace = () => {
        const keyboardSpace = this.props.viewIsInsideTabBar
            ? _KAM_DEFAULT_TAB_BAR_HEIGHT + this.props.extraScrollHeight || 0
            : this.props.extraScrollHeight || 0
        this.setState({ keyboardSpace })
        // Reset scroll position after keyboard dismissal
        if (this.props.enableResetScrollToCoords === false) {
            this.defaultResetScrollToCoords = null
            return
        } else if (this.resetCoords) {
            this.scrollToPosition(this.resetCoords.x, this.resetCoords.y, true)
        } else {
            if (this.defaultResetScrollToCoords) {
            this.scrollToPosition(
                this.defaultResetScrollToCoords.x,
                this.defaultResetScrollToCoords.y,
                true
            )
            this.defaultResetScrollToCoords = null
            } else {
            this.scrollToPosition(0, 0, true)
            }
        }
        }

        _scrollToFocusedInputWithNodeHandle = (
        nodeID,
        extraHeight,
        keyboardOpeningTime
        ) => {
        if (extraHeight === undefined) {
            extraHeight = this.props.extraHeight
        }
        const reactNode = ReactNative.findNodeHandle(nodeID)
        this.scrollToFocusedInput(
            reactNode,
            extraHeight + this.props.extraScrollHeight,
            keyboardOpeningTime !== undefined
            ? keyboardOpeningTime
            : this.props.keyboardOpeningTime || 0
        )
        }

        _handleOnScroll = (
        e
        ) => {
        this.position = e.nativeEvent.contentOffset
        }

        _handleRef = (ref) => {
        this._rnkasv_keyboardView = ref
        if (this.props.innerRef) {
            this.props.innerRef(this._rnkasv_keyboardView)
        }
        //console.log('refScroll ' + this.props.refScroll)
        if(this.props.refScroll !== undefined){
            this.props.refScroll(ref)
        }
        }

        _onScroll = (
        e
        ) => {
        this._handleOnScroll(e)
        this.props.onScroll && this.props.onScroll(e)
        }

        render() {
        const { enableOnAndroid, contentContainerStyle } = this.props
        let newContentContainerStyle
        if (Platform.OS === 'android' && enableOnAndroid) {
            newContentContainerStyle = [].concat(contentContainerStyle).concat({
            paddingBottom:
                ((contentContainerStyle || {}).paddingBottom || 0) +
                this.state.keyboardSpace
            })
        }
        return (
            <ScrollableComponent
            ref={this._handleRef}
            keyboardDismissMode='interactive'
            contentInset={{ bottom: this.state.keyboardSpace }}
            automaticallyAdjustContentInsets={false}
            showsVerticalScrollIndicator={true}
            scrollEventThrottle={1}
            {...this.props}
            contentContainerStyle={
                newContentContainerStyle || contentContainerStyle
            }
            keyboardSpace={this.state.keyboardSpace}
            getScrollResponder={this.getScrollResponder}
            scrollToPosition={this.scrollToPosition}
            scrollToEnd={this.scrollToEnd}
            scrollForExtraHeightOnAndroid={this.scrollForExtraHeightOnAndroid}
            scrollToFocusedInput={this.scrollToFocusedInput}
            resetKeyboardSpace={this._resetKeyboardSpace}
            handleOnScroll={this._handleOnScroll}
            onScroll={this._onScroll}
            />
        )
        }
    }
}

const AnterosKeyboardFlatList = listenToKeyboardEvents(FlatList);
const AnterosKeyboardListView = listenToKeyboardEvents(ListView);
const AnterosKeyboardScrollView = listenToKeyboardEvents(ScrollView);
const AnterosKeyboardSectionList= listenToKeyboardEvents(SectionList);

export {listenToKeyboardEvents,AnterosKeyboardFlatList,AnterosKeyboardListView,AnterosKeyboardScrollView, AnterosKeyboardSectionList}