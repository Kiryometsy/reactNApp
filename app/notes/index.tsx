import AddNoteModal from "@/app/components/AddNoteModal";
import NoteList from "@/app/components/noteList";
import useDbService from "@/app/lib/db";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View
} from "react-native";

type Note = {
  id: number;
  noteId: string;
  text: string;
};

const NoteScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentlyEditingId, setCurrentlyEditingId] = useState<number | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const noteService = useDbService();

  useFocusEffect(
    useCallback(() => {
      const init = async () => {
        await noteService.initTable();
        getList();
      };
      init();
    }, [])
  );

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  async function getList() {
    setLoading(true);
    const list = await noteService.getNoteList();
    setNotes(list);
    setLoading(false);
  }

  async function mockDb() {
    await noteService.mockData();
    getList();
  }

  async function deleteTable() {
    await noteService.deleteTable();
    getList();
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
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 80}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : notes.length === 0 ? (
            <Text style={styles.noNotesText}>You have no notes</Text>
          ) : (
            <NoteList
              notes={notes}
              onDelete={deleteNote}
              onEdit={editNote}
              currentlyEditingId={currentlyEditingId}
              onStartEditing={setCurrentlyEditingId}
            />
          )}

          {/* Always show Add Note button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Add Note</Text>
          </TouchableOpacity>

          {/* Conditionally render Mock/Delete buttons if keyboard not visible */}
          {!keyboardVisible && (
            <>
              <TouchableOpacity style={styles.mockButton} onPress={mockDb}>
                <Text style={styles.addButtonText}>Mock table</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteButton} onPress={deleteTable}>
                <Text style={styles.addButtonText}>Delete table</Text>
              </TouchableOpacity>
            </>
          )}

          <AddNoteModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            newNote={newNote}
            setNewNote={setNewNote}
            addNote={addNote}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },
  noNotesText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginTop: 15,
  },
  mockButton: {
    position: "absolute",
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: "#ccc",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButton: {
    position: "absolute",
    bottom: 120,
    left: 20,
    right: 20,
    backgroundColor: "#ccc",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
});

export default NoteScreen;
