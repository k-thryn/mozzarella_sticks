import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { MapView } from 'expo';
import MapButton from './MapButton.js';
import Vendor from './Vendor.js';

const grinningMozz = require('../img/italian-hand.png');

// Component for map display.
// Props: flex, region, exit (function), sticks
export default class MozzMap extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
                <Animated.View style={{flex: this.props.flex, position: 'relative', alignSelf: 'stretch'}}>
                <MapView style={[StyleSheet.absoluteFill, styles.map]}
                region={this.props.region}>
                <View style={styles.buttonRow}>
                <MapButton onPress={this.props.exit}>←</MapButton>
                </View>
                // marker for current location
                <MapView.Marker coordinate={{latitude: this.props.region.latitude, longitude: this.props.region.longitude}} image={grinningMozz}/>
                // markers for found mozzarella stick locations
                {this.props.sticks.map(stick => (
                                      <Vendor location={stick.geometry.location} key={stick.id} name={stick.name}/> )
                            )
                }
                </MapView>
                </Animated.View>
                );
    }
}

const styles = StyleSheet.create({
                                 // map styles
                                 map: {
                                 zIndex: -1,
                                 },
                                 // button row
                                 buttonRow: {
                                 flex: 1,
                                 flexDirection: 'row',
                                 justifyContent: 'space-between',
                                 position: 'absolute',
                                 top: 0
                                 }
})
