import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {CreateSession, AddPhoto, DeletePhoto} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';

const MainPage = ({navigation}) => {
  const dispatch = useDispatch();
  const {Sessions} = useSelector(state => state.reducer);
  console.log(Sessions);

  return (
    <View style={styles.container}>
      <View style={styles.TopWrapper}>
        {/*  Sessions   */}
        {Sessions.length > 0 ? (
          Sessions.map((item, index) => {
            return (
              <View
                style={[
                  styles.SessionContainer,
                  {marginTop: item.id == 1 ? 30 : 0}, //conditional rendering for the first element
                ]}
                key={index}>
                <Text style={styles.SessionTitle}>
                  Session {item.id} - {item.Date}
                </Text>
              </View>
            );
          })
        ) : (
          // No Sessions
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.Title}>No session yet</Text>
          </View>
        )}
      </View>
      {/* Create Session Button */}
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          dispatch(CreateSession()), navigation.navigate('UploadPage');
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
  SessionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    padding: 13,
  },
});
