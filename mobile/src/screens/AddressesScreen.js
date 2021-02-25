import React, { Component } from "react";
import { ActivityIndicator, StatusBar, StyleSheet } from "react-native";
import { Box, Text } from "react-native-design-utility";
import { EvilIcons } from "@expo/vector-icons";
import { inject, observer } from "mobx-react/native";
import { observable, action, when } from "mobx";

import { theme } from "../constants/theme";
import Button from "../commons/Button";
import HeaderBtn from "../commons/HeaderBtn";

@inject('authStore')
@observer
class AddressesScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const headerRight = navigation.getParam('showAddBtn') ? (
            <HeaderBtn right onPress={navigation.getParam('handleAddAddressPress')}>
                <Text color='green'>Add</Text>
            </HeaderBtn>
        ) : null;

        return {
            title: 'Addresses',
            headerRight
        }
    };

    @observable isLoading = false;

    constructor(props) {
        super(props);

        when(
            () => !props.authStore.info.addressesIsEmpty, 
            () => {
                this.setAddButton();
            }
        )
    }

    componentDidMount() {
        this.fetchAddresses();
    }

    @action.bound
    async fetchAddresses() {
        try {
            this.isLoading = true;
            await this.props.authStore.info.getAddresses();
            this.isLoading = false;
        } catch (error) {
            console.log('error', error);
        }
    }

    setAddButton = () => {
        this.props.navigation.setParams({
            showAddBtn: true,
            handleAddAddressPress: this.handleAddAddressPress,
        })
    }
    
    handleAddAddressPress = () => {
        this.props.navigation.navigate('AddressForm')
    };

    renderIfEmpty = () => (
        <Box f={1} center bg='white' px='md'>
            <StatusBar barStyle='dark-content' />
            <Box center mb="md">
                <EvilIcons name='location' color={theme.color.black} size={200} />
            </Box>
            <Box center mb="md">
                <Text bold>Add Address</Text>
                <Text size="sm" color="greyLight">You haven't added an address yet.</Text>
            </Box>
            <Box w="100%">
                <Button style={styles.button} onPress={this.handleAddAddressPress}>
                    <Text bold color='white'>
                        Add address
                    </Text>
                </Button>
            </Box>
        </Box>
    )
	render() {
        if (this.isLoading) {
            return (
                <Box f={1} center bg="white">
                    <ActivityIndicator color={theme.color.green} size="large"/>
                </Box>
            )
        }

        if (this.props.authStore.info.addressesIsEmpty) {
            return this.renderIfEmpty();
        }
		return (
			<Box f={1} center bg='white' px='md'>
                <StatusBar barStyle='dark-content' />
                {this.props.authStore.info.addresses.map(address => (
                    <Box key={address._id}>
                        <Text>{address.street}</Text>
                    </Box>
                ))}
            </Box>
		);
	}
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.color.green,
        width: '90%',
    }
})

export default AddressesScreen;
