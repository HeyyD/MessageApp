import React, { Component } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import MessageManager from '../services/MessageManager';
import { User } from '../models/User';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 10,
  },
});

interface Props extends NavigationScreenProps {}

export default class LoadingScreen extends Component<Props> {

  private api: string = 'http://192.168.1.31:8080/api/users/';

  componentDidMount(): void {
    this.init();
  }

  render(): JSX.Element {
    return (
      <View style={styles.container}>
        <Text style={ styles.text }>Just a moment...</Text>
        <ActivityIndicator size='large' color='#eb6123' />
      </View>
    );
  }

  private init(): void {
    const deviceID = DeviceInfo.getUniqueID();

    fetch(this.api + deviceID).then((res) => {
      if (res.status === 200) {
        res.json().then((user: User) => {
          this.initMessageManager(user);
          this.props.navigation.replace('Chat');
        });
      } else if (res.status === 404) {
        this.props.navigation.replace('Register');
      }
    });
  }

  private initMessageManager(user: User): void {
    const manager = MessageManager.getInstance();
    manager.setUser(user);
  }
}
