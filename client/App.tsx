import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Chat from './src/components/Chat';
import ChatInput from './src/components/ChatInput';

let styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  }
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.chatContainer}>
        <Chat/>
        <ChatInput/>
      </View>
    );
  }
}
