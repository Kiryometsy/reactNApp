import { FlatList, View } from "react-native";
import NoteItem from "./noteItem"
import { Note } from "@/app/components/noteItem";

const NoteList=({notes}:Props)=>{
    return(
        <View>
            <FlatList 
                data={notes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <NoteItem note={item}/>}
            />
        </View>
    );
}
type Props={
    notes:Note[]
}
export default NoteList