import { inject } from "mobx-react/native";
import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Box, Text } from "react-native-design-utility";

@inject('shoppingCartStore')
class ShoppingCartScreen extends Component {
	static navigationOptions = {
		title: 'My Cart'
	}
	state = {};

	renderList = () => {
		const { products } = this.props.shoppingCartStore;

		if (products.length === 0) {
			return (
				<Box>
					<Text>Cart Empty</Text>
				</Box>
			)
		}

		return products.map(product => (
			<Box key={product.id} dir="row" align="center">
				<Text mr="sm">{product.name}</Text>
				<Text>Quantity: {product.cartQuantity}</Text>
			</Box>
		))
	}

	render() {
		return (
			<Box f={1} center>
				<StatusBar barStyle='dark-content' />
				{this.renderList()}
			</Box>
		);
	}
}

export default ShoppingCartScreen;
