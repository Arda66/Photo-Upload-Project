import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {CreateSession} from '../redux/actions/actions';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SessionItem from '../components/SessionItem';

const MainPage = ({navigation}) => {
  // I use destructuring to get the navigation prop
  const dispatch = useDispatch();
  const {Sessions} = useSelector(state => state.reducer);

  useEffect(() => {
    InitializeSession(); // I use useEffect to get the Sessions from the AsyncStorage and save it to the InitialState
  }, []);

  const InitializeSession = () => {
    AsyncStorage.getItem('Sessions').then(data => {
      data && dispatch({type: 'SET_SESSIONS', payload: JSON.parse(data)}); // set the Sessions to the InitialState
    });
  };

  const CreateNewSession = () => {
    dispatch(CreateSession());
    AsyncStorage.setItem('Sessions', JSON.stringify(Sessions));
    navigation.navigate('UploadPage', {
      SessionID: Sessions.length + 1, // I pass the SessionID to the UploadPage
    });
  };

  const renderSessionItem = ({item, index}) => {
    return <SessionItem item={item} index={index} navigation={navigation} />; // I pass the item, index and navigation props to the SessionItem component
  };

  const renderEmptyList = () => {
    return <Text style={styles.Title}>No Session Yet</Text>; // I render this text if the Sessions array is empty
  };

  return (
    <View style={styles.container}>
      <View style={styles.TopWrapper}>
        {/*  Sessions   */}
        <FlatList
          contentContainerStyle={
            Sessions.length == 0 && {flexGrow: 1, justifyContent: 'center'} // I use conditional rendering to center the empty list text if the Sessions array is empty
          }
          data={Sessions}
          renderItem={renderSessionItem}
          keyExtractor={(item, index) => index.toString()} // I use the index as the key
          ListEmptyComponent={renderEmptyList}
        />
      </View>
      {/* Create Session Button */}
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          CreateNewSession();
        }}>
        <AntDesignIcon name="addfolder" size={25} color="black" />
        <Text style={styles.ButtonText}>Create Session</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  TopWrapper: {
    flex: 1,
  },
  Title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  Button: {
    alignSelf: 'center',
    width: '50%',
    borderWidth: 1.2,
    paddingVertical: 10,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 30,
  },
  ButtonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});
