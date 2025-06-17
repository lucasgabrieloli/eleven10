import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useRef, useEffect } from "react";
import { Video, ResizeMode, type Video as VideoType } from "expo-av";
import { Post } from "@/PostContext";
import { useRouter } from "expo-router";


type PostItemProps = {
  item: Post;
};

function PostItem({ item } : PostItemProps){
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const router = useRouter();
  const videoRef = useRef<VideoType>(null);

  useEffect(() => {
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.setStatusAsync({
        shouldPlay: true,
        isMuted: true,
        isLooping: true
      });
    }
  }, [item.uri]);

  function toggleLike() {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  }

  const resultadoLikes = item.likes + likesCount;

  return(
    <View style={styles.post}>
      {/* Perfil */}
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.botaoperfil} onPress={()=>router.push('/TelaPerfil2')}>
          <Image source={{ uri: item.userProfilePicture }} style={styles.profileImage} />
          <Text style={styles.profileName}>{item.userName || "Usuário"}</Text>
        </TouchableOpacity>
      </View>

      {/* Mídia */}
      {item.type === "image" ? (
        <Image source={{ uri: item.uri }} style={styles.media} />
      ) : (
        <Video
          ref={videoRef}
          source={{ uri: item.uri }}
          style={styles.media}
          resizeMode={ResizeMode.CONTAIN}
        />
      )}

      {/* Legenda */}
      <Text style={styles.caption}>{item.legenda}</Text>

      <View style={styles.likecoment}>
        {/* Botão Like */}
        <TouchableOpacity onPress={toggleLike} style={styles.likeButton}>
          <Image
            source={liked
              ? require('../assets/images/likeimg_ativado.png')
              : require('../assets/images/likeimg.png')}
            style={styles.likeimg}
          />
          <Text style={{ color: liked ? "#3db342" : "gray", fontSize: 12 }}>{resultadoLikes}</Text>
        </TouchableOpacity>

        <View style={styles.linha}></View>

        {/* Botão Comentário */}
        <TouchableOpacity style={styles.likeButton}>
          <Image
            source={require('../assets/images/comentimg.png')}
            style={styles.likeimg}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 10,
    height: 350,
    width: 300,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  botaoperfil:{
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  profileName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  media: {
    width: "100%",
    height: 200,
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: '#000'
  },
  caption: {
    marginBottom: 8,
    alignSelf: "center"
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "center"
  },
  likeimg: {
    width: 20,
    height: 20,
  },
  likecoment:{
    flexDirection: "row",
    alignItems: "center",
    alignSelf:"center",
    gap: 50,
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    padding: 13,
    backgroundColor: "white",
  },
  linha:{
    height: "100%",
    width: 1,
    backgroundColor: "#a9a9a9",
    marginLeft: -25
  }
});

export default PostItem;