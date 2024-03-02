import React, {useState,useEffect} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import Items_table  from '../components/Items_table';
 

const Modal_Last_month_process=Props=>{

    const [modalVisible, setModalVisible] = useState(Props.Visible);


    const [PrevYear, setPrevYear] = useState(0);
    const [PrevMonth, setPrevMonth] = useState(0);
    
    useEffect(() => { setModalVisible(Props.Visible) 
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
              <Items_table 
                    data={Props.expensesData}
                    yearNumber={PrevYear}
                    monthNumber={PrevMonth}
                    />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                
                <Text style={styles.textStyle}>Next</Text>
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
    buttonClose: {
      backgroundColor: '#2196F3',
      margin: 15
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