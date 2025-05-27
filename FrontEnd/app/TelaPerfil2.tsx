import { PostProvider, usePost } from "@/PostContext";
import { View, Text, TouchableOpacity, FlatList, StyleSheet} from "react-native";
import PostItem from "@/components/Posts";

export default function TelaPerfil2(){

    const {posts} = usePost()

return(
  <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostItem item={item} />}
          contentContainerStyle={{ paddingTop: 80, paddingBottom: 100, alignItems: 'center' }}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyText}>Nenhum post encontrado.</Text>
            </View>
          }
        />
)
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

})