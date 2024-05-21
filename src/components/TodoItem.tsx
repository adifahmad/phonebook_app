import { View, StyleSheet, Text, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import { useDispatch } from 'react-redux'
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFloppyDisk, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from '@react-navigation/native';
import { removeUser } from '../actions/users'
import { updateUser } from '../actions/users'

const logoImg = require("../../assets/usertie.png")

export default function TodoItem({ todo }: { todo: { id: any, name: string, phone: string, avatar: any } }) {
    const navigation: any = useNavigation();

    const [userInput, setUserInput] = useState({
        name: todo.name, 
        phone: todo.phone
    })
    const [isEdit, setIsEdit] = useState(false)

    const dispatch : any = useDispatch()

    const submit = () => {
        Alert.alert(
          'Konfirmasi untuk hapus', 'Apakah anda yakin menghapus data ini?',
          [
            {
              text: 'Iya',
              onPress: () => dispatch(removeUser(todo.id))
            },
            {
              text: 'Tidak',
              onPress: () => navigation.navigate("Home")
            }
          ]
        );
      };

    if (isEdit) {
        return (
            <View style={styles.itemRow}>
                <View>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate("Avatar Form", {id: todo.id, name: todo.name, phone : todo.phone, avatar : todo.avatar})
                        }>
                        <Image
                            style={styles.imageAvatar}
                            source={todo.avatar == null ? logoImg : {uri :`http://192.168.1.42:3001/images/${todo.avatar}`}}
                        ></Image>
                    </TouchableOpacity>
                </View>
                <View>
                    <TextInput style={styles.form} defaultValue={userInput.name} onChangeText={(e) => setUserInput({...userInput, name: e})}></TextInput>
                    <TextInput style={styles.form} defaultValue={userInput.phone} onChangeText={(e) => setUserInput({...userInput, phone: e})}></TextInput>
                    <View style={styles.buttonStyle}>
                        <TouchableOpacity onPress={() => (dispatch(updateUser({ 
                                    id : todo.id,
                                    name : userInput.name,
                                    phone : userInput.phone,
                                })),
                                (setIsEdit(false)))}>
                            <FontAwesomeIcon icon={faFloppyDisk} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.itemRow}>
                <View>
                    <TouchableOpacity
                        onPress={() =>
                        navigation.navigate("Avatar Form" , {id: todo.id, name: todo.name, phone : todo.phone, avatar : todo.avatar})
                        }>
                        <Image
                            style={styles.imageAvatar}
                            source={todo.avatar == null ? logoImg : {uri :`http://192.168.1.42:3001/images/${todo.avatar}`}}
                        ></Image>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.name}>{todo.name}</Text>
                    <Text style={styles.phoneName}>{todo.phone}</Text>
                    <View style={styles.buttonStyle}>
                        <TouchableOpacity onPress={() => (setIsEdit(true))}>
                            <FontAwesomeIcon icon={faPenToSquare} style={styles.logoEdit} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={submit}>
                            <FontAwesomeIcon icon={faTrashCan} style={styles.logoDelete} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({

    itemRow: {
        flexDirection: 'row',
        margin: 5,
        padding: 5,
        width: '100%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        borderColor: '#000000',
        backgroundColor: '#DCDCDC',
        color: '#000000'
    },
    name: {
        color: "black",
        fontSize: 15,
        marginTop: 10
    },
    phoneName: {
        color: "black",
        fontSize: 17
    },
    buttonStyle: {
        flexDirection: 'row',
        textAlign: 'center',
        width: '100%',
        marginTop: 10
    },
    logoEdit: {
        alignSelf: 'flex-start',
        marginRight: 5,
        width: 20,
        height: 20
    },
    logoDelete: {
        width: 20,
        height: 20
    },
    imageAvatar: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        marginRight: 15
    },
    form: {
        padding : 10,
        backgroundColor: '#ffffff',
        width: 150,
        marginTop: 2,
        marginBottom: 2,
        height: 35,
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 5,
        borderColor: '#000000',
        color: "black",
        fontSize: 12
      }
})