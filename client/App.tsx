import { createAppContainer, createStackNavigator } from 'react-navigation';
import ChatScreen from './src/components/ChatScreen';
import LoadingScreen from './src/components/LoadingScreen';
import Register from './src/components/Register';
import UserList from './src/components/UserList';

const MainNavigation = createStackNavigator({
  LoadingScreen: { screen: LoadingScreen },
  Chat: { screen: ChatScreen },
  UserList: { screen: UserList },
  Register: { screen: Register },
}, {
  headerMode: 'none',
});

const App = createAppContainer(MainNavigation);
export default App;
