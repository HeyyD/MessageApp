import React from "react";
import { Component } from "react";
import { FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import UserService from "../services/UserService";
import { User } from "../models/User";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Subscription } from "rxjs";
import { NavigationScreenProps } from "react-navigation";

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  buttonText: {
    flexGrow: 1,
    fontSize: 20,
    paddingLeft: 20,
    alignSelf: 'center',
  },
});

interface Props extends NavigationScreenProps {}
interface State {
  users: User[];
}
export default class UserList extends Component<Props, State> {

  private userService = UserService.instance;
  private usersSubscription?: Subscription;

  constructor(props: Props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount(): void {
    this.usersSubscription = this.userService.users.subscribe((data) => {
      const users = data.filter((user) => user.deviceID !== this.userService.user.deviceID);
      this.setState({users});
    });
  }

  componentWillUnmount(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }

  render(): JSX.Element {
    return (
      <FlatList
      data={ this.state.users }
      keyExtractor={ (item: User, index: number) => index.toString() }
      renderItem={ ({item}) => this.userListItem(item)}
    />
    );
  }

  private userListItem(user: User): JSX.Element {
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity onPress={() => navigate('ChatScreen', { receiver: user })} style={styles.button}>
        <Icon name='user' size={40} color={'#ffA500'} />
        <Text style={ styles.buttonText }>{ user.username }</Text>
      </TouchableOpacity>
    );
  }
}
