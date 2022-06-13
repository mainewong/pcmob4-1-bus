import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, } from 'react-native';

const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139"

export default function App() {
  const [loading, setLoading] = useState(true);

  function loadBusStopData() {
    fetch(BUSSTOP_URL)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
      });
  }

  useEffect(() => {
    loadBusStopData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Bus arrival time: </Text>
      <Text style={styles.arrivalTime}> {loading ? <ActivityIndicator color={'red'}/> : "Loaded"}</Text>
      <TouchableOpacity style={styles.button} onPress={() => setLoading(true)}>
        <Text style={styles.buttonText}> Refresh </Text>
      </TouchableOpacity>
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
    fontSize: 100,
  },
  title: {
    fontSize: 40,
    fontWeight: "300",
  },
  text: {
    fontSize: 50,
    marginVertical: 20,
  },
  button: {
    width: "50%",
    backgroundColor: "tomato",
    padding: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  arrivalTime: {
    fontSize: 20,
    marginVertical: 20,
  },
});
