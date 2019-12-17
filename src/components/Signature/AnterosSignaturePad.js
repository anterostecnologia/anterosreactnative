import React, {Component} from 'react'
import {View} from 'react-native'
import PropTypes from 'prop-types'
import SignaturePad from 'react-native-signature-pad'


export default class AnterosSignaturePad extends Component{

   render(){
    const {
        onError,
        onChange,
        style,
        dataURL,
        penColor
        } = this.props

    return(
      <View style={{flex: 1}}>
          <SignaturePad onError={onError}
                        onChange={onChange}
                        dataURL={dataURL}
                        penColor={penColor ? penColor : 'black'}
                        style={style}/>
      </View>
    )
  }
}

AnterosSignaturePad.propTypes = {
      onError = PropTypes.func,
      onChange = PropTypes.func,
      style = PropTypes.style,
      dataURL = PropTypes.string,
      penColor: PropTypes.string
}