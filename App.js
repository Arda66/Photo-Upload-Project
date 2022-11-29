import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainPage from './components/screens/MainPage';
import UploadPage from './components/screens/UploadPage';
import store from './redux/store';
import {Provider} from 'react-redux';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            // options={{headerShown: false}}
            name="MainPage"
            component={MainPage}
          />
          <Stack.Screen
            // options={{headerShown: false}}
            name="UploadPage"
            component={UploadPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
