import React, { Component } from 'react';
import { TextInput } from "react-native";

class InputField extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TextInput
        style={{
        flexGrow: 1, margin: 5, padding: 10, height:50, fontSIze: 12,
        backgroundColor: "white"}}
        
        placeholder={this.props.placeholder}
        onChangeText={this.props.onChangeText}
      />
    );
  }
}

export default InputField;