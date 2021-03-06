import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box } from 'react-native-design-utility';

import { theme } from '../constants/theme';
import { NavigationService } from "../api/NavigationService";

// Compound Components
const Left = ({ children }) => (
    <Box f={2} align="start">
        {children}
    </Box>
)

const Right = ({ children }) => (
    <Box f={1} align="end">
        {children}
    </Box>
)

class ListColumn extends PureComponent {
    static Left = Left;
    static Right = Right;

    state = {  }

    renderContent = () => (
        <Box dir="row" p="sm" align="center" justify="between" 
            style={{
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: theme.color.greyLight
            }}
        >
            {this.props.children}
        </Box>
    )

    handlePress = () => {
        NavigationService.navigate(this.props.link)
    }

    render() {
        if (this.props.link) {
            return (
                <TouchableOpacity onPress={this.handlePress}>{this.renderContent()}</TouchableOpacity>
            )
        }
        return this.renderContent();
    }
}

export default ListColumn;