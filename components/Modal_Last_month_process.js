import React, {useState,useEffect} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import Items_table  from '../components/Items_table';
var is_Visible=true

const Modal_Last_month_process=Props=>{
    console.log("Props.Visible "+Props.Visible)
    console.log("1is_Visible "+ is_Visible)
    is_Visible=false
    console.log("2is_Visible "+ is_Visible)
    const [modalVisible, setModalVisible] = useState(Props.Visible);
    
    console.log("--- modalVisible "+modalVisible)
    useEffect(() => { setModalVisible(Props.Visible) }, [])
    console.log("--- modalVisible "+modalVisible) 
    
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
                    yearNumber={2024}
                    monthNumber={"1"}
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