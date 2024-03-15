import React, {useState,useEffect} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import Items_table  from '../components/Items_table';
import Items_table_income  from '../components/Items_table_income';
import Investment  from '../components/Investment';
import axios from 'axios';
import { HOST } from '../network';
import { useIsFocused } from '@react-navigation/native';

const Modal_Last_month_process=Props=>{

    const [modalVisible, setModalVisible] = useState(Props.Visible);
 
    const [maxStagesNumber, setMaxStagesNumber] = useState(3);

    const [nextBlocker, setNextBlocker] = useState(false);
    const [backBlocker, setBackBlocker] = useState(false);

    const [PrevYear, setPrevYear] = useState(0);
    const [PrevMonth, setPrevMonth] = useState(0);

    const [stageNumber, setStageNumber] = useState(0);

    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);

    const [investmentAmount, setInvestmentAmount] = useState('');

    const showAlert = () => {
      Alert.alert(
        'Alert Title',
        'This is the alert message!',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed')
          }
        ],
        { cancelable: false }
      );
    };
 
 
    useEffect(() => {
      // Update modalVisible state based on Props.Visible
      setModalVisible(Props.Visible);
      // Rest of your logic remains the same
      const currentDate = new Date();
      var lastMonth = new Date(currentDate);
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      if (lastMonth.getMonth() === 11) {
          lastMonth.setFullYear(lastMonth.getFullYear() - 1);
      }
      const lastMonthValue = lastMonth.getMonth() + 1;
      const yearValue = lastMonth.getFullYear();
      setPrevYear(yearValue);
      setPrevMonth(lastMonthValue);
  }, [Props.Visible]); // Add Props.Visible to the dependency array
     
    console.log("---Modal_Last_month_process ", PrevYear, " ", PrevMonth, " ---");
   
    const backStage =async () => {
  
      setInvestmentAmount('')
      if(stageNumber >0){
        var stageNumber_temp=stageNumber-1
        setStageNumber(stageNumber_temp)
      }
    }
  
    

    const nextStage =async () => {
      // add max stages
       
      if(stageNumber==2)
      {
        if(investmentAmount =='')
          {
            showAlert()
            return
          }
        else
        {
          // res=await updateInvestmentAmountDB()
          // console.log(res)
          // if(res===false){
          //   Alert.alert('Error', 'Failed to update investment amount. Please try again.');
          //   return
          // }

        }
      }
      var stageNumber_temp=stageNumber+1
      setStageNumber(stageNumber_temp)
      console.log("press backStage")
      console.log(nextBlocker)
      
    }

    const closeStage = () => {
      setModalVisible(!modalVisible)
    }


    const updateInvestmentAmountDB = async () => {
      try {
        console.log("***updateInvestmentAmountDB1***");
       
        const response_getInvestAmount = await axios.get(`${HOST}/api/getInvestAmount`);
        const DBInvestAmount = response_getInvestAmount.data.investAmount;
        const newInvestAmount = (parseInt(investmentAmount) + parseInt(DBInvestAmount)).toString();
        
        console.log("newInvestAmount: " + newInvestAmount);
        setInvestmentAmount(newInvestAmount);
    
        try {
          const response = await axios.put(`${HOST}/api/updateInvestAmount`, {
            newInvestAmount: newInvestAmount
          });
        
          return true;
        } catch (error) {
          // Handle error
          Alert.alert('Error', 'Failed to update investment amount. Please try again.');
          console.error('Update failed:', error);
          return false;
        }
      } catch (error) {
        console.error("Error updating investment amount:", error);
        return false;
      }
    };
    


    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>

              { 
                stageNumber===0 &&
                <Items_table 
                  data={Props.expensesData}
                  yearNumber={PrevYear}
                  monthNumber={PrevMonth}
                  setTotalExpenses={setTotalExpenses}
                  />
              }
              {
                stageNumber===1 &&
                  <Items_table_income 
                  data={Props.incomesData}
                  yearNumber={PrevYear}
                  monthNumber={PrevMonth}
                  setTotalIncome={setTotalIncome}
                  /> 
              }
              {
                stageNumber===2 &&
                  <View style={{height:"56%"}}>
                    
                    <Investment 
                      setInvestmentAmount={setInvestmentAmount}
                      setNextBlocker={setNextBlocker}
                    /> 
                  </View>                 
              }
             {
                stageNumber === 3 && (
                  <View>
                     <Text>Budget algorithm</Text>
                    <View style={{ height: "56%" }}>
                      <Text>investmentAmount: {investmentAmount}</Text>
                    </View>
                  </View>
                )
              }
  
              <View style={{flexDirection: 'row',justifyContent:"center"}}  > 
              { 
                stageNumber!=0 &&
                <Pressable
                    style={({ pressed }) => [
                      styles.button,
                      backBlocker===false  ? styles.buttonBack : {},
                    ]}
                    onPress={() => backStage()}
                    disabled={backBlocker}
                    >
                  <Text style={styles.textStyle}>Back</Text>
                    
                </Pressable>
              } 

              {
                maxStagesNumber > stageNumber &&
                <Pressable
                  style={({ pressed }) => [
                    styles.button,
                    nextBlocker===false  ? styles.buttonNext : {},
                  ]}
                  onPress={() => nextStage()}
                  disabled={nextBlocker}
                  >
                  <Text style={styles.textStyle}>Next</Text>
                </Pressable>
              }
                
              </View>
              <Pressable
                  style={[styles.button, styles.buttonNext]}
                  onPress={() => closeStage()}>
                  <Text style={styles.textStyle}>close</Text>
                </Pressable>

            </View>
          </View>
        </Modal>

        
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </View>
    );
  };
 
 
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
       
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonNext: {
      backgroundColor: '#2196F3',
      marginTop:12,
      margin: 5,
      width:"45%"
    },
    buttonBack:{
      backgroundColor: 'red',
      marginTop:12,
      margin: 5,
      width:"45%"
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });
  export default Modal_Last_month_process; 