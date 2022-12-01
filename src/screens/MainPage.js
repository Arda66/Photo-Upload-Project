import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {CreateSession} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SessionItem from '../components/SessionItem';

const MainPage = ({navigation}) => {
  const dispatch = useDispatch();
  const {Sessions} = useSelector(state => state.reducer);

  useEffect(() => {
    InitializeSession();
  }, []);

  const InitializeSession = () => {
    AsyncStorage.getItem('Sessions').then(data => {
      data && dispatch({type: 'SET_SESSIONS', payload: JSON.parse(data)});
    });
  };

  const CreateNewSession = () => {
    dispatch(CreateSession());
    AsyncStorage.setItem('Sessions', JSON.stringify(Sessions));
    navigation.navigate('UploadPage', {
      SessionID: Sessions.length + 1,
    });
  };

  const renderSessionItem = ({item, index}) => {
    return <SessionItem item={item} index={index} navigation={navigation} />;
  };

  const renderEmptyList = () => {
    return <Text style={styles.Title}>No Session Yet</Text>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.TopWrapper}>
        {/*  Sessions   */}
        <FlatList
          contentContainerStyle={
            // center the empty list with conditional rendering
            Sessions.length == 0 && {flexGrow: 1, justifyContent: 'center'}
          }
          data={Sessions}
          renderItem={renderSessionItem}
          keyExtractor={(item, index) => index.toString()}
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
