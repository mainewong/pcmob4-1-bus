import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, } from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const [arrivalMin, setArrivalMin] = useState("");
  const [busNo, setbusNo] = useState("");
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

        const duration_ms = myBus.next.duration_ms;
        console.log(duration_ms);
        const duration_mins = Math.floor(duration_ms/60000);
        setArrivalMin(`${duration_mins} minutes`);

        setbusNo(myBus.no);

        setLoading(false);
      });

      function refreshPage() {
        window.location.reload(false);
      }
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
      <Text style={styles.busNoTitle}> { busNo } </Text>
      <Text style={styles.title}> Bus arrival time: </Text>
      <Text style={styles.arrivalTime}> {loading ? <ActivityIndicator color={'red'}/> : arrival }</Text>
      <Text style={styles.arrivalMin}> {loading ? <ActivityIndicator color={'red'}/> : arrivalMin }</Text>
      <TouchableOpacity style={styles.button} onPress={() => setLoading(true)}>
        <Text style={styles.buttonText} onPress={refreshPage}> Refresh </Text>
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
    marginTop: 20,
  },
  arrivalMin: {
    fontSize: 30,
    fontWeight: "400",
    marginVertical: 20,
    color: "tomato",
  },
  busNoTitle: {
    fontSize: 50,
    fontWeight: "800",
    marginVertical: 10,
    color: "tomato",
  }
});
