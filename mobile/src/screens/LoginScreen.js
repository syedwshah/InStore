import React, { Component } from 'react';
import { Box, Text} from 'react-native-design-utility';
import { TouchableOpacity, Alert, Animated } from "react-native";

import OnBoardingLogo from '../commons/OnboardingLogo';
import LoginButton from '../commons/LoginButton';
import { FacebookApi } from '../api/Facebook';
import { GoogleApi } from '../api/Google';

const BoxAnimated = Animated.createAnimatedComponent(Box);

class LoginScreen extends Component {
    state = { 
        opacity: new Animated.Value(0),
        position: new Animated.Value(0),
     }

     componentDidMount() {
         Animated.parallel([this.positionAnim(), this.opacityAnim()]).start();
     }

     opacityAnim = () => {
         Animated.timing(this.state.opacity, {
             toValue: 1,
             duration: 200,
             delay: 300, 
         }).start()
     }

     positionAnim = () => {
        Animated.timing(this.state.position, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start()
    }

    onGooglePress = async () => {
        try {
            const token = await GoogleApi.loginAsync();

            console.log("token", token);
            
        } catch (error) {
            console.log('error', error);
        }
    }

    onFacebookPress = async () => {
        try {
            const token = await FacebookApi.loginAsync();

            console.log("token", token);
            
        } catch (error) {
            console.log('error', error);
        }
    }

    render() { 
        const { opacity } = this.state;

        const logoTranslate = this.state.position.interpolate({
            inputRange: [0, 1],
            outputRange: [150, 0],
        })

        return ( 
            <Box f={1} center bg="white">
                <BoxAnimated f={1} style={{ 
                    transform: [
                        {
                            translateY: logoTranslate,
                        }
                    ]
                }}>
                    <Box f={1} center>
                        <OnBoardingLogo />
                    </Box>
                </BoxAnimated>

                <BoxAnimated f={0.9} w="100%" style={{ opacity }}>
                    <LoginButton onPress={this.onGooglePress} children="Contine with Google" type="google"/>
                    <LoginButton onPress={this.onFacebookPress} children="Contine with Facebook" type="facebook"/>
                </BoxAnimated>
            </Box>
         )
    }
}
 
export default LoginScreen;