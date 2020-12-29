import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Box, Text } from "react-native-design-utility";

class ShoppingCartScreen extends Component {
	state = {};
	render() {
		return (
			<Box f={1} center>
				<StatusBar barStyle='light-content' />
				<Text>ShoppingCart Screen</Text>
			</Box>
		);
	}
}

export default ShoppingCartScreen;
