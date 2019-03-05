import { createStackNavigator, createAppContainer } from 'react-navigation';
import ChatScreen from './src/components/ChatScreen';
import Register from './src/components/Register';

const MainNavigation = createStackNavigator({
  Chat: { screen: ChatScreen },
  Register: { screen: Register }
});

const App = createAppContainer(MainNavigation);
export default App;
