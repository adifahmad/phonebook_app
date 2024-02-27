import { View, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowDownAZ, faArrowUpZA, faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';


export default function SearchBar({setKeyword, setPage, setSortBy, setSortMode}){
    const navigation: any = useNavigation();
    const [isBoolean, setIsBoolean] = useState(true)

    const onSearch = (e : any) => {
        setKeyword(e)
        setPage(1)
    }
    
    const onSortAsc = () => {
        setIsBoolean(prevState => !prevState)
        setSortBy('name')
        setSortMode('asc')
        setPage(1)
    }

    const onSortDesc = () => {
        setIsBoolean(prevState => !prevState)
        setSortBy('name')
        setSortMode('desc')
        setPage(1)
    }
    
    return(
        <View style={styles.searchBar}>
            {isBoolean ? <TouchableOpacity
          style={styles.buttonSort}
          activeOpacity={0.5} onPress={onSortAsc}><FontAwesomeIcon icon={faArrowUpZA} size={25} style={styles.imgIcon} /></TouchableOpacity> : <TouchableOpacity
          style={styles.buttonSort}
          activeOpacity={0.5} onPress={onSortDesc}><FontAwesomeIcon icon={faArrowDownAZ} size={25} style={styles.imgIcon} /></TouchableOpacity>}
            <View style={styles.searchSection}>
            <FontAwesomeIcon style={styles.searchIcon}icon={faSearch}/>
            <TextInput style={styles.form} onChangeText={e => onSearch(e)}></TextInput>
            </View>
            <TouchableOpacity
          style={styles.buttonAdd}
          activeOpacity={0.5} onPress={() =>
            navigation.navigate("Add Form")
          }><FontAwesomeIcon icon={faUserPlus} size={25} style={styles.imgIcon}/></TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    imageSearch:{
        width:18,
        height:18
    },
    imgIcon:{
        marginTop: 10
    },
    image:{
        marginTop:8,
        width: 25,
        height: 25
    },
    buttonSort:{
        backgroundColor: '#B8860B',
        marginRight: 7,
        borderStyle: 'solid',
        borderRadius: 5,
        width: '12%',
        height: '100%',
        alignItems: 'center',
    },
    buttonAdd:{
        backgroundColor: '#B8860B',
        marginLeft: 7,
        borderStyle: 'solid',
        borderRadius: 5,
        width: '12%',
        height: '100%',
        alignItems: 'center',
    },
    searchBar: {
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center'
    },
    form: {
        padding: 7,
        backgroundColor: '#ffffff',
        width: '100%',
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        color: '#424242',
        fontSize: 15
      },
      searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 5,
        borderColor: '#000000'
    },
    searchIcon: {
        padding: 10,
        marginLeft: 4,
        marginRight: 5
    }
})