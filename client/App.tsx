import React, { Component } from 'react';
import { View } from 'react-native';
import Chat from './src/components/Chat';
import ChatInput from './src/components/ChatInput';

export default class App extends Component {
  render() {
    return (
      <View>
        <Chat/>
        <ChatInput/>
      </View>
    );
  }
}
