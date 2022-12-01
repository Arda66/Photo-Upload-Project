import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const SessionItem = ({item, index, navigation}) => {
  // I destructure the item, index and navigation props
  return (
    <View
      style={[
        styles.SessionContainer,
        {marginTop: item.id == 1 ? 30 : 10}, // conditional rendering for the first element in the array to add a top margin of 30 to it and 10 to the rest of them
      ]}
      key={index}>
      <View style={styles.SessionWrapper}>
        {/* // I use a View to wrap the session title and the session edit button */}
        <Text style={styles.SessionTitle}>
          Session {item.id} - {item.Date}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('UploadPage', {
              // I navigate to the UploadPage and pass the SessionID to it
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
