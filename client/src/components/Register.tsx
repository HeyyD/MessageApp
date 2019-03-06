import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Button } from 'react-native';

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 10
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#eb6123'
  },
  insturctions: {
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 10
  },
  input: {
    backgroundColor: '#ebebeb',
    borderRadius: 20,
    padding: 10
  },
  button: {
    marginVertical: 10,
    alignSelf: 'center'
  }
});

export default class Register extends Component {
  render() {
    return(
      <View style={ styles.container }>
        <Text style={ styles.welcome }>Welcome!</Text>
        <Text style={ styles.insturctions }>You seem to be a new user. Please give us your name</Text>
        <TextInput
          style={ styles.input }
          placeholder='Username'
        />
        <View style={ styles.button }>
          <Button title='Register' onPress={ () => console.log('Button pressed') } color='#eb6123'/>
        </View>
      </View>
    );
  }
}
