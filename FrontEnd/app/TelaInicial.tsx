import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { usePost } from '@/PostContext';
import PostItem from '@/components/Posts'; 
import Header from '@/components/Header';

export default function TelaInicial() {
  const { posts } = usePost();

  return (
    <View style={styles.container}>
        <Header/>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostItem item={item} />}
        contentContainerStyle={{ paddingTop: 80, paddingBottom: 100, alignItems: "center"}}  
      />
    </View>
  );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
emptyListContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  },
emptyText: {
    fontSize: 16,
    color: 'gray',
  }
});