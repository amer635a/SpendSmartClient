import React, { useState ,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, SafeAreaView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
 import axios from 'axios';
 import { HOST } from '../network';
 import Ionicons  from 'react-native-vector-icons/Ionicons';

const IncomesDetails = ({ route, navigation }) => {
    const { incomesData } = route.params;
    const totalTracked = incomesData.incomes.reduce((acc, item) => acc + parseFloat(item.tracked), 0);
    const totalBudget = incomesData.incomes.reduce((acc, item) => acc + parseFloat(item.amount), 0);
    const [editingIndex, setEditingIndex] = useState(null);
    const [updatedBudget, setUpdatedBudget] = useState("");

    const [yearNumber, setYearNumber] = useState("");
    const [monthNumber, setMonthNumber] = useState("");
  
    useEffect(() => {
      const currentDate = new Date();
      const pastMonthDate = new Date(currentDate);
      pastMonthDate.setMonth(currentDate.getMonth() - 1);
  
      setYearNumber(pastMonthDate.getFullYear().toString());
      setMonthNumber((pastMonthDate.getMonth() + 1).toString()); // Months are 0-based
    }, []); // Empty dependency array to ensure it runs only once on component mount

    const handleViewIncomesReport = async () => {
        try {
            const user_id = '64d373c5bf764a582023e5f7';
            const resp = await axios.post(`${HOST}/api/getIncomes`,{ user_id, yearNumber, monthNumber });
            const incomesData = resp.data;
            navigation.navigate("IncomesCircularGraph", {
                incomesData: incomesData.incomes,
            });
        } catch (error) {
            console.error("Error fetching incomes data:", error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.amount}</Text>
            <Text style={styles.cell}>{item.tracked}</Text>
            <Text style={styles.cell}>{item.name}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient
                colors={['#C9F0DB', '#A0E6C3']}
                style={styles.gradientBackground}
                start={[0, 0]}
                end={[1, 1]}
            />
            <View style={styles.container}>
                <Text style={styles.header}>Incomes Details</Text>
                <View style={[styles.row, styles.headerRow]}>
                    <Text style={styles.headerCell}>Budget</Text>
                    <Text style={styles.headerCell}>Tracked</Text>
                    <Text style={styles.headerCell}>Incomes</Text>
                </View>
                <FlatList
                    data={incomesData.incomes}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                  
                />
                <View>
                
                        <>
                            <View style={styles.line} />
                            <View style={styles.totalRow}>
                                <Text style={[styles.cell, styles.totalCell]}>
                                    {totalBudget.toFixed(2)}
                                </Text>
                                <Text style={[styles.cell, styles.totalCell]}>
                                    {totalTracked.toFixed(2)}
                                </Text>
                                <Text style={[styles.cell, styles.totalCell]}>Total</Text>
                            </View>
                        </>
                    
                </View>
                <View style={{ marginBottom: 20 }}></View>
                <View style={{ marginBottom: 20 }}></View>
                <TouchableOpacity
                    onPress={handleViewIncomesReport}
                    style={styles.buttonContainer}
                >
                    <Text style={styles.buttonText}>View Incomes Report</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => {
                    navigation.navigate("IncomesInsert");
                }}
                style={styles.iconButton}
            >
                <Ionicons name="add" size={30} color="white"   />
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
        width: '100%',
    },
    gradientBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    container: {
        flex: 1,
        width: '90%',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333333',
        textAlign: 'center',
    },
    headerRow: {
        backgroundColor: 'green',
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
        paddingVertical: 8,
    },
    headerCell: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        alignSelf: 'center',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        paddingVertical: 12,
    },
    cell: {
        flex: 1,
        fontSize: 16,
        color: '#333333',
        alignSelf: 'center',
        textAlign: 'center',
    },
    line: {
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
    }, 
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    totalCell: {
        fontWeight: 'bold',
    },
    buttonContainer: {
    marginBottom: 180,
    backgroundColor: "#E4F2F0",
    height: 50,
    width: '80%', // Use a percentage-based width
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
    iconButton: {
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        backgroundColor: '#67C28D', 
        borderRadius: 30,
        width: 60,
        height: 60,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // Android shadow
    },
});

export default IncomesDetails;
