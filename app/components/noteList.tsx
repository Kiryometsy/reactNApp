import { Note } from "@/app/components/noteItem";
import { useHeaderHeight } from "@react-navigation/elements";
import { Dispatch, SetStateAction, useRef } from "react";
import { FlatList } from "react-native";
import NoteItem from "./noteItem";

const NoteList=({notes,onDelete,onEdit,setModalVisible}:Props)=>{
    const flatListRef = useRef<FlatList<Note>>(null);
    const headerHeight = useHeaderHeight();
  
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
                        setModalVisible={setModalVisible}
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
    setModalVisible:Dispatch<SetStateAction<boolean>>;
}
export default NoteList