import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AddPhoto, DeletePhoto, DeleteSession} from '../redux/actions/actions';
import {launchCamera} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import PhotoItem from '../components/PhotoItem';

const UploadPage = ({navigation, route}) => {
  const SessionID = route?.params?.SessionID;
  const dispatch = useDispatch();
  const {Sessions} = useSelector(state => state.reducer);

  const AddPhotoToSession = async () => {
    let path = null;
    // create a variable to store the options
    let options = {
      mediaType: 'photo',
      maxHeight: 200,
      maxWidth: 200,
      saveToPhotos: true,
      Quality: 1,
    };
    const result = await launchCamera(options);
    if (result.didCancel) console.log('User cancelled camera picker');
    else if (result.errorCode)
      alert('Camera picker error: ', result.errorMessage);
    else {
      path = result.assets[0].uri;
      dispatch(AddPhoto(path, SessionID));
      AsyncStorage.setItem('Sessions', JSON.stringify(Sessions));
    }
  };

  const DeletePhotoFromSession = path => {
    Alert.alert(
      'Delete Photo',
      'Are you sure you want to delete this photo ?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            dispatch(DeletePhoto(path, SessionID));
            ToastAndroid.show('Photo Deleted', ToastAndroid.SHORT);
            AsyncStorage.setItem('Sessions', JSON.stringify(Sessions));
          },
        },
      ],
      {cancelable: false},
    );
  };

  const renderPhotoItem = ({item}) => {
    return <PhotoItem item={item} DeletePhoto={DeletePhotoFromSession} />;
  };
  const CompleteSession = () => {
    AsyncStorage.setItem('Sessions', JSON.stringify(Sessions));
    navigation.navigate('MainPage');
  };
  const DeleteSessionFromList = () => {
    Alert.alert(
      'Delete Session',
      'Are you sure you want to delete this session ?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            dispatch(DeleteSession(SessionID));
            ToastAndroid.show(
              `Session ${SessionID} Deleted`,
              ToastAndroid.SHORT,
            );
            AsyncStorage.setItem('Sessions', JSON.stringify(Sessions));
            navigation.navigate('MainPage');
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.TopWrapper}>
        {/* Title */}
        <Text style={styles.Title}>Uploaded Documents</Text>
        <View style={styles.FlatListWrapper}>
          {/* Uploaded Photos */}
          <FlatList
            data={Sessions[SessionID - 1]?.Photos}
            renderItem={renderPhotoItem}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.EmptyFlatListText}>
                No photos uploaded yet
              </Text>
            }
          />
        </View>
      </View>
      <View style={styles.BottomWrapper}>
        {/* Add Photo Button */}
        <TouchableOpacity
          onPress={() => AddPhotoToSession()}
          style={styles.Button}>
          <MaterialIcons name="add-a-photo" size={25} color="black" />
          <Text style={styles.ButtonText}>Add Photo</Text>
        </TouchableOpacity>
        {/* Complete/Delete Session Button */}
        <View style={styles.ButtonWrapper}>
          <TouchableOpacity
            onPress={() => DeleteSessionFromList()}
            style={[
              styles.Button,
              {
                width: '45%',
                justifyContent: 'space-around',
                height: 50,
              },
            ]}>
            <MaterialIcons
              style={{left: 5}}
              name="cancel"
              size={25}
              color="black"
            />
            <Text style={styles.ButtonText}>Delete Session</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => CompleteSession()}
            style={[
              styles.Button,
              {
                width: '45%',
                justifyContent: 'space-around',
                height: 50,
              },
            ]}>
            <MaterialIcons
              style={{left: 3}}
              name="check"
              size={25}
              color="black"
            />
            <Text style={styles.ButtonText}>Complete Session</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UploadPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  TopWrapper: {},
  BottomWrapper: {},
  Title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: 'black',
  },
  Button: {
    alignSelf: 'center',
    height: 150,
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 20,
  },
  ButtonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  FlatListWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  EmptyFlatListText: {
    flex: 1,
    marginTop: 40,
    fontSize: 25,
    color: 'red',
    fontWeight: 'bold',
  },
  ButtonWrapper: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
