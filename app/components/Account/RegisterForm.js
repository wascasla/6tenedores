import React, { useState} from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";
import Loading from "../Loading";
import { withNavigation }  from "react-navigation";

const RegisterForm = (props) => {

    const { toastRef, navigation } = props;

    const [hidepassword, setHidePassword ] = useState(true);
    const [hidepasswordRepeat, setHidePasswordRepat ] = useState(true);
    const [email, setEmail ] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [isVisibleLoading, setIsVisibleLoading] = useState(false);

    const register =  async() => {
        setIsVisibleLoading(true);

        // controlar datos
        if (!email || !password || !repeatPassword) {            
            toastRef.current.show("Todos los campos son obligatorios");
            
        } else {
            if(!validateEmail(email)){
                
                toastRef.current.show("El email no es correcto");
                
            }else {
                if (password !== repeatPassword) {
                    
                    toastRef.current.show("Las contraseñas no coinciden");   
                }else{
                    // cregistrar en la base de datos
                    await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email,password)
                    .then(() => {
                        //toastRef.current.show("El usuario fue creado correctamente");
                        navigation.navigate("MyAccount");
                    })
                    .catch(() => {
                        toastRef.current.show("Error al crear la cuenta, intenta nuevamente");
                    })

                }
            }
            
        }
        setIsVisibleLoading(false);
        
    }


    return ( 
        <View style={styles.formContainer}>
            <Input 
                placeholder="Correo electronico"
                containerStyle={styles.inputForm}
                onChange={(e) => setEmail(e.nativeEvent.text)}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
            />
            <Input 
                placeholder="Contraseña"
                password="true"
                secureTextEntry={hidepassword}
                containerStyle={styles.inputForm}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name={ hidepassword ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setHidePassword(!hidepassword)}
                    />
                }
            />
            {/* repetir contraseña */}
            <Input 
                placeholder="Repetir contraseña"
                password="true"
                secureTextEntry={hidepasswordRepeat}
                containerStyle={styles.inputForm}
                onChange={(e) => setRepeatPassword(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ hidepasswordRepeat ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setHidePasswordRepat(!hidepasswordRepeat) }
                    />
                }
            />
            <Button 
                title="Unirse"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={register}
            />
            <Loading text="Creando cuenta" isVisible={isVisibleLoading} />

        </View>
     );
}
 
export default withNavigation(RegisterForm);

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 30
    },
    inputForm: {
        width: "100",
        marginTop: 20

    },
    iconRight: {
        color: "#c1c1c1"

    },
    btnContainerRegister: {
        marginTop: 20,
        width: "95%"
    },
    btnRegister: {
        backgroundColor: "#00a680"
    }
})