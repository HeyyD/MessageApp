import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebebeb',
    padding: 10,
    margin: 10
  },
  text: {
    fontSize: 20
  }
});

interface Props {
  text: string
}
export default class ChatMessage extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.text }>{ this.props.text }</Text>
      </View>
    );
  }
}
