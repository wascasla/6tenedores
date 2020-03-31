import React, { useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { validateEmail } from "../../utils/Validation";
import Loading from '../Loading';
import * as firebase from "firebase";
import { withNavigation } from "react-navigation";

const LoginForm = (props) => {
    const { toastRef, navigation } = props;
    const [ mostrarContraseña, setMostrarContraseña ] = useState(true);

    const [ correo, setCorreo ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ isVisibleLoading, setisVisibleLoading ] = useState(false);



    const login = async () => {
        setisVisibleLoading(true);
       //controlar los campos
       if ( !correo || !password){  //si el correo y el password no son nulo ni vacio 
            toastRef.current.show("Todos los campos son obligatorios");
       }else {
           if(!validateEmail(correo)){
            toastRef.current.show("El correo no es valido");
           }else {
               await firebase.auth().signInWithEmailAndPassword(correo, password)
               .then(() => {
                   //si es todo correcto ir a la pagina de mi cuenta
                   navigation.navigate("MyAccount");
               })
               .catch(() => {
                   toastRef.current.show("Email o contraseña incorrecto");
               })
           }
       }
       setisVisibleLoading(false);
    }

    return ( 
        <View style={styles.formContainer}>
            <Input 
                placeholder="Correo electronico"
                containerStyle={styles.inputForm}
                onChange={(e) =>setCorreo(e.nativeEvent.text) }
                rightIcon={
                    <Icon
                    type="material-community"
                    name="at"
                    iconStyle={styles.iconRight}
                    />
                }
            />
            <Input 
                placeholder="Contraeña"
                containerStyle={styles.inputForm}
                password="true"
                secureTextEntry={mostrarContraseña}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ mostrarContraseña ? "eye-outline" : "eye-off-outline"} 
                        iconStyle={styles.iconRight}
                        onPress={()=> setMostrarContraseña(!mostrarContraseña)}
                    />
                }
            />
            <Button 
            title="Iniciar sesión"
            containerStyle={styles.btnContainerLogin}
            buttonStyle={styles.btnLogin}
            onPress={login}
            />
            <Loading isVisible={isVisibleLoading} text="Iniciando Sesion" />
        </View>
     );
}
 
export default withNavigation(LoginForm);

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 30,
    },
    inputForm: {
        width: "100%",
        marginTop: 20,
    },
    iconRight:{
        color:"#c1c1c1"
    },
    btnContainerLogin: {
        marginTop: 20,
        width: "95%"
    },
    btnLogin: {
        backgroundColor: "#00a680"
    }
})