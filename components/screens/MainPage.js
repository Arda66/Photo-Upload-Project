import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const MainPage = ({navigation}) => {
  const CreateSession = () => {
    navigation.navigate('UploadPage');
  };

  return (
    <View style={styles.container}>
      <View style={styles.TopWrapper}>{/*  Sessions   */}</View>
      {/* Create Session Button */}
      <TouchableOpacity style={styles.Button} onPress={() => CreateSession()}>
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
    alignItems: 'center',
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
