import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../models/Message';
import UserService from '../services/UserService';

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    alignSelf: 'flex-start',
    backgroundColor: '#ebebeb',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 1)',
  },
  username: {
    fontSize: 10,
  },
  ownMessage: {
    margin: 10,
    alignSelf: 'flex-end',
    backgroundColor: '#ffA500',
  },
});

interface Props {
  message: Message;
}
export default class ChatMessage extends Component<Props> {

  private userService: UserService;

  constructor(props: Props) {
    super(props);
    this.userService = UserService.instance;
  }

  render(): JSX.Element {
    const user = this.userService.user.deviceID;
    const sender = this.props.message.sender.deviceID;

    return (
      <View style={ [styles.container, (user === sender) ? styles.ownMessage : null] }>
        <Text style={ styles.text }>{ this.props.message.text }</Text>
        <Text
          style={[styles.username, (user === sender) ? {textAlign: 'right'} : null ]}
        >{ this.props.message.sender.username }</Text>
      </View>
    );
  }
}
