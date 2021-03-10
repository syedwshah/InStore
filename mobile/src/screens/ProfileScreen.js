import { inject } from "mobx-react/native";
import React, { Component } from "react";
import { ScrollView, StatusBar, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Box, Text } from "react-native-design-utility";

import CloseBtn from "../commons/CloseBtn";
import ListColumn from "../components/ListColumn";
import { theme } from '../constants/theme';

import {
	MaterialIcons,
	EvilIcons,
	Ionicons,
	Feather,
  } from '@expo/vector-icons';

  const baseIconStyle = {
	  size: 25,
	  color: theme.color.grey,
};
  
const LINKS = [
	{
		link: 'Share',
		title: 'Invite friends',
		icon: <EvilIcons name="share-apple" {...baseIconStyle} />,
	},
	{
		link: 'Help',
		title: 'Help',
		icon: <Ionicons name="ios-help-circle-outline" {...baseIconStyle} />,
	},
	{
		link: 'About',
		title: 'About this app',
		icon: <Ionicons name="ios-information-circle-outline" {...baseIconStyle} />,
	},
	{
		link: 'Settings',
		title: 'Your accounts settings',
		icon: <Feather name="settings" {...baseIconStyle} />,
	},
];

@inject('authStore')
class ProfileScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: "My Profile",
		headerLeft: <CloseBtn left size={25} onPress={() => navigation.goBack(null)} />
	});
	
	state = {};

	logout = async () => {
		await this.props.authStore.logout();

		NavigationService.navigate('Splash');
	}

	render() {
		const { authStore } = this.props;
		return (
			<Box f={1} bg="white">
				<StatusBar barStyle='dark-content' />
				<ScrollView>
					<ListColumn>
						<ListColumn.Left>
							<Text size='xl' bold>
								Hi, {authStore.info.firstName}
							</Text>
						</ListColumn.Left>
						
						<ListColumn.Right>
							<Box>
								<Image style={styles.avatar} source={{ uri: authStore.info.avatarUrl }} />
							</Box>
						</ListColumn.Right>
					</ListColumn>

					{LINKS.map(el => (
						<ListColumn link={el.link} key={el.title}>
							<ListColumn.Left>
								<Box dir="row" align="center">
									<Box f={.3}>{el.icon}</Box>

									<Box f={1}>
										<Text>{el.title}</Text>
									</Box>
								</Box>
							</ListColumn.Left>
							
							<ListColumn.Right>
								<MaterialIcons name="keyboard-arrow-right" {...baseIconStyle} />
							</ListColumn.Right>
						</ListColumn>
					))}

					<TouchableOpacity style={styles.logoutBtn} onPress={this.logout}>
						<Text bold color='green'>
							Log out
						</Text>
					</TouchableOpacity>
				</ScrollView>
			</Box>
		);
	}
}

const styles = StyleSheet.create({
	avatar: {
		height: 50, width: 50, borderRadius: 25
	},
	logoutBtn: {
		borderWidth: 1,
		borderColor: theme.color.green,
		borderRadius: 6,
		alignItems: 'center',
		justifyContent: 'center',
		width: '90%',
		alignSelf: 'center',
		height: 40,
		marginTop: 20,
	}
});

export default ProfileScreen;
