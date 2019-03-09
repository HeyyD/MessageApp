import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Subscription } from 'rxjs';

import { Message } from '../models/Message';
import MessageManager from '../services/MessageManager';

import ChatMessage from './ChatMessage';

interface Props {}
interface State {
  messages: Message[];
}
export default class Chat extends Component<Props, State> {

  private messageManager: MessageManager;
  private messageSubscription?: Subscription;
  private messages: Message[] = [];

  constructor(props: Props) {
    super(props);
    this.messageManager = MessageManager.getInstance();

    this.state = {
      messages: [],
    };
  }

  componentDidMount(): void {
    this.messageSubscription = this.messageManager.onMessage().subscribe((message) => {
      this.messages.push(message);
      this.setState({
        messages: [...this.messages],
      });
    });
  }

  componentWillUnmount(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  render(): JSX.Element {
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
