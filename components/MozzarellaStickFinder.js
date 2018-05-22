import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { MapView, Permissions, Location } from 'expo';
import MapButton from './MapButton.js';

export default class MozzarellaStickFinder extends React.Component {
    constructor(props) {
        super(props);
        let initialFlex = props.showMap ? 1 : 0;
        this.state = {visible: props.showMap, flex: new Animated.Value(initialFlex)};
    }
    
    // On props change
    componentWillReceiveProps(nextProps) {
        // Animate flex value on map toggle
        if (nextProps.showMap != this.props.showMap) {
            this.setState({ visible: true, flex: this.state.flex });
            Animated.timing(
                            this.state.flex,
                            {
                            toValue: nextProps.showMap ? 1 : 0,
                            duration: 1000,
                            }
                            ).start();
        }
    }
    
    // On press for 'use current location' option
    onPressCurrentLoc() {
        alert('on current loc');
    }
    
    // On press for 'enter zip code' option
    onPressEnterZip() {
        alert('zippity zip zip');
    }
    
    render() {
        if (this.state.visible) {
            let { flex } = this.state;
            return (
                    <Animated.View style={{flex: flex, position: 'relative', alignSelf: 'stretch'}}>
                    <MapView style={[StyleSheet.absoluteFill, styles.map]}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', top: 0}}>
                    <MapButton onPress={this.onPressCurrentLoc.bind(this)}>Use current location</MapButton>
                    <MapButton onPress={this.onPressEnterZip.bind(this)}>Enter zip code</MapButton>
                    </View>
                    </MapView>
                    </Animated.View>
                    );
        }
        else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
                  // map styles
                  map: {
                  zIndex: -1,
                  }
})
