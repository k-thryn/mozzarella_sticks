import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

// Custom button implementation for a prettier UI.

export default class MapButton extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
                <TouchableOpacity style={styles.button} onPress={this.onPressBtn}>
                <Text style={styles.buttonText}>{this.props.title}</Text>
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
                                 borderRadius: 25,
                                 borderWidth: 1,
                                 borderColor: 'lightgray',
                                 alignItems: 'center',
                                 flex: 1
                                 },
                                 // Button text
                                 buttonText: {
                                 padding: 20,
                                 color: 'black',
                                 //alignSelf: 'center',
                                 }
});
