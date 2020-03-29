import React, { useRef} from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import RegisterForm from "../../components/Account/RegisterForm";
import Toast from "react-native-easy-toast";

const Register = () => {

  const toastRef = useRef();

  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../assets/img/6tenedores-icono-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      
      <View style={styles.viewForm}>
        <RegisterForm toastRef={toastRef}></RegisterForm>
        
      </View>
      <Toast ref={toastRef} position="center" opacity={0.5} />
      
    </KeyboardAwareScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40
  }
});
