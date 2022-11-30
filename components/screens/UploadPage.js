import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AddPhoto, DeletePhoto} from '../../redux/actions';
import {launchCamera} from 'react-native-image-picker';

import {useDispatch, useSelector} from 'react-redux';
const UploadPage = ({navigation, route}) => {
  const SessionID = route?.params?.SessionID;
  const dispatch = useDispatch();
  const {Sessions} = useSelector(state => state.reducer);

  const AddPhotoToSession = async () => {
    let path = null;
    // create a variable to store the options
    let options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 200,
      maxWidth: 200,
      // saveToPhotos: true,
    };
    const result = await launchCamera(options);
    if (result.didCancel) console.log('User cancelled camera picker');
    else if (result.errorCode)
      console.log('Camera picker error: ', result.errorMessage);
    else {
      path = result.assets[0].uri;
      dispatch(AddPhoto(path, SessionID));
    }
  };

  const DeletePhotoFromSession = path => {
    dispatch(DeletePhoto(path, SessionID));
  };

  return (
    <View style={styles.container}>
      <View style={styles.TopWrapper}>
        {/* Title */}
        <Text style={styles.Title}>Uploaded Documents</Text>
        {/* Uploaded Photos */}
      </View>
      <View style={styles.BottomWrapper}>
        {/* Add Photo Button */}
        <TouchableOpacity
          onPress={() => AddPhotoToSession()}
          style={styles.Button}>
          <MaterialIcons name="add-a-photo" size={25} color="black" />
          <Text style={styles.ButtonText}>Add Photo</Text>
        </TouchableOpacity>
        {/* Complete Session Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('MainPage')}
          style={[
            styles.Button,
            {
              width: '50%',
              marginVertical: 30,
              justifyContent: 'space-between',
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
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    paddingHorizontal: 15,
  },
});
