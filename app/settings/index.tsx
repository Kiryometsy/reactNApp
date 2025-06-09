import useDbService from "@/app/lib/db";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ThemeToggleButton from "../components/animatedToggleButton";
import { useTheme } from "../lib/ThemeContext";

export default function SettingsPage() {
    const noteService = useDbService();
    async function mockDb() {
        await noteService.mockData();
    }
    async function deleteTable() {
        await noteService.deleteTable();
    } 

    const { theme } = useTheme();
    const bgColor   = theme === 'light' ? '#f8f9fa' : '#121212';
    const txtColor  = theme === 'light' ? '#333'     : '#ddd';
    const btnBg     = theme === 'light' ? '#007bff'  : '#1e4bff';
  return (
     <View style={[{ backgroundColor: bgColor },styles.container ]}>
      
      <ThemeToggleButton />
        <TouchableOpacity style={[styles.button, { backgroundColor: btnBg }]} onPress={mockDb}>
             <Text style={[styles.buttonText, { color: txtColor }]}>Mock table</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: btnBg }]} onPress={deleteTable}>
             <Text style={[styles.buttonText, { color: txtColor }]}>Delete table</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});