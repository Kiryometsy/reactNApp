import AddNoteModal from "@/app/components/AddNoteModal";
import EditNoteModal from "@/app/components/EditNoteModal";
import NoteList from "@/app/components/noteList";
import useDbService from "@/app/lib/db";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { Note } from "../components/noteItem";
import { useTheme } from "../lib/ThemeContext";




const NoteScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState("");

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [noteEdit,setNoteEdit]=useState<Note>({id:0,noteId:"",text:""});

  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const noteService = useDbService();

  const { theme } = useTheme();
  // dynamic colors based on theme
  const bgColor    = theme === "light" ? "#fff"     : "#121212";
  const textColor  = theme === "light" ? "#333"     : "#ddd";
  const fabColor   = theme === "light" ? "#007bff"  : "#1e90ff";
  const accent     = theme === "light" ? "#007bff"  : "#1e90ff";

  useFocusEffect(
    useCallback(() => {
      const init = async () => {
        await noteService.initTable();
        getList();
      };
      init();
    }, [])
  );

  async function getList() {
    setLoading(true);
    const list = await noteService.getNoteList();
    setNotes(list);
    setLoading(false);
  }

  async function addNote() {
    if (newNote.trim() === "") return;
    const id = Date.now().toString();
    await noteService.addNoteToTable(id, newNote);
    setNewNote("");
    setModalVisible(false);
    getList();
  }

  async function deleteNote(id: number) {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await noteService.deleteNote(id);
          setNotes((notes) => notes.filter((note) => note.id !== id));
        },
      },
    ]);
  }

  async function editNote(id: number, editedText: string) {
    if (!editedText.trim()) {
      Alert.alert("Error", "Note text cannot be empty");
      return;
    }

    await noteService.editNote(id, editedText);
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, text: editedText } : note
      )
    );
    setNoteEdit({id:0,noteId:"",text:""});
    setEditModalVisible(false);
    getList();
  }
  function handleModalEdit(id:number,text:string){
    //console.log(editNote)
    setNoteEdit({id:id,noteId:"",text:text})
  }
  return (
    <View
       style={[styles.container, { backgroundColor: bgColor }]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : notes.length === 0 ? (
            <Text style={[styles.noNotesText, { color: textColor }]}>You have no notes</Text>
          ) : (
            <NoteList
              notes={notes}
              onDelete={deleteNote}
              onEdit={handleModalEdit}
              setModalVisible={setEditModalVisible}
            />
          )}

          {/* Always show Add Note button */}
           <TouchableOpacity
            style={[styles.fab, { backgroundColor: fabColor }]}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.7}
            >
            <Ionicons name="add" size={28} color="#fff" />
          </TouchableOpacity>

          

          <AddNoteModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            newNote={newNote}
            setNewNote={setNewNote}
            addNote={addNote}
          />
          <EditNoteModal
            editModalVisible={editModalVisible}
            setEditModalVisible={setEditModalVisible}
            newNote={noteEdit}
            setNewNote={setNoteEdit}
            editNote={editNote}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },
  noNotesText: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default NoteScreen;