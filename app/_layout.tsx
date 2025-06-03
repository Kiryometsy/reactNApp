import { Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider} from 'expo-sqlite';

const RootLayout = () => {


  async function createDbIfNeeded(db:SQLiteDatabase){
    await db.execAsync(
      "CREATE TABLE IF NOT EXISTS Notes (id INTEGER PRIMARY KEY AUTOINCREMENT,noteId TEXT NOT NULL,text TEXT NOT NULL);")
  }
  return (
    <SQLiteProvider databaseName="Notes.db" onInit={createDbIfNeeded}>
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ff8c00',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
        contentStyle: {
          paddingHorizontal: 10,
          paddingTop: 10,
          backgroundColor: '#fff',
        }
      }}
    >
      <Stack.Screen name="index" options={{title: 'Home'}} />
      <Stack.Screen name="notes" options={{headerTitle: 'Notes'}} />
    </Stack>
  </SQLiteProvider>
  )
}

export default RootLayout
