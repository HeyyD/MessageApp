import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Chat from './Chat';
import ChatInput from './ChatInput';
import { User } from '../models/User';
import { NavigationScreenProps } from 'react-navigation';

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

interface Props extends NavigationScreenProps {}
export default class ChatScreen extends Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <View style={styles.chatContainer}>
        <Chat receiver={this.props.navigation.getParam('receiver')}/>
        <ChatInput receiver={ this.props.navigation.getParam('receiver') }/>
      </View>
    );
  }
}
