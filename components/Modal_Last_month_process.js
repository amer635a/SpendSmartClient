import React, {useState,useEffect} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import Items_table  from '../components/Items_table';
import Items_table_income  from '../components/Items_table_income';
import { useIsFocused } from '@react-navigation/native';

const Modal_Last_month_process=Props=>{

    const [modalVisible, setModalVisible] = useState(Props.Visible);
    //onPress={() => setModalVisible(!modalVisible)}>

    const [PrevYear, setPrevYear] = useState(0);
    const [PrevMonth, setPrevMonth] = useState(0);

    const [stageNumber, setStageNumber] = useState(0);

    const [stageExpenses, setStageExpenses] = useState(true);
    const [stageIncome, setStageIncome] = useState(false);
    const [stageChooiceRatio,setStageChooiceRatio]= useState(false);
    const [stageInvestment,setStageInvestment]= useState(false);
    const [stageSavingMoney,setStageSavingMoney]= useState(false);
 
 
    useEffect(() => 
    { 
      
      setModalVisible(Props.Visible) 
      const currentDate = new Date();
      var lastMonth = new Date(currentDate);
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      if (lastMonth.getMonth() === 11) { // If the last month is December, adjust the year
          lastMonth.setFullYear(lastMonth.getFullYear() - 1);
      }

      // Extract year and month values
      const lastMonthValue = lastMonth.getMonth() + 1; // Months are zero-indexed, so add 1
      const yearValue = lastMonth.getFullYear();
  
      setPrevYear(yearValue);
      setPrevMonth(lastMonthValue); 
 
    }, [])
    console.log("--- modalVisible "+modalVisible) 
    console.log("---Modal_Last_month_process ", PrevYear, " ", PrevMonth, " ---");
    

    const nextStage = () => {
      if(stageNumber >0){
        var stageNumber_temp=stageNumber-1
        setStageNumber(stageNumber_temp)
      }
    }

    const backStage = () => {
      // add max stages
      var stageNumber_temp=stageNumber+1
      setStageNumber(stageNumber_temp)
    }

    const closeStage = () => {
      setModalVisible(!modalVisible)

    }


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
                      />
              }
              {
                stageNumber===1 &&
                  <Items_table_income 
                  data={Props.incomesData}
                  yearNumber={PrevYear}
                  monthNumber={PrevMonth}
                  /> 
              }
  
              <View style={{flexDirection: 'row',justifyContent:"center"}}  > 
              { 
                stageNumber!=0 &&
                <Pressable
                    style={[styles.button, styles.buttonBack]}
                    onPress={() => nextStage()}>
                    <Text style={styles.textStyle}>Back</Text>
                </Pressable>
              } 
                <Pressable
                  style={[styles.button, styles.buttonNext]}
                  onPress={() => backStage()}>
                  <Text style={styles.textStyle}>Next</Text>
                </Pressable>

                
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