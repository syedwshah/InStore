import React, { Component } from "react";
import {
	Image,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Animated,
} from "react-native";
import { Box, Text } from "react-native-design-utility";
import { productImgs } from "../constants/images";
import { theme } from "../constants/theme";
import { Feather } from "@expo/vector-icons";

const ANIM_DURATION = 200;

const BoxAnimated = Animated.createAnimatedComponent(Box);

class ProductCard extends Component {
	state = {
		isHover: false,
		quantity: 1,
		cardOpacity: new Animated.Value(1),
		quantityOpacity: new Animated.Value(0),
	};

	handlePlusPress = () => {
		this.fadeIn();
		this.setState({ isHover: true });
	};

	handleIncrement = () => {
		this.setState((s) => ({ quantity: s.quantity + 1 }));
	};

	handleDecrement = () => {
		this.setState((s) => ({ quantity: s.quantity - 1 }));
	};

	handleClose = () => {
		this.fadeOut();
		this.setState({
			isHover: false,
		});
	};
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
		const { isHover, quantity, cardOpacity, quantityOpacity } = this.state;
		return (
			<Box bg='white' w={150} p='sm' position='relative'>
				<TouchableWithoutFeedback onPress={this.handleClose}>
					<BoxAnimated mb='sm' o={cardOpacity}>
						<Box color='red'>
							<Image
								style={styles.img}
								resizeMode='contain'
								source={productImgs.apple}
							/>
						</Box>
						<Box>
							<Text left size='sm' bold>
								$1.19 each
							</Text>
							<Text left size='xs'>
								Red Apple
							</Text>
							<Text left size='xs' color='greyLight'>
								At $10.12/kg
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
							bg={quantity > 1 ? "green" : "white"}>
							{quantity > 1 ? (
								<Text color='white' size='sm'>
									{quantity}
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
							{quantity > 1 ? (
								<TouchableOpacity onPress={this.handleDecrement}>
									<Feather name='minus' color={theme.color.green} size={20} />
								</TouchableOpacity>
							) : (
								<TouchableOpacity onPress={this.handleClose}>
									<Feather name='trash-2' color={theme.color.green} size={20} />
								</TouchableOpacity>
							)}
							<Text>{quantity}</Text>
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
