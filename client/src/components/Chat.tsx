import React, { Component } from 'react';
import { FlatList } from 'react-native';
import MessageManager from '../services/MessageManager';
import ChatMessage from './ChatMessage';
import { Message } from '../models/Message';
import { Subscription } from 'rxjs';

interface Props {}
interface State {
  messages: Message[]
}
export default class Chat extends Component<Props, State> {

  private messageManager: MessageManager;
  private messageSubscription?: Subscription;
  private messages: Message[] = [];

  constructor(props: Props) {
    super(props);
    this.messageManager = MessageManager.getInstance();

    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    this.messageSubscription = this.messageManager.onMessage().subscribe(message => {
      this.messages.push(message);
      this.setState({
        messages: [...this.messages]
      });
    });
  }

  componentWillUnmount() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  render() {
    return (
      <FlatList
        inverted={ true }
        data={ this.state.messages.reverse() }
        keyExtractor={ (item: Message, index: number) => index.toString() }
        renderItem={ ({item}) => <ChatMessage message={ item } />}
      />
    );
  }
}
