import { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../lib/ThemeContext";


const NoteItem=({ note,onDelete,onEdit,setModalVisible}: Props)=>{
  const [editedText,setEditedText]=useState(note.text);
  const inputRef=useRef(null);

  const { theme } = useTheme();
  const bgColor   = theme === "light" ? "#f5f5f5" : "#2c2c2c";
  const textColor = theme === "light" ? "#333"     : "#ddd";

  function handleEdit(){
    if (editedText.trim() === '') return;
    onEdit(note.id, editedText);
  }
  return (
    <TouchableOpacity  style={[styles.noteItem, { backgroundColor: bgColor }]} onPress={() => {
      handleEdit();
      setModalVisible(true)}}>
        <Text style={[styles.noteText, { color: textColor }]}>{note.text}</Text>

      <View style={styles.actions}>
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
    setModalVisible:(state:boolean)=>void;
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