import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Button } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#eb6123',
  },
  insturctions: {
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#ebebeb',
    borderRadius: 20,
    padding: 10,
  },
  button: {
    marginVertical: 10,
    alignSelf: 'center',
  },
});

interface Props extends NavigationScreenProps {}
interface State {
  username: string;
}

export default class Register extends Component<Props, State> {

  private api: string = 'http://192.168.1.31:8080/api/users/';

  constructor(props: Props) {
    super(props);
    this.register = this.register.bind(this);
    this.state = {
      username: '',
    };
  }

  register(): void {
    const id = DeviceInfo.getUniqueID();
    fetch(this.api, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        deviceID: id,
      }),
    }).then((res) => {
      if (res.status === 200) {
        this.props.navigation.replace('LoadingScreen');
      }
    });
  }

  render(): JSX.Element {
    return(
      <View style={ styles.container }>
        <Text style={ styles.welcome }>Welcome!</Text>
        <Text style={ styles.insturctions }>You seem to be a new user. Please give us your name</Text>
        <TextInput
          style={ styles.input }
          placeholder='Username'
          value={ this.state.username }
          onChangeText={ (text: string) => this.setState({username: text}) }
        />
        <View style={ styles.button }>
          <Button
            title='Register'
            color='#eb6123'
            disabled={ !(this.state.username.length > 0) }
            onPress={ () => this.register() }
          />
        </View>
      </View>
    );
  }
}
