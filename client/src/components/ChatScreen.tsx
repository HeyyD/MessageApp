import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Chat from './Chat';
import ChatInput from './ChatInput';

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default class ChatScreen extends Component {
  render(): JSX.Element {
    return (
      <View style={styles.chatContainer}>
        <Chat/>
        <ChatInput/>
      </View>
    );
  }
}
