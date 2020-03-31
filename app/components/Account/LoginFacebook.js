import React from 'react';
import { SocialIcon } from 'react-native-elements';

const LoginFacebook = () => {

    const login = () => {
        
    }

    return ( 
        <SocialIcon 
            title="Iniciar sesion con Facebook"
            button
            type="facebook"
            onPress={login}
        />
     );
}
 
export default LoginFacebook;