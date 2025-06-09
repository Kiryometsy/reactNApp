import { ThemeProvider } from '@/app/lib/ThemeContext';
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { TouchableOpacity } from "react-native";

const RootLayout = () => {


  
const router = useRouter();
  async function createDbIfNeeded(db:SQLiteDatabase){
    await db.execAsync(
      "CREATE TABLE IF NOT EXISTS Notes (id INTEGER PRIMARY KEY AUTOINCREMENT,noteId TEXT NOT NULL,text TEXT NOT NULL);")
  }
  const SettingsButton = () => (
    <TouchableOpacity
      onPress={() => router.push("/settings")}
      style={{
      marginRight: 16,      
      }}
      hitSlop={8}
    >
      <Ionicons  name="settings-outline" size={24}  color="#fff" />
    </TouchableOpacity>
  );



  return (
    <ThemeProvider>
      <SQLiteProvider databaseName="Notes.db" onInit={createDbIfNeeded}>
        <Stack
          screenOptions={{
            animation: 'fade',
            headerStyle: {
              backgroundColor: '#ff8c00',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
            },
            contentStyle: {
              paddingHorizontal: 0,
              paddingTop: 0,
              backgroundColor: '#fff',
            },
            headerRight: () => <SettingsButton />,
          }}
        >
          <Stack.Screen name="index" options={{title: 'Home'}}/>
          <Stack.Screen name="notes" options={{headerTitle: 'Notes'}} />
          <Stack.Screen name="authors" options={{headerTitle: 'Authors'}} />
          <Stack.Screen name="settings" options={{headerTitle: 'Settings'}}/>
        </Stack>
      </SQLiteProvider>
    </ThemeProvider>
  )
}

export default RootLayout
