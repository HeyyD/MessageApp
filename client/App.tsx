import { createStackNavigator, createAppContainer } from 'react-navigation';
import ChatScreen from './src/components/ChatScreen';
import Register from './src/components/Register';
import LoadingScreen from './src/components/LoadingScreen';

const MainNavigation = createStackNavigator({
  LoadingScreen: { screen: LoadingScreen },
  Chat: { screen: ChatScreen },
  Register: { screen: Register }
}, {
  headerMode: 'none'
});

const App = createAppContainer(MainNavigation);
export default App;
