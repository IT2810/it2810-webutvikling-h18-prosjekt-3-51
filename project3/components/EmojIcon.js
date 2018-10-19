import React from 'react';
import { Text } from 'react-native';

export default class EmojIcon extends React.Component {
  render() {
    const color = this.props.focused ? "#000000FF" : "#00000088"
    return (
      <Text style={{fontSize: 26, color: color}}>{this.props.emoji}</Text>
    );
  }
}