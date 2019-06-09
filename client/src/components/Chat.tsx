import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Subscription } from 'rxjs';

import { Message } from '../models/Message';
import MessageService from '../services/MessageService';

import ChatMessage from './ChatMessage';
import UserService from '../services/UserService';
import { User } from '../models/User';

interface Props {
  receiver: User;
}
interface State {
  messages: Message[];
}
export default class Chat extends Component<Props, State> {

  private messageService: MessageService;
  private userService: UserService;

  private messageSubscription?: Subscription;

  constructor(props: Props) {
    super(props);
    this.messageService = MessageService.instance;
    this.userService = UserService.instance;

    this.state = {
      messages: [],
    };
  }

  componentDidMount(): void {
    this.messageSubscription = this.messageService.messages.subscribe((messages) => {
      this.setState({
        messages: [...messages],
      });
    });
    this.messageService.getMessages(this.userService.user.deviceID, this.props.receiver.deviceID);
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
