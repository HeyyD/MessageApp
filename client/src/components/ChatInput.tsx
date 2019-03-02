import React, { Component } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import MessageManager from '../services/MessageManager';

interface Props {}
interface State { 
  message: string
}

export default class ChatInput extends Component<Props, State> {

  private messageManager: MessageManager;

  constructor(props: Props) {
    super(props);
    this.messageManager = MessageManager.getInstance();
    this.state = {
      message: ''
    }
  }

  render() {
    return (
      <View>
        <TextInput style={{backgroundColor: '#ebebeb'}} onChangeText={(text: string) => this.setState({message: text})} />
        <Button title='send' onPress={ () =>  this.messageManager.sendMessage({text: this.state.message})}/>
      </View>
    )
  }
}
