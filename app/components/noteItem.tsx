import { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


const NoteItem=({ note,onDelete,onEdit,onStartEditing}: Props)=>{
  const [isEditing,setIsEditing]=useState(false);
  const [editedText,setEditedText]=useState(note.text);
  const inputRef=useRef(null);


  function handleSave(){
    if (editedText.trim() === '') return;
    onEdit(note.id, editedText);
    setIsEditing(false);
  }
  return (
    <TouchableOpacity style={styles.noteItem} onPress={() => {
      onStartEditing?.(note.id);
      setIsEditing(true)
      }}>
      {isEditing ?(
        <TextInput
        ref={inputRef}
        style={styles.input}
        value={editedText}
        onChangeText={setEditedText}
        autoFocus
        onSubmitEditing={handleSave}
        returnKeyType="done"
        />
      ):(
        <Text style={styles.noteText}>{note.text}</Text>
      )}
      <View style={styles.actions}>
        {isEditing ?(
          <TouchableOpacity onPress={()=>{
            handleSave();
            inputRef.current.blur();
          }}>
            <Text style={styles.edit}>💾</Text>
          </TouchableOpacity>
        ):(
          <TouchableOpacity onPress={() => {
            onStartEditing?.(note.id);
            setIsEditing(true)
          }}>
            <Text style={styles.edit}>✏️</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={()=>onDelete(note.id)}>
          <Text style={styles.delete}>❌</Text>
        </TouchableOpacity>

      </View>
    </TouchableOpacity>
  );
}

type Props={
    note:Note,
    onDelete:(id:number) => void,
    onEdit:(id:number,editedText:string) => void,
    onStartEditing?: (id: number) => void;
}
export type Note={
id:number,noteId:string,text:string
};
const styles = StyleSheet.create({
  noteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  noteText: {
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 12,
  },
  delete: {
    fontSize: 18,
    color: 'red',
  },
  actions: {
    flexDirection: 'row',
  },
  edit: {
    fontSize: 18,
    marginRight: 10,
    color: 'blue',
  },
  input: {
  flex: 1,
  fontSize: 18,
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderWidth: 1,
  borderRadius: 5,
},
});
export default NoteItem