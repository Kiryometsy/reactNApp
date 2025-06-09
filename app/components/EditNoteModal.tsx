import { Dispatch, SetStateAction, useEffect } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Note } from './noteItem';

type Props = {
  editModalVisible: boolean;
  setEditModalVisible: (visible: boolean) => void;
  newNote: Note;
  setNewNote: Dispatch<SetStateAction<Note>>;
  editNote: (id:number,text:string) => void;
};
const EditNoteModal = ({
  editModalVisible,
  setEditModalVisible,
  newNote,
  setNewNote,
  editNote,
}: Props) => {

   useEffect(()=>{
        //console.log(newNote)
   },[])
   function handleEdit(text:string){
    const note={id:newNote.id,noteId:newNote.noteId,text:text};
    setNewNote(note)
   }
  return (
    <Modal 
        visible={editModalVisible} 
        animationType="slide" 
        transparent 
        onRequestClose={()=> setEditModalVisible(false)}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}> Edit a note</Text>
                    <TextInput
                     style={styles.input}
                     placeholder={newNote.text}
                     placeholderTextColor='#aaa'
                     value={newNote.text}
                     onChangeText={handleEdit}/>
                     {/* <View style={styles.container}> */}
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.cancelButton} onPress={()=>setEditModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.saveButton} onPress={()=>{editNote(newNote.id,newNote.text)}}>
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                      {/* </View> */}
                </View>
            </View>
        </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginBottom: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default EditNoteModal;