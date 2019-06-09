import React from "react";
import { Component } from "react";
import { FlatList, Text } from "react-native";
import UserService from "../services/UserService";

export default class UserList extends Component {

  private userService = UserService.instance;

  render(): JSX.Element {
    return <Text>Working</Text>;
  }
}
