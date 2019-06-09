import React, { Component } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import MessageService from '../services/MessageService';
import { User } from '../models/User';

import * as variables from '../../variables.json';
import UserService from '../services/UserService';

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

  private api: string = `http://${variables.server}/api/users/`;

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
          this.initUserService(user);
          this.props.navigation.replace('UserList');
        });
      } else if (res.status === 404) {
        this.props.navigation.replace('Register');
      }
    });
  }

  private initUserService(user: User): void {
    UserService.instance.user = user;
  }
}
