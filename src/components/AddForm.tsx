import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { addUser } from '../actions/users'

export default function Add() {
    const dispatch: any = useDispatch()
    const navigation: any = useNavigation()

    const [user, setUser] = useState({ id: new Date(Date.now()).getMilliseconds(), name: '', phone: '' })

    const AddData = (e) => {
        dispatch(addUser(user))
        navigation.navigate("Home", { pageParam: 1 })
    }

    return (
        <View>
            <View style={styles.addForm}>
                <TextInput placeholder="name" style={styles.inputName} onChangeText={(e) => setUser({ ...user, name: e })}></TextInput>
                <TextInput placeholder="phone" style={styles.inputPhone} onChangeText={(e) => setUser({ ...user, phone: e })}></TextInput>
            </View>
            <View style={styles.buttonItem}>
                <TouchableOpacity style={styles.saveButton} onPress={AddData}><Text style={styles.textButton}>Save</Text></TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate("Home")}><Text style={styles.textButton}>Cancel</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    addForm: {
        alignItems: 'center'
    },
    buttonItem: {
        flexDirection: 'row'
    },
    inputName: {
        marginTop: 30,
        padding: 7,
        backgroundColor: '#ffffff',
        width: '99%',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 5,
        borderColor: '#000000'
    },
    inputPhone: {
        marginTop: 15,
        marginBottom: 30,
        padding: 7,
        backgroundColor: '#ffffff',
        width: '99%',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 5,
        borderColor: '#000000'
    },
    saveButton: {
        marginTop: 10,
        marginLeft: 5,
        backgroundColor: '#B8860B',
        width: '45%',
        height: 40,
        borderStyle: 'solid',
        borderRadius: 5,
        borderColor: '#000000',
        borderWidth: 1
    },
    cancelButton: {
        marginTop: 10,
        backgroundColor: '#B8860B',
        width: '45%',
        height: 40,
        borderStyle: 'solid',
        borderRadius: 5,
        borderWidth: 1,
        marginLeft: 25
    },
    textButton: {
        textAlign: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 7
    }
})
