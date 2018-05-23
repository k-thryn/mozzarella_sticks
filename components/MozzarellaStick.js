import React from 'react';
import { View, TouchableWithoutFeedback, Image } from 'react-native';
import MozzarellaStickFinder from './MozzarellaStickFinder.js';

const softSmileMozz = require('../img/mozz-stick.png');
const grinningMozz = require('../img/mozz-stick-grin.png');

export default class MozzarellaStick extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isGrinning: false, showMap: false};
    }
    
    _onPress() {
        // Make the mozzarella stick smile. :) And toggle the map display
        this.setState(previousState => {
                      return {isGrinning: !(previousState.isGrinning), showMap: !(previousState.showMap)};
                      });
    }
    
    
    
    
    // because I CAN
    _onLongPress() {
        Alert.alert('MUUUUSSSZZZAREELL');
    }
    
    render() {
        let img = this.state.isGrinning ? grinningMozz : softSmileMozz;
        return (
                <View>
                <TouchableWithoutFeedback onPress={this._onPress.bind(this)} onLongPress={this._onLongPress}>
                <Image source={img}/>
                </TouchableWithoutFeedback>
                <MozzarellaStickFinder showMap={this.state.showMap} locationPermissionsGranted={false}></MozzarellaStickFinder>
                </View>
                );
    }
}
