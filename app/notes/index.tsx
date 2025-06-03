import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity,Modal,TextInput } from "react-native";
import AddNoteModal from "@/app/components/AddNoteModal";
import NoteItem from "@/app/components/noteItem";
import NoteList from "@/app/components/noteList";
import { useSQLiteContext } from "expo-sqlite";
import { useFocusEffect } from "expo-router";

const NoteScreen = () => {

    const [modalVisible,setModalVisible]=useState(false);
    const [newNote,setNewNote]=useState('');
    const database=useSQLiteContext();
    const [notes, setNotes] = useState([])
    useFocusEffect(
        useCallback(()=>{
            getList();
        },[])
    )
   
    async function getList(){
        try{
            const list=await database.getAllAsync("SELECT * FROM Notes")
            console.log("in notes",list)
            setNotes(list)
        }catch(err){
            console.error("Get Notes error",err)
        }
    }
    async function mockDb(){
        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS Notes (id INTEGER PRIMARY KEY NOT NULL, noteId TEXT NOT NULL, text Text NOT NULL);
            INSERT INTO Notes (noteId, text) VALUES ('1', 'note 1');
            INSERT INTO Notes (noteId, text) VALUES ('2', 'note 2');
            INSERT INTO Notes (noteId, text) VALUES ('3', 'note 3');
            `);
            getList();
    }
    async function deleteTable(){
        try{
            const list=await database.getAllAsync("DELETE FROM Notes")
            
            
        }catch(err){
            console.error("deleteing table error",err)
        }
        getList();
    }
    const addNote = async () => {
        const statement = await database.prepareAsync(
            'INSERT INTO Notes (noteId, text) VALUES ($noteId, $text)'
            );
        if (newNote.trim() === '') return;
        const id=Date.now.toString();
        
        await statement.executeAsync({ $noteId: id, $text: newNote });
        //getNoteList();
        setNewNote('');
        setModalVisible(false);
        getList();
    };

    return ( <View style={styles.container}>
        {/* note list  */}
        <NoteList notes={notes}/>

        <TouchableOpacity style={styles.addButton} onPress={()=>setModalVisible(true) }>
            <Text style={styles.addButtonText}>+ Add Note</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mockButton} onPress={()=>mockDb() }>
            <Text style={styles.addButtonText}>Mock table</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={()=>deleteTable() }>
            <Text style={styles.addButtonText}>delete table</Text>
        </TouchableOpacity>

         {/* Modal */}
        <AddNoteModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            newNote={newNote}
            setNewNote={setNewNote}
            addNote={addNote}
        />
    </View>
    );
}

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
  noNotesText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 15,
  },
  mockButton: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButton: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 20,
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
});
export default NoteScreen;