import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FooterList from "../components/footer/FooterList";
import axios from 'axios';
import { HOST } from '../network';

const GoalManagementPage = () => {
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [transferAmount, setTransferAmount] = useState('');

  useEffect(() => {
    getGoals();
  }, []);

  const getGoals = async () => {
    try {
      const resp = await axios.get(`${HOST}/api/getGoals`);
      const dbGoals = resp.data.goals;

      const convertedGoals = dbGoals.map((dbGoal, index) => {
        return {
          id: (index + 1).toString(),
          title: dbGoal.name, // Assuming 'name' field from the database is equivalent to 'title'
          amount: parseInt(dbGoal.amount),
          collectedAmount: parseInt(dbGoal.collected),
          startDate: new Date(dbGoal.startDate).toISOString().split("T")[0],
          endDate: new Date(dbGoal.endDate).toISOString().split("T")[0],
        };
      });

      setGoals(convertedGoals);
    } catch (error) {
      console.error("Error fetching goals data:", error);
      throw error;
    }
  };

  const transferFunds = (fromGoalId, toGoalId) => {
    // Validate transfer amount
    if (!transferAmount) {
      // Show error message or perform necessary action
      return;
    }

    // Convert transfer amount to number
    const transferAmountNumber = parseFloat(transferAmount);

    // Perform fund transfer logic between goals
    // Update the goals state with the new amounts

    // Reset transfer amount input field
    setTransferAmount('');
  };

  const renderGoalItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.goalItem, selectedGoal === item.id && styles.selectedGoalItem]}
      onPress={() => setSelectedGoal(item.id)}
    >
      <Text style={styles.goalTitle}>{item.title}</Text>
      <Text style={styles.goalAmount}>Goal Amount: ${item.amount}</Text>
    </TouchableOpacity>
  );

  const renderGoalDetails = () => {
    if (!selectedGoal) {
      return null;
    }

    const goal = goals.find(goal => goal.id === selectedGoal);

    return (
      <View style={styles.goalDetails}>
        <Text style={styles.detailsTitle}>{goal.title}</Text>
        <Text style={styles.detailsSubtitle}>Goal Details:</Text>
        <Text style={styles.detailsText}>Collected Amount: ${goal.collectedAmount}</Text>
        <Text style={styles.detailsText}>Amount Left: ${goal.amount - goal.collectedAmount}</Text>
        <Text style={styles.detailsText}>Start Date: {goal.startDate}</Text>
        <Text style={styles.detailsText}>End Date: {goal.endDate}</Text>

        <Text style={styles.transferText}>Transfer Funds:</Text>
        <TextInput
          style={styles.transferInput}
          placeholder="Enter Transfer Amount"
          placeholderTextColor="#999999"
          value={transferAmount}
          onChangeText={text => setTransferAmount(text)}
          keyboardType="numeric"
        />

        <View style={styles.transferContainer}>
          {goals.map(goal => (
            <TouchableOpacity
              key={goal.id}
              style={styles.transferButton}
              onPress={() => transferFunds(selectedGoal, goal.id)}
            >
              <Text style={styles.transferButtonText}>{goal.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerr}>
        <LinearGradient
          colors={['#C9F0DB', '#A0E6C3']}
          style={styles.background}
          start={[0, 0]}
          end={[1, 1]}
        />

        <Text style={styles.header}>Goal Management</Text>

        <FlatList
          data={goals}
          renderItem={renderGoalItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.goalList}
        />

        {renderGoalDetails()}
      </View>
      <FooterList />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container:{flex: 1, justifyContent: "space-between"},
    mainText:{fontSize:30 , textAlign:"center"},

  containerr: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  goalList: {
    paddingBottom: 20,
  },
  goalItem: {
    backgroundColor: '#D3F1E1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedGoalItem: {
    backgroundColor: '#A0D9BB',
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  goalAmount: {
    fontSize: 16,
    color: '#666666',
    marginTop: 5,
  },
  goalDetails: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  detailsSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333',
  },
  detailsText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 10,
  },
  transferText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  transferInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  transferContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  transferButton: {
    backgroundColor: '#A0D9BB',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    marginRight: 10,
  },
  transferButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GoalManagementPage;
