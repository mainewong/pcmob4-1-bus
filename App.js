import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, } from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139"

  function loadBusStopData() {
    fetch(BUSSTOP_URL)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log("Original data:")
        console.log(responseData);
        const myBus = responseData.services.filter(
          (item) => item.no === "155"
        )[0];
        console.log("My Bus");
        console.log(myBus.next.time);
        setArrival(myBus.next.time);
        setLoading(true);
      });
  }

  useEffect(() => {
    loadBusStopData();
  }, []);


  useEffect(() => {
    const interval = setInterval(loadBusStopData, 5000);
    return() => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Bus arrival time: </Text>
      <Text style={styles.arrivalTime}> {loading ? <ActivityIndicator color={'red'}/> : arrival}</Text>
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
