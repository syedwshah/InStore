import {
	createStackNavigator,
	createSwitchNavigator,
	createBottomTabNavigator,
} from "react-navigation";
import React, { Component } from "react";

import { NavigationService } from "../api/NavigationService";
import { theme } from "../constants/theme";
import TabBar from "../components/TabBar";
import ShoppingCartIcon from "../components/ShoppingCartIcon";

const primaryHeader = {
	headerStyle: {
		backgroundColor: theme.color.green,
	},
	headerTintColor: theme.color.white,
	headerTitleStyle: {
		fontWeight: "400",
	},
};

const AuthNavigator = createStackNavigator(
	{
		Login: {
			getScreen: () => require("./LoginScreen").default,
		},
	},
	{
		navigationOptions: {
			header: null,
		},
	}
);

const HomeStack = createStackNavigator(
	{
		Home: {
			getScreen: () => require("./HomeScreen").default,
		},
		Category: {
			getScreen: () => require("./CategoryScreen").default,
		},
	},
	{
		navigationOptions: { ...primaryHeader, headerRight: <ShoppingCartIcon /> },
	}
);


const TabNavigator = createBottomTabNavigator(
	{
		Home: HomeStack,
		List: {
			getScreen: () => require("./ListScreen").default,
		},
		Stores: {
			getScreen: () => require("./StoresScreen").default,
		},
		Order: {
			getScreen: () => require("./OrderScreen").default,
		},
	},
	{
		tabBarComponent: (props) => <TabBar {...props} />,
	}
);

const ShoppingCartNavigator = createStackNavigator(
	{
		ShoppingCart: {
			getScreen: () => require("./ShoppingCartScreen").default,
			navigationOptions: {
				headerStyle: {
					backgroundColor: theme.color.white,
				}
			}
		}
	}
)

const MainNavigator = createStackNavigator(
	{
		Tab: TabNavigator,
		ShoppingCart: ShoppingCartNavigator,
	},
	{
		navigationOptions: {
			header: null,
		},
	}
);

const AppNavigator = createSwitchNavigator(
	{
		Splash: {
			getScreen: () => require("./SplashScreen").default,
		},
		Auth: AuthNavigator,
		Main: MainNavigator,
	},
	{
		intialRouteName: "Splash",
	}
);

class Navigation extends Component {
	state = {};
	render() {
		return (
			<AppNavigator ref={(r) => NavigationService.setTopLevelNavigator(r)} />
		);
	}
}

export default Navigation;
