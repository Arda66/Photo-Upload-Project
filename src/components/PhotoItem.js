import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PhotoItem = ({item, DeletePhoto}) => {
  return (
    <View style={styles.PhotoContainer}>
      <ImageBackground source={{uri: item}} style={styles.Photo}>
        <TouchableOpacity
          style={styles.DeleteButton}
          onPress={() => DeletePhoto(item)}>
          <MaterialIcons name="cancel" size={30} color="red" />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default PhotoItem;

const styles = StyleSheet.create({
  DeleteButton: {
    position: 'absolute',
    top: -10,
    left: -10,
  },
  PhotoContainer: {
    marginHorizontal: 10,
    paddingTop: 25,
    flexDirection: 'row',
  },
  Photo: {
    height: 200,
    width: 200,
    borderRadius: 10,
  },
});
