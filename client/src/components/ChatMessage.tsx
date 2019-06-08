import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MessageService from '../services/MessageService';
import { Message } from '../models/Message';

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

  private messageManager: MessageService;

  constructor(props: Props) {
    super(props);
    this.messageManager = MessageService.getInstance();
  }

  render(): JSX.Element {
    const user = JSON.stringify(this.messageManager.getUser());
    const sender = JSON.stringify(this.props.message.user);

    return (
      <View style={ [styles.container, (user === sender) ? styles.ownMessage : null] }>
        <Text style={ styles.text }>{ this.props.message.text }</Text>
        <Text
          style={[styles.username, (user === sender) ? {textAlign: 'right'} : null ]}
        >{ this.props.message.user.username }</Text>
      </View>
    );
  }
}
