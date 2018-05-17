import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

// Custom button implementation for a prettier UI.

export default class MapButton extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
                <TouchableOpacity onPress={this.onPressBtn} style={{backgroundColor:'gray', height: 25, paddingLeft: 10, paddingRight: 10}}>
                <Text>{this.props.title}</Text>
                </TouchableOpacity>
        );
    }
}
