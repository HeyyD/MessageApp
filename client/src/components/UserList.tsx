import React from "react";
import { Component } from "react";
import { FlatList, Text } from "react-native";
import UserService from "../services/UserService";
import { User } from "../models/User";

interface Props {}
interface State {
  users: User[];
}
export default class UserList extends Component<Props, State> {

  private userService = UserService.instance;

  constructor(props: Props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount(): void {
    this.userService.users.subscribe((users) => {
      this.setState({users});
    });
  }

  render(): JSX.Element {
    return (
      <FlatList
      inverted={ true }
      data={ this.state.users }
      keyExtractor={ (item: User, index: number) => index.toString() }
      renderItem={ ({item}) => <Text>{ item.username }</Text>}
    />
    );
  }
}
