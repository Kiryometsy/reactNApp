import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
//import PostItImage from "@/assets/images/post-it.png"
import { useRouter } from "expo-router";

const PostItImage= require('@/assets/images/post-it.png');

const HomeScreen = () => {
  const router = useRouter();
  return (
    <View
      style={ styles.container}
    >
      <Image source={ PostItImage } style={styles.image}/>
      <Text style={styles.title}>Welcome To ReactNApp</Text>
      <Text style={styles.subtitle}>Your notes</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push("/notes")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push("/authors")}
      >
        <Text style={styles.buttonText}>Authors</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa'
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
  backgroundColor: '#007bff',
  paddingVertical: 12,
  paddingHorizontal: 25,
  borderRadius: 8,
  alignItems: 'center',
  width: 200, // <- fixed width ensures consistency
  marginVertical: 8, // optional: add spacing between buttons
},

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;