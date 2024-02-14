import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { HOST } from '../network';
import * as ImagePicker from "expo-image-picker";

const Account = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [state, setState] = useContext(AuthContext);
  const [image, setImage] = useState({ url: "", public_id: "" });
  const [UploadImage,setUploadImage]= useState("");
  useEffect(() => {
    if (state) {
      const { name, email, role, image } = state.user;
      setName(name);
      setEmail(email);
      setRole(role);
    }
  }, [state]);

  const handleSubmit = async () => {
    if (email === '' || password === '') {
      alert("All fields are required");
      return;
    }
    const resp = await axios.post(`${HOST}/api/signin`, { email, password });
    try {
      if (resp.data.error)
        alert(resp.data.error)
      else {
        setState(resp.data);
        await AsyncStorage.setItem("auth-rn", JSON.stringify(resp.data));
        alert("Sign In Successfully");
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  }

  const handleUpload = async () => { 
    let permissionResult= await ImagePicker.requestCameraPermissionsAsync();
    if(permissionResult.granted === false){
      alert("Camera access is required");
      return;
    }
    let pickerResult =await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4,3],
      base64: true,
    });
    if (pickerResult.canceled ===true){
      return;
    }
    let base64Image =`data:image/jpg;base64,${pickerResult.base64}`;
    setUploadImage(base64Image);
    const {data} =await axios.post(`${HOST}/api/upload-image`,{ image : base64Image});
    console.log("UPLOAD RESPONSE =>",data);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={{ marginVertical: 100 }}>
        <View style={styles.imageContainer}>
          {image && image.url ? <Image source={{ uri: image.url }} style={styles.imageStyles} /> :
          UploadImage ? <Image source={{uri: UploadImage}} style={styles.imageStyles}/> :
          (
            <TouchableOpacity onPress={() => handleUpload()}>
              <FontAwesome5 name="camera" size={25} color={"darkmagenta"} />
            </TouchableOpacity>
          )}
        </View>
        {image && image.url ? (
          <TouchableOpacity onPress={() => handleUpload()}>
            <FontAwesome5 name="camera" size={25} color="darkmagenta" style={styles.iconStyle} />
          </TouchableOpacity>):(<></>)}
        <Text style={styles.signupText}>{name}</Text>
        <Text style={styles.emailText}>{email}</Text>
        <Text style={styles.roleText}>{role}</Text>
        <View style={{ marginHorizontal: 24 }}>
          <Text style={{ fontSize: 16, color: '#8e93a1' }}>PASSWORD</Text>
          <TextInput style={styles.signupInput} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true}
            autoCompleteType="password" />
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Update Password </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  iconStyle:{marginTop: -5,marginBottom:10,alignSelf:"center"},
  container: { flex: 1, justifyContent: "center" },
  signupInput: { fontSize: 30, textAlign: "center" },
  emailText: { fontSize: 18, textAlign: "center" },
  roleText: { fontSize: 16, textAlign: "center", color: "gray" },
  signupInput: { borderBottomWidth: 0.5, height: 48, borderBottomColor: "#8e93a1", marginBottom: 30 },
  buttonStyle: { backgroundColor: "darkmagenta", height: 50, marginBottom: 20, justifyContent: "center", marginHorizontal: 15, borderRadius: 15 },
  buttonText: { fontSize: 20, textAlign: "center", color: "#fff", textTransform: "uppercase", fontWeight: "bold" },
  imageContainer: { justifyContent: "center", alignItems: "center" },
  imageStyles: { width: 100, height: 100, marginVertical: 20 }
})

export default Account;