import React, { Component } from 'react';
import { Text } from 'react-native';
import MessageManager from '../services/MessageManager';
import { Message } from '../models/Message';

interface Props {}
interface State {
  messages: Message[]
}
export default class Chat extends Component<Props, State> {

  private messageManager: MessageManager;
  private messages: Message[] = [];

  constructor(props: Props) {
    super(props);
    this.messageManager = MessageManager.getInstance();

    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    this.messageManager.onMessage().subscribe(message => {
      this.messages.push(message);
      this.setState({
        messages: [...this.messages]
      });
    });
  }

  render() {
    return (
      <Text>{ this.state.messages.map(m => m.text) }</Text>
    );
  }
}
