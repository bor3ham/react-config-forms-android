import React from 'react'
import {
  View,
  Text,
  TextInput,
  CheckBox,
  Picker,
  TouchableOpacity,
} from 'react-native'

import { ResizingTextInput } from './inputs'
import { prettify } from './utils'

class Container extends React.Component {
  render() {
    return (
      <View style={{
      }}>
        {this.props.children}
      </View>
    )
  }
}

class ParseError extends React.Component {
  render() {
    return (<Text>Error parsing config: {this.props.error}</Text>)
  }
}
class FormatError extends React.Component {
  render() {
    return (<Text>Content error in config: {this.props.error}</Text>)
  }
}

class FormTextDisplay extends React.Component {
  render() {
    return (<Text>{this.props.text}</Text>)
  }
}
class FormGroup extends React.Component {
  render() {
    return (
      <View>
        {this.props.children}
      </View>
    )
  }
}

class FormContainer extends React.Component {
  render() {
    return (
      <View style={{
        paddingTop: 10,
        paddingBottom: 10,
      }}>
        {this.props.children}
      </View>
    )
  }
}
class LabelledFormContainer extends React.Component {
  render() {
    let label
    if (this.props.label) {
      label = (<Text style={{fontWeight: 'bold'}}>{this.props.label}</Text>)
    }
    return (
      <FormContainer>
        {label}
        {this.props.children}
      </FormContainer>
    )
  }
}

class FormTextInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = ::this.handleChange
  }
  handleChange(newValue) {
    this.props.onChange(this.props.fieldKey, newValue)
  }
  render() {
    let placeholder = this.props.placeholder || prettify(this.props.fieldKey)
    return (
      <LabelledFormContainer {...this.props}>
        <TextInput
          style={{
            height: 40,
          }}
          value={this.props.value}
          placeholder={placeholder}
          onChangeText={this.handleChange}
        />
      </LabelledFormContainer>
    )
  }
}

class FormTextAreaInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = ::this.handleChange

    this.state = {
      ...this.state,
      height: 80,
    }
  }
  handleChange(newValue) {
    this.props.onChange(this.props.fieldKey, newValue)
  }
  render() {
    let placeholder = this.props.placeholder || prettify(this.props.fieldKey)
    return (
      <LabelledFormContainer {...this.props}>
        <ResizingTextInput
          multiline
          value={this.props.value}
          onChangeText={this.handleChange}
          blurOnSubmit={false}
          placeholder={placeholder}
        />
      </LabelledFormContainer>
    )
  }
}
class FormCheckboxInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = ::this.handleChange
    this.handleLabelPress = ::this.handleLabelPress
  }
  handleChange(newValue) {
    this.props.onChange(this.props.fieldKey, newValue)
  }
  handleLabelPress() {
    this.handleChange(!this.props.value)
  }
  render() {
    return (
      <FormContainer>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <CheckBox
            value={this.props.value}
            onValueChange={this.handleChange}
          />
          <TouchableOpacity
            onPress={this.handleLabelPress}
            style={{
              flex: 1,
            }}
          >
            <Text>
              {this.props.label || prettify(this.props.fieldKey)}
            </Text>
          </TouchableOpacity>
        </View>
      </FormContainer>
    )
  }
}
class FormSelectInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = ::this.handleChange
  }
  handleChange(newValue) {
    this.props.onChange(this.props.fieldKey, newValue)
  }
  render() {
    return (
      <LabelledFormContainer {...this.props}>
        <Picker
          selectedValue={this.props.value}
          onValueChange={this.handleChange}
        >
          {this.props.options.map((option, optionIndex) => {
            return (
              <Picker.Item
                key={`choice-${optionIndex}`}
                label={option.label || `Option ${optionIndex}`}
                value={option.value}
              />
            )
          })}
        </Picker>
      </LabelledFormContainer>
    )
  }
}

var AndroidRenderer = {
  container: Container,

  parseError: ParseError,
  formatError: FormatError,

  textDisplay: FormTextDisplay,
  group: FormGroup,

  text: FormTextInput,
  textarea: FormTextAreaInput,
  checkbox: FormCheckboxInput,
  select: FormSelectInput,
}

export default AndroidRenderer
