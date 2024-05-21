import { View, StyleSheet, Text } from "react-native";
import TodoList from "./TodoList";



export default function TodoBox({ route }) {
    const { pageParam = 1 } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.header}>PhoneBook app</Text>
            <TodoList pageParam={pageParam} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})