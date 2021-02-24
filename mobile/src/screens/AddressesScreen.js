import React, { Component } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { Box, Text } from "react-native-design-utility";
import { EvilIcons } from "@expo/vector-icons";
import { inject, observer } from "mobx-react/native";

import { theme } from "../constants/theme";
import Button from "../commons/Button";

@inject('authStore')
@observer
class AddressesScreen extends Component {
    static navigationOptions = {
        title: 'Addresses',
    };

    state = {};
    
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
