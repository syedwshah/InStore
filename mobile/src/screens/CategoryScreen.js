import { inject } from "mobx-react/native";
import React, { Component } from "react";
import { Box } from "react-native-design-utility";
import ProductCard from "../components/ProductCard";
import { ScrollView } from 'react-native';

@inject('productsStore')
class CategoryScreen extends Component {
	//Serialized params data expected to be obtained from CategoryCard components
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