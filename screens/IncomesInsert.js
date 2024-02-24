import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FooterList from "../components/footer/FooterList";
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome
import axios from 'axios';
import { HOST } from '../network';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IncomesInsert = ({ route,navigation }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [percentage, setPercentage] = useState("");
  const [tracked, setTracked] = useState("");
  const [yearNumber, setYearNumber] = useState("");
  const [monthNumber, setMonthNumber] = useState("");
  

  useEffect(() => {
    const currentDate = new Date();
    setYearNumber(route.params.yearNumber);
    setMonthNumber(route.params.monthNumber); // Months are 0-based
    console.log("useEffect -> yearNumber ",route.params.yearNumber," monthNumber",route.params.monthNumber)
 
  }, []); // Empty dependency array to ensure it runs only once on component mount
  const user_id = '64d373c5bf764a582023e5f7';
  const handleViewIncomes = async () => {
 
    const resp = await axios.post(`${HOST}/api/getIncomes`, { user_id, yearNumber, monthNumber });

    navigation.navigate("IncomesDetailsPage", {
      incomesData: resp.data
    });
  };

  const handleSubmit = async () => {
    if (name === '' || amount === '' || percentage === '' || tracked === '' || yearNumber === '' || monthNumber === '') {
      alert("All fields are required");
      return;
    }
    
    try {
      console.log("axios insertIncomes send -> yearNumber ",yearNumber," monthNumber",monthNumber)
      const resp = await axios.post(`${HOST}/api/insertIncomes`, {
        user_id,
        name,
        amount,
        tracked,
        percentage,
        yearNumber,
        monthNumber,
      });
      console.log(resp.data.message)
      await AsyncStorage.setItem("auth-rn", JSON.stringify(resp.data));
      alert("Insert Successfully");
    } 
    catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
    console.log("Insert Successfully")
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <LinearGradient
          colors={['#C9F0DB', '#A0E6C3']}
          style={styles.gradientBackground}
          start={[0, 0]}
          end={[1, 1]}
        />
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Insert Your Incomes</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Income Name: </Text>
          <TextInput
            style={styles.input}
            keyboardType="default"
            onChangeText={text => setName(text)}
          />

          <Text style={styles.label}>Amount:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={text => setAmount(text)}
          />
          <Text style={styles.label}>Tracked:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={text => setTracked(text)}
          />
          <Text style={styles.label}>What percentage of your income do you want to use?:</Text>
          <View style={[styles.contentPrecntage]}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={text => setPercentage(text)}
            />
          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleViewIncomes} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>View Incomes</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FooterList />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
 
    paddingTop: 40,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  contentPrecntage: {
    width: '100%',
    maxWidth: 100, // Adjust the maximum width as needed
    

  },
  content: {
    width: '100%',
    maxWidth: 400, // Adjust the maximum width as needed
    paddingHorizontal: 20,


  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  buttonStyle: {
    marginBottom: 15,
    backgroundColor: "#E4F2F0",
    height: 50,
    width: '50%', // Adjust the width as needed
    justifyContent: "center",
    alignSelf: 'center', // Center the button horizontally
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'green',
    borderRadius: 50,
    padding: 10,
  },
  addIcon: {
    color: 'white',
    fontSize: 20,
  },
});


export default IncomesInsert;



