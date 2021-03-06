import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

// Custom button implementation for a prettier UI.

export default class MapButton extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
                <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
                <Text style={styles.buttonText}>{this.props.children}</Text>
                </TouchableOpacity>
        );
    }
}

// Button styles
const styles = StyleSheet.create({
                                 // Button
                                 button: {
                                 backgroundColor:'white',
                                 opacity: .7,
                                 borderRadius: 15,
                                 borderWidth: 1,
                                 borderColor: 'lightgray',
                                 alignItems: 'center'
                                 },
                                 // Button text
                                 buttonText: {
                                 padding: 15,
                                 color: 'black'
                                 }
});
