import React, { Component } from "react";
import {
	Image,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Animated,
} from "react-native";
import { Box, Text } from "react-native-design-utility";
// import { productImgs } from "../constants/images";
import { theme } from "../constants/theme";
import { Feather } from "@expo/vector-icons";
import { observer } from "mobx-react/native";

const ANIM_DURATION = 200;

const BoxAnimated = Animated.createAnimatedComponent(Box);

@observer
class ProductCard extends Component {
	state = {
		isHover: false,
		cardOpacity: new Animated.Value(1),
		quantityOpacity: new Animated.Value(0),
	};

	handlePlusPress = () => {
		this.fadeIn();
		this.setState({ isHover: true });
		if (this.props.product.cartQuantity === 0) {
			this.props.product.addToCart();
		}
	};

	handleIncrement = () => {
		this.props.product.incCartQty();
	};

	handleDecrement = () => {
		this.props.product.decCartQty();
	};

	handleClose = () => {
		this.fadeOut();
		this.setState({
			isHover: false,
		});
	};

	handleRemove = () => {
		this.handleClose();
		this.props.product.removeFromCart();
	}

	fadeIn = () => {
		Animated.parallel([
			Animated.timing(this.state.quantityOpacity, {
				toValue: 1,
				duration: ANIM_DURATION,
			}).start(),

			Animated.timing(this.state.cardOpacity, {
				toValue: 0.4,
				duration: ANIM_DURATION,
			}).start(),
		]);
	};
	fadeOut = () => {
		Animated.parallel([
			Animated.timing(this.state.quantityOpacity, {
				toValue: 0,
				duration: ANIM_DURATION,
			}).start(),
			Animated.timing(this.state.cardOpacity, {
				toValue: 1,
				duration: ANIM_DURATION,
			}).start(),
		]);
	};
	render() {
		const { isHover, cardOpacity, quantityOpacity } = this.state;
		const { product } = this.props;
		return (
			<Box bg='white' w={150} p='sm' position='relative'>
				<TouchableWithoutFeedback onPress={this.handleClose}>
					<BoxAnimated mb='sm' o={cardOpacity}>
						<Box color='red'>
							<Image
								style={styles.img}
								resizeMode='contain'
								source={product.imageUrl}
							/>
						</Box>
						<Box>
							<Text left size='sm' bold>
								{product.price} each
							</Text>
							<Text left size='xs'>
								{product.name}
							</Text>
							<Text left size='xs' color='greyLight'>
								At ${product.kgPrice.toFixed(2)}/kg
							</Text>
						</Box>
					</BoxAnimated>
				</TouchableWithoutFeedback>
				{!isHover && (
					<TouchableOpacity
						style={styles.plusBtn}
						onPress={this.handlePlusPress}>
						<Box
							circle={25}
							style={{
								borderColor: theme.color.green,
								borderWidth: 1,
							}}
							center
							bg={product.cartQuantity > 0 ? "green" : "white"}>
							{product.cartQuantity > 0 ? (
								<Text color='white' size='sm'>
									{product.cartQuantity}
								</Text>
							) : (
								<Feather name='plus' size={15} color={theme.color.green} />
							)}
						</Box>
					</TouchableOpacity>
				)}
				{isHover && (
					<BoxAnimated
						shadow={0}
						bg='offWhite'
						position='absolute'
						style={{ top: 10, right: 10, left: 10, zIndex: 99 }}
						radius={6}
						o={quantityOpacity}>
						<Box dir='row' align='center' justify='between' p='xs'>
							{product.cartQuantity > 1 ? (
								<TouchableOpacity onPress={this.handleDecrement}>
									<Feather name='minus' color={theme.color.green} size={20} />
								</TouchableOpacity>
							) : (
								<TouchableOpacity onPress={this.handleRemove}>
									<Feather name='trash-2' color={theme.color.green} size={20} />
								</TouchableOpacity>
							)}
							<Text>{product.cartQuantity}</Text>
							<TouchableOpacity onPress={this.handleIncrement}>
								<Feather name='plus' color={theme.color.green} size={20} />
							</TouchableOpacity>
						</Box>
					</BoxAnimated>
				)}
			</Box>
		);
	}
}

const styles = StyleSheet.create({
	img: {
		width: 120,
		height: 100,
	},
	plusBtn: {
		top: 10,
		right: 5,
		position: "absolute",
	},
});

export default ProductCard;
