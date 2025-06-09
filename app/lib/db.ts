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
      INSERT INTO Notes (noteId, text) VALUES ('4', 'note 4');
      INSERT INTO Notes (noteId, text) VALUES ('5', 'note 5');
      INSERT INTO Notes (noteId, text) VALUES ('6', 'note 6');
      INSERT INTO Notes (noteId, text) VALUES ('7', 'note 7');
      INSERT INTO Notes (noteId, text) VALUES ('8', 'note 8');
      INSERT INTO Notes (noteId, text) VALUES ('9', 'note 9');
      INSERT INTO Notes (noteId, text) VALUES ('10', 'note 10');
      INSERT INTO Notes (noteId, text) VALUES ('11', 'note 11');
      INSERT INTO Notes (noteId, text) VALUES ('12', 'note 12');
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