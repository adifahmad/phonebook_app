import { FlatList, View, StyleSheet, Text } from "react-native";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadUser } from "../actions/users";
import SearchBar from "./SearchBar";

export default function TodoList({ pageParam }) {

  const todos = useSelector((state: any) => state.users)
  const [sortMode, setSortMode] = useState('asc')
  const [sortBy, setSortBy] = useState('name')
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(pageParam)
  const dispatch: any = useDispatch()

  const handleScroll = () => {
    if (todos.page >= todos.pages) {
      return
    }
    setPage(page + 1);
  };


  useEffect(() => {
    dispatch(loadUser({ keyword, sortMode, sortBy, page, limit: 10 }))
  }, [dispatch, keyword, sortMode, sortBy, page]) // componentDidUpdate

  return (
    <View style={styles.list}>
      <SearchBar setKeyword={setKeyword} setPage={setPage} setSortBy={setSortBy} setSortMode={setSortMode} sortMode={sortMode} />
      <FlatList
        data={todos.phonebooks}
        renderItem={({ item }: { item: any }) => (<TodoItem todo={item} />)}
        keyExtractor={item => item.id}
        onEndReached={handleScroll}
        onEndReachedThreshold={0.3}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 10
  }
})