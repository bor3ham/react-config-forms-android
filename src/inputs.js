import React from 'react'
import {
  TextInput,
} from 'react-native'

class ResizingTextInput extends React.Component {
  constructor(props) {
    super(props)

    this.handleSizeChange = ::this.handleSizeChange

    this.state = {
      ...this.state,
      height: this.props.minHeight,
    }
  }
  handleSizeChange(ev) {
    let newHeight = ev.nativeEvent.contentSize.height + this.props.sizingExtra
    this.setState({
      height: Math.max(newHeight, this.props.minHeight),
    })
  }
  render() {
    return (
      <TextInput
        {...this.props}
        onContentSizeChange={this.handleSizeChange}
        style={{
          ...this.props.style,
          height: this.state.height,
        }}
      />
    )
  }
}
ResizingTextInput.defaultProps = {
  minHeight: 40,
  sizingExtra: 20,
}

export { ResizingTextInput }
