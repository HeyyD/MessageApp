import React, {Component} from 'react';
import {Text, View} from 'react-native';
import MessageManager from './src/services/MessageManager';

interface Props {}
export default class App extends Component<Props> {

  private messageManager: MessageManager;

  constructor(props: Props) {
    super(props);
    this.messageManager = MessageManager.getInstance();
  }

  render() {
    return (
      <View>
        <Text>MessageApp</Text>
      </View>
    );
  }
}
