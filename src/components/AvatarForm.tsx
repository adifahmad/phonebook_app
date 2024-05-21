import { Button, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { updateAvatar } from '../actions/users'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useRoute } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCamera, faImage } from '@fortawesome/free-solid-svg-icons'
const logoImg = require("../../assets/usertie.png")

const imgDir = FileSystem.documentDirectory + 'images/';


export default function AvatarForm() {
    const store: any = useRoute();
    const user = store.params;
    const dispatch: any = useDispatch()
    const navigation: any = useNavigation()
    const [avatar, setUpdateAvatar] = useState(true)
    const [file, setFile]: [any, any] = useState<any>(null);

    const upload = () => {
        const formData : any = new FormData();
        formData.append('avatar', {
            name: file.assets[0].fileName,
            size: file.assets[0].filesize,
            type: file.assets[0].mimeType,
            uri: file.assets[0].uri
          });
        dispatch(updateAvatar({ id: user.id, name : user.name, phone : user.phone, avatar: formData }));
        navigation.goBack();
    };

    const onButtonPress = useCallback(
        async (type: 'capture' | 'library', options: any) => {
          try {
            let data: any;
            if (type === 'capture') {
              data = await ImagePicker.launchCameraAsync(options);
            } else {
              data = await ImagePicker.launchImageLibraryAsync(options);
              console.log(data)
            }
            if (!data?.didCancel) {
              setFile(data);
              setUpdateAvatar(false);
            }
          } catch (error) {
            console.error('Error selecting image:', error); // Handle error appropriately
          }
        },
        [setFile]
      );
      


    return (
        <View>
            <View>
                <View style={styles.avatarForm}>
                    <Text style={styles.textAvatar}>Pilih Avatar</Text>
                    <View>
                        {avatar && (<Image style={styles.imgAvatar} source={{
                            uri: `http://192.168.1.42:3001/images/${user.avatar ? user.avatar : 'usertie.png'}`
                        }} />)}
                        {file?.assets && (
                            <Image style={styles.imgAvatar} source={{ uri: file?.assets[0].uri }} />
                        )}
                        <View style={styles.viewButton}>
                        <TouchableOpacity style={styles.buttonPhoto} onPress={() =>
                            onButtonPress('capture', {
                                selectionLimit: 1,
                                mediaType: 'photo',
                                includeBase64: false
                            })
                        } ><FontAwesomeIcon  style={styles.imgIcon} icon={faCamera} size={80} /><Text style={styles.textImage}>Take a Photo</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAvatar} onPress={() =>
                            onButtonPress('library', {
                                selectionLimit: 1,
                                mediaType: 'photo',
                                includeBase64: false
                            })
                        } ><FontAwesomeIcon style={styles.imgIcon} icon={faImage} size={80}/><Text style={styles.textImage}>Select from Galery</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.buttonSave} onPress={upload}>
                        <Text style={styles.textButton}> Save </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    textAvatar:{
        fontSize: 20,
    },

    avatarForm: {
        alignItems: 'center',
        marginTop: 50,
        flexDirection: 'column'
    },
    buttonSave: {
        marginTop: 50,
        marginLeft: 5,
        backgroundColor: '#B8860B',
        width: '97%',
        height: 40,
        borderStyle: 'solid',
        borderRadius: 5,
        borderColor: '#000000',
        borderWidth: 1

    },
    textButton: {
        textAlign: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 7
    },
    imgAvatar: {
        width: 350,
        height: 350,
        resizeMode: 'center',
    },
    buttonPhoto: {
        marginRight: 30,
        backgroundColor: '#87CEEB',
        width: 150,
        height: 150,
        borderStyle: 'solid',
        borderRadius: 5,
        borderColor: '#000000',
        borderWidth: 1,
        alignItems: 'center' 
    },
    buttonAvatar:{
        marginTop: 4,
        marginLeft: 30,
        backgroundColor: '#87CEEB',
        width: 150,
        height: 150,
        borderStyle: 'solid',
        borderRadius: 5,
        borderColor: '#000000',
        borderWidth: 1,
        alignItems: 'center'
    },
    viewButton : {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection : 'row'
    },
    imgIcon:{
        marginTop: 10
    },
    textImage:{
        fontSize : 20,
        fontWeight : 'bold',
        textAlign : 'center'
    }
})