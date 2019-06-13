import React, { Component } from 'react';
import { FlatList, ToastAndroid, ActivityIndicator } from 'react-native';
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
  isLoading: boolean;
}
export default class Chat extends Component<Props, State> {

  private messageService: MessageService;
  private userService: UserService;

  private messagesSubscription?: Subscription;
  private messageSubscription?: Subscription;
  private loadingSubscription?: Subscription;

  constructor(props: Props) {
    super(props);
    this.messageService = MessageService.instance;
    this.userService = UserService.instance;

    this.state = {
      messages: [],
      isLoading: true,
    };
  }

  componentDidMount(): void {
    this.messageService.currentChat = this.props.receiver.deviceID;
    this.messagesSubscription = this.messageService.messages.subscribe((messages) => {
      this.setState({
        messages: [...messages],
      });
    });

    this.messageSubscription = this.messageService.message.subscribe((message) => {
      if (
        (message.sender.deviceID !== this.props.receiver.deviceID) &&
        (message.sender.deviceID !== this.userService.user.deviceID)
        ) {
        ToastAndroid.showWithGravity(
          `New message from ${message.sender.username}`,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    });
    this.loadingSubscription = this.messageService.isLoading.subscribe((isLoading) => {
      this.setState({isLoading});
    });
    this.messageService.getMessages(this.userService.user.deviceID, this.props.receiver.deviceID);
  }

  componentWillUnmount(): void {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }

    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }

    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  render(): JSX.Element {
    if (this.state.isLoading) {
      return <ActivityIndicator size='large' color='#eb6123' />;
    } else {
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
}
