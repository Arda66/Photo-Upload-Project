import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainPage from './src/screens/MainPage';
import UploadPage from './src/screens/UploadPage';
import store from './src/redux/store';
import {Provider} from 'react-redux';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      {/* // I wrap the App with the Provider component and pass the store to it */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MainPage" component={MainPage} />
          <Stack.Screen name="UploadPage" component={UploadPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
