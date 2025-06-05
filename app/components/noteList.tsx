import { Note } from "@/app/components/noteItem";
import { useHeaderHeight } from "@react-navigation/elements";
import { useEffect, useRef } from "react";
import { FlatList } from "react-native";
import NoteItem from "./noteItem";

const NoteList=({notes,onDelete,onEdit, currentlyEditingId,onStartEditing}:Props)=>{
    const flatListRef = useRef<FlatList<Note>>(null);
    const headerHeight = useHeaderHeight();
    
    useEffect(() => {
  if (currentlyEditingId && flatListRef.current) {
    const index = notes.findIndex(n => n.id === currentlyEditingId);
    if (index !== -1) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0, // top of the list
          viewOffset: headerHeight + 10,
        });
      }, 300); // wait for keyboard animation to complete
    }
  }
}, [currentlyEditingId]);


  
    return(
       
            <FlatList 
                ref={flatListRef}
                data={notes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <NoteItem
                        note={item}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onStartEditing={onStartEditing}
                    />
                )}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{ paddingBottom: 160 }} // <-- helps scroll past footer buttons
                />

       
    );
}
type Props={
    notes:Note[],
    onDelete:(id:number) => void,
    onEdit:(id:number,editedText:string) => void,
    currentlyEditingId: number | null;
    onStartEditing:(id:number)=>void
}
export default NoteList