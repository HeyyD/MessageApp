import React, { Component } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';
import { NavigationScreenProps, NavigationScreenProp } from 'react-navigation';

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 10
  }
})

interface Props extends NavigationScreenProps {}

export default class LoadingScreen extends Component<Props> {

  componentDidMount() {
    this.init();
  }

  async init(): Promise<void> {
    try {
      const user = await AsyncStorage.getItem('USER');
      if (user !== null) {
        console.log('user found');
      } else {
        console.log('user not found')
        // this.props.navigation.navigate('Register');
        setTimeout(() => {
          this.props.navigation.replace('Register');
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={ styles.text }>Just a moment...</Text>
        <ActivityIndicator size='large' color='#eb6123' />
      </View>
    );
  }
}
