import React, { Component } from "react";
import { Box, Text } from "react-native-design-utility";
import { inject } from "mobx-react/native";

import OnBoardingLogo from "../commons/OnboardingLogo";
// import { NavigationService } from "../api/NavigationService";

@inject("authStore")
class SplashScreen extends Component {
	state = {};

	componentDidMount() {
		this.checkAuth();
	}

	checkAuth = async () => {
		await this.props.authStore.setupAuth();
	};

	render() {
		return (
			<Box f={1} center>
				<OnBoardingLogo />
			</Box>
		);
	}
}

export default SplashScreen;
