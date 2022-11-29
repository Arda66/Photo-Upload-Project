import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const UploadPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.Title}>Uploaded Documents</Text>

      {/* Uploaded Photos */}

      {/* Add Photo Button */}
      <TouchableOpacity style={styles.Button}>
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
            marginTop: 70,
            justifyContent: 'space-around',
            height: 50,
          },
        ]}>
        <MaterialIcons name="check" size={25} color="black" />
        <Text style={styles.ButtonText}>Complete Session</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
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
  },
  ButtonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 15,
  },
});
