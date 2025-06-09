import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Linking, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../lib/ThemeContext';

const AvatarImage = require('@/assets/images/icon.png');

interface Author {
  name: string;
  bio: string;
  image: any;
  portfolio: string;
  moreInfo: string;
}

const authors: Author[] = [
  {
    name: 'Michał Faber',
    bio: 'WSEI student and developer.',
    image: AvatarImage,
    portfolio: 'https://github.com/Kiryometsy',
    moreInfo: 'Github',
  },
  {
    name: 'Radosław Babiński',
    bio: 'WSEI student and developer.',
    image: AvatarImage,
    portfolio: 'https://github.com/Rbabinski2000',
    moreInfo: 'Github',
  },
];

const AuthorsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  const openModal = (author: Author) => {
    setSelectedAuthor(author);
    setModalVisible(true);
  };

  const openPortfolio = (url: string) => {
    Linking.openURL(url);
  };

  const { theme } = useTheme();

  const backgroundColor   = theme === 'light'? '#f0f0f0':'#121212'
  const textColor         = theme === 'light'? '#000':'#fff'
  const mutedTextColor    = theme === 'light'? '#666':'#ccc'
  const cardColor         = theme === 'light'? '#fff':'#1e1e1e'
  const modalBackground   = theme === 'light'? '#fff':'#2c2c2c'

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor,
    },
    scrollContent: {
      padding: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 20,
      color: textColor,
    },
    card: {
      backgroundColor: cardColor,
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
      width: '100%',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 5,
      marginBottom: 12,
    },
    name: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 6,
      color: textColor,
    },
    bio: {
      fontSize: 14,
      color: mutedTextColor,
      textAlign: 'center',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: modalBackground,
      borderRadius: 12,
      padding: 20,
      width: '80%',
      alignItems: 'center',
      overflow: 'hidden',
    },
    modalName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 12,
      color: textColor,
    },
    modalBio: {
      fontSize: 16,
      color: mutedTextColor,
      marginBottom: 20,
      textAlign: 'center',
    },
    modalButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 25,
      borderRadius: 8,
      marginBottom: 10,
      elevation: 0,
      shadowOpacity: 0,
    },
    modalButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    modalCloseButton: {
      paddingVertical: 6,
      paddingHorizontal: 20,
    },
    closeText: {
      fontWeight: 'bold',
      color: textColor,
    },
  });
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Meet the Authors</Text>
        {authors.map((author, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => openModal(author)}
          >
            <Image source={author.image} style={styles.avatar} />
            <Text style={styles.name}>{author.name}</Text>
            <Text style={styles.bio}>{author.bio}</Text>
          </TouchableOpacity>
        ))}

        {selectedAuthor && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalName}>{selectedAuthor.name}</Text>
                <Text style={styles.modalBio}>{selectedAuthor.moreInfo}</Text>
                <TouchableOpacity
                  onPress={() => openPortfolio(selectedAuthor.portfolio)}
                  style={styles.modalButton}
                  activeOpacity={0.8} // Reduce flicker on press
                >
                  <FontAwesome
                    name="github"
                    size={20}
                    color="#fff"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.modalButtonText}>View Portfolio</Text>
                </TouchableOpacity>
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={styles.modalCloseButton}
                >
                  <Text style={styles.closeText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContent: {
//     padding: 20,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 20,
//     width: '100%',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 5,
//     marginBottom: 12,
//   },
//   name: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginBottom: 6,
//   },
//   bio: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: '#fff',  // Important to avoid flicker
//     borderRadius: 12,
//     padding: 20,
//     width: '80%',
//     alignItems: 'center',
//     overflow: 'hidden',
//   },
//   modalName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 12,
//   },
//   modalBio: {
//     fontSize: 16,
//     color: '#444',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   modalButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#007bff',
//     paddingVertical: 10,
//     paddingHorizontal: 25,
//     borderRadius: 8,
//     marginBottom: 10,
//     elevation: 0,      // Remove Android shadow to avoid flicker
//     shadowOpacity: 0,  // Remove iOS shadow to avoid flicker
//   },
//   modalButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   modalCloseButton: {
//     paddingVertical: 6,
//     paddingHorizontal: 20,
//   },
// });

export default AuthorsScreen;
