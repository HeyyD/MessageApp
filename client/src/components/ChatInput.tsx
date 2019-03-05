import React, { Component } from 'react';
import { TextInput, View, Button, StyleSheet } from 'react-native';
import MessageManager from '../services/MessageManager';

let styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 20,
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10
  }
});

interface Props {}
interface State { 
  message: string
}

export default class ChatInput extends Component<Props, State> {

  private messageManager: MessageManager;

  constructor(props: Props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);

    this.messageManager = MessageManager.getInstance();
    this.state = {
      message: ''
    }
  }

  sendMessage() {
    this.messageManager.sendMessage({text: this.state.message});
    this.setState({message: ''});
  }

  render() {
    return (
      <View style={ styles.container }>
        <TextInput 
          style={styles.input}
          onChangeText={(text: string) => this.setState({message: text})}
          value={ this.state.message }
        />
        <Button disabled={ !(this.state.message.length > 0) } title='send' onPress={ () => this.sendMessage()}/>
      </View>
    )
  }
}
