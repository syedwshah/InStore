import { inject } from "mobx-react/native";
import React, { Component } from "react";
import { Box } from "react-native-design-utility";
import ProductCard from "../components/ProductCard";
import { ScrollView } from 'react-native';
import { productImgs } from "../constants/images";

@inject('productsStore')
class CategoryScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: navigation.getParam("name", "Instore"),
	});

	state = {};
	render() {
		const { data } = this.props.productsStore;
		return (
			<Box>
				<ScrollView horizontal showsHorizontalScrollIndicator={false} >
					{data.map(product => (
						<ProductCard key={product.id} product={product} />
					))}
				</ScrollView>
			</Box>
		);
	}
}

export default CategoryScreen;
