import React, { Component } from 'react';
import { Box, Text} from 'react-native-design-utility';
import { TouchableOpacity, Alert, Animated } from "react-native";

import OnBoardingLogo from '../commons/OnboardingLogo';
import LoginButton from '../commons/LoginButton';

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

    onGooglePress = () => {
        Alert.alert('Google Press');
    }

    onFacebookPress = () => {
        Alert.alert('Facebook Press');
    }

    render() { 
        const { opacity } = this.state;

        const logoTranslate = this.state.position.interpolate({
            inputRange: [0, 1],
            outputRange: [150, 0],
        })

        return ( 
            <Box f={1} center bg="white">
                <Animated.View style={{ 
                    flex: 1,
                    transform: [
                        {
                            translateY: logoTranslate,
                        }
                    ]
                }}>
                    <Box f={1} center>
                        <OnBoardingLogo />
                    </Box>
                </Animated.View>

                <Animated.View style={{ flex:.9, width: '100%', opacity }}>
                    <LoginButton onPress={this.onGooglePress} children="Contine with Google" type="google"/>
                    <LoginButton onPress={this.onFacebookPress} children="Contine with Facebook" type="facebook"/>
                </Animated.View>
            </Box>
         )
    }
}
 
export default LoginScreen;