import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const SessionItem = ({item, index, navigation}) => {
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

export default SessionItem;

const styles = StyleSheet.create({
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
    padding: 10,
    right: 20,
  },
});
