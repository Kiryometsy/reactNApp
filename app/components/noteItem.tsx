import { View ,Text,StyleSheet} from "react-native";


const NoteItem=({ note }: Props)=>{
  return (
    <View style={styles.noteItem}>
      <Text style={styles.noteText}>{note.text}</Text>
    </View>
  );
}

type Props={
    note:Note
}
export type Note={
id:string,text:string
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
    fontSize: 18,
  },
});
export default NoteItem