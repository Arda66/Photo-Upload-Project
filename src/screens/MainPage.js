import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {CreateSession} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainPage = ({navigation}) => {
  const dispatch = useDispatch();
  const {Sessions} = useSelector(state => state.reducer);

  useEffect(() => {
    AsyncStorage.getItem('Sessions').then(data => {
      data && dispatch({type: 'SET_SESSIONS', payload: JSON.parse(data)});
    });
  }, []);

  const CreateNewSession = () => {
    dispatch(CreateSession());
    AsyncStorage.setItem('Sessions', JSON.stringify(Sessions));
    navigation.navigate('UploadPage', {
      SessionID: Sessions.length + 1,
    });
  };

  const renderSessionItem = ({item, index}) => {
    return (
      <View
        style={[
          styles.SessionContainer,
          {marginTop: item.id == 1 ? 30 : 10}, //conditional rendering for the first element
        ]}
        key={index}>
        <View style={styles.SessionWrapper}>
          <Text style={styles.SessionTitle}>
            Session {item.id} - {item.Date}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UploadPage', {
                SessionID: index + 1,
              })
            }>
            <EntypoIcon name="edit" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
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
  SessionContainer: {
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: 'black',
  },
  SessionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  SessionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    padding: 13,
    right: 20,
  },
});
