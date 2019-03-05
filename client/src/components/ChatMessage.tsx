import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebebeb',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 'auto',
  },
  text: {
    fontSize: 15
  },
  ownMessage: {
    marginLeft: 'auto',
    marginRight: 10,
    backgroundColor: '#ffA500'
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
      <View style={ [styles.container, styles.ownMessage] }>
        <Text style={ styles.text }>{ this.props.text }</Text>
      </View>
    );
  }
}
