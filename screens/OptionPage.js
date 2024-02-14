import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import FooterList from "../components/footer/FooterList";
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { HOST } from '../network';


const OptionPage = ({ navigation }) => {
  const user_id = '64d373c5bf764a582023e5f7';
  const MinuteProcess=5;
  const HourProcess=18;
  const DayProcess=10

  //Previuos Month
  const [yearNumber, setPrevYear] = useState("");
  const [monthNumber, setPrevMonth] = useState("");

  const [dayCurrent, setDayCurrent] = useState("");
  const [hourCurrent, setHourCurrent] = useState("");
  const [minuteCurrent, setMinuteCurrent] = useState("");

  const handleGoals = async () => {
    navigation.navigate("GoalManagement");
  };
  const handelSavings = async () => {
    navigation.navigate("SavingsPage");
  };
  const handleInvestment = async () => {
    navigation.navigate("InvestmentPage");
  };
  state = {
    textInputs: [],
  };

  const LastMonthProcess =async () => {
    if (dayCurrent == 6 && minuteCurrent == 22 && hourCurrent==18) {
      try {
        const resp = await axios.post(`${HOST}/api/getExpenses`, { user_id, yearNumber, monthNumber });
        
        // Instead of navigating with parameters, set the expenses data in the state
        navigation.navigate("ExpensesDetailsPage",{
          expensesData: resp.data.expenses,
        });
    } catch (error) {
        console.error("Error fetching expenses data:", error);
    }
    }
};


  useEffect(() => {
    const currentDate = new Date();
    const pastMonthDate = new Date(currentDate);

    pastMonthDate.setMonth(currentDate.getMonth() );

    setPrevYear(pastMonthDate.getFullYear().toString());
    setPrevMonth((pastMonthDate.getMonth()).toString()); 

    setDayCurrent((currentDate.getDay()))
    setHourCurrent((currentDate.getHours()))
    setMinuteCurrent((currentDate.getMinutes()))
    LastMonthProcess();
    console.log("hi     "+pastMonthDate.getFullYear()+"     "+yearNumber+"   "+ monthNumber)
  }, []); 

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.containerr}>
        <LinearGradient
          colors={['#C9F0DB', '#A0E6C3']}
          style={styles.background}
          start={[0, 0]}
          end={[1, 1]}
        />

        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.circle2} />
            <View style={styles.circle1} />
            <Text style={styles.title}>Spend</Text>
            <Text style={styles.subtitle}>Smart</Text>

          </View>
          <View style={styles.buttonContainerStyle}>
            <Text style={styles.selectOptionText}>Select An Option</Text>

            <TouchableOpacity onPress={handelSavings} style={styles.buttonStyle}>
              <Text style={styles.buttonText}>View Saving's</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleGoals} style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Manage Goals</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleInvestment} style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Manage Investment</Text>
            </TouchableOpacity>

          </View>
        </View>

      </View>

      <FooterList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: { flex: 1, justifyContent: 'space-between' },
  containerr: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 40,
    color: 'black',
    top: 98,
    right: '10%',
  },
  subtitle: {
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 64,
    color: 'black',
    top: 78,
    left: '-2%',
  },
  selectOptionText: {
    fontSize: 24,
    fontWeight: 'bold',

    color: 'black',
    marginBottom: 40,
  },
  circle1: {
    position: 'absolute',
    top: -135,
    right: 170,
    width: 436,
    height: 429,
    borderRadius: 430 / 2,
    backgroundColor: "#8FE388",
  },
  circle2: {
    position: 'absolute',
    top: -112,
    right: -60,
    width: 310,
    height: 310,
    borderRadius: 310 / 2,
    backgroundColor: "#67C28D",
  },
  buttonContainerStyle: {
    alignItems: 'center',
    top: -112,
    marginBottom: -30,

  },
  buttonStyle: {
    marginBottom: 15,
    backgroundColor: "#E4F2F0",
    height: 50,
    width: 300,
    justifyContent: "center",
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

});

export default OptionPage;
