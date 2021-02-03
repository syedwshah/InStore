import React, { PureComponent } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Box } from 'react-native-design-utility';

import { theme } from "../constants/theme";

class Input extends PureComponent {
    state = {  }
    render() {
        const { containerStyle, ...rest } = this.props;
        return (
            <Box w={'100%'} h={50} p="xs" radius={6} mb='xs'
                style={[
                    {
                        borderWidth: 1,
                        borderColor: theme.color.greyLight,
                    },
                    containerStyle,
                ]}
            >
                <TextInput {...rest} style={styles.input} selectionColor={theme.color.green}>

                </TextInput>
            </Box>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
    }
})

export default Input;