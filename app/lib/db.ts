import { Note } from "@/app/components/noteItem";
import { useSQLiteContext } from "expo-sqlite";


function useDBService() {
const database = useSQLiteContext();


async function initTable() {
  try{
		await database.execAsync(`
            CREATE TABLE IF NOT EXISTS Notes (id INTEGER PRIMARY KEY NOT NULL, noteId TEXT NOT NULL, text Text NOT NULL);`);
    }catch(err){
      console.error("error witch creating table",err)
    }
	}

async function addNoteToTable(noteId:string,newNote:string){
		const statement = await database.prepareAsync(
			"INSERT INTO Notes (noteId, text) VALUES ($noteId, $text)"
		);
		if (newNote.trim() === "") return;
		const id = Date.now().toString()
    try{
		await statement.executeAsync({ $noteId: id, $text: newNote });
    }catch(err){
      console.error("error witch adding to table",err)
    }finally{
      await statement.finalizeAsync();
    }
	};

async function deleteNote(inputId:number){
    if (inputId ==null) return;
    
  	
		//console.log("check in db delete",typeof(inputId))
    try{
		  await database.runAsync("DELETE FROM Notes WHERE id= ?;",[inputId])
    }catch(err){
      console.error("error witch adding to table",err)
    }
	};

  async function editNote(id:number,text:string){
    if (id ==null) return;

    try{
		  const response=await database.runAsync("UPDATE Notes SET text=? WHERE id= ?;",[text,id])
      //return response;
    }catch(err){
      console.error("error witch editing to table",err)
      //return err;
    }
  }
async function getNoteList() {
		try {
			const list = await database.getAllAsync<Note>("SELECT * FROM Notes");
			//console.log("in notes",list)
			return list
		} catch (err) {
			console.error("Get Notes error", err);
      return([])
		}
	}
async function mockData() {
		await database.execAsync(`
            INSERT INTO Notes (noteId, text) VALUES ('1', 'note 1');
            INSERT INTO Notes (noteId, text) VALUES ('2', 'note 2');
            INSERT INTO Notes (noteId, text) VALUES ('3', 'note 3');
            `);
	}
async function deleteTable() {
		try {
			await database.runAsync("DELETE FROM Notes");
		} catch (err) {
			console.error("deleteing table error", err);
		}
	}
return { initTable, getNoteList,mockData,deleteTable,addNoteToTable,deleteNote,editNote};
}
export default useDBService;