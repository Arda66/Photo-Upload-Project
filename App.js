import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainPage from './components/screens/MainPage';
import UploadPage from './components/screens/UploadPage';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="MainPage"
          component={MainPage}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="UploadPage"
          component={UploadPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
