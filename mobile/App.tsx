import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ButtonProps {
  title: String;
}

function Button({ title }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.title} >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="Press" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#000',
    borderRadius: 50,
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
});
