import React, { Component } from 'react';
import { TextInput } from "react-native";
import {labelStyle, flexStyle, buttonRowStyle} from "../constants/Styles"

class InputField extends Component {
  /* Input field that expands on TextInput and applies a style
  */

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TextInput
        style={{
        flexGrow: 1, margin: 5, padding: 10, height:50, fontSize: labelStyle.fontSize,
        backgroundColor: "white"}}
        
        placeholder={this.props.placeholder}
        onChangeText={this.props.onChangeText}
      />
    );
  }
}

export default InputField;