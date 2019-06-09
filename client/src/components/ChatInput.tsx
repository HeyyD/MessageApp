import React, { Component } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MessageService from '../services/MessageService';
import UserService from '../services/UserService';

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 20,
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    marginRight: 5,
    justifyContent: 'center',
  },
});

interface Props {}
interface State {
  message: string;
}

export default class ChatInput extends Component<Props, State> {

  private messageManager: MessageService;
  private userService: UserService;

  constructor(props: Props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);

    this.messageManager = MessageService.getInstance();
    this.userService = UserService.instance;

    this.state = {
      message: '',
    };
  }

  sendMessage(): void {
    if (this.state.message.length > 0) {
      this.messageManager.sendMessage({
        user: this.userService.user,
        text: this.state.message,
      });

      this.setState({message: ''});
    }
  }

  render(): JSX.Element {
    return (
      <View style={ styles.container }>
        <TextInput
          style={styles.input}
          onChangeText={(text: string) => this.setState({message: text})}
          value={ this.state.message }
          returnKeyType='send'
          onSubmitEditing={ () => this.sendMessage() }
        />
        <TouchableOpacity
          style={styles.button}
          disabled={ !(this.state.message.length > 0) }
          onPress={ () => this.sendMessage()}
        >
          <Icon name='arrow-right' size={40} color={ !(this.state.message.length > 0) ? '#aaa' : '#eb6123' }/>
        </TouchableOpacity>
      </View>
    );
  }
}
