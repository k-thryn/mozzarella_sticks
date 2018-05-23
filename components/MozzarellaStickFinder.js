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
    
    // On props change - are we still being displayed?
    componentWillReceiveProps(nextProps) {
        // Animate flex value on map toggle
        if (nextProps.showMap != this.props.showMap) {
            this.setState(previousState => {
                          return { visible: true, flex: previousState.flex, location: previousState.location };
                          });
            Animated.timing(
                            this.state.flex,
                            {
                            toValue: nextProps.showMap ? 1 : 0,
                            duration: 1000,
                            }
                            ).start();
        }
    }
    
    // Register location permissions.
    async getPermissions() {
        // Get current permission status.
        const { status } = await Permissions.getAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            Alert.alert('Enable location permissions to find mozzarella sticks near you.');
            // Ask for permission.
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            return (status === 'granted');
        } else {
            return true;
        }
    }
    
    // On press for 'use current location' option
    async onPressCurrentLoc() {
        // consent 👏 is 👏 sexy 👏
        await this.getPermissions();
        
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        
        if (location && location.coords) {
            let region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: .001,
            longitudeDelta: .001
            }
            this.setState(previousState => {
                          return { visible: previousState.visible, flex: previousState.flex, location: location, region: region};
                          });
        }
    }
    
    // On press for 'enter zip code' option
    onPressEnterZip() {
        alert('zippity zip zip');
    }
    
    // Render component
    render() {
        if (this.state.visible) {
            let { flex, location, region } = this.state;
            return (
                    <Animated.View style={{flex: flex, position: 'relative', alignSelf: 'stretch'}}>
                    <MapView style={[StyleSheet.absoluteFill, styles.map]}
                    region={region}>
                    <View style={styles.buttonRow}>
                    <MapButton onPress={this.onPressCurrentLoc.bind(this)}>Use current location</MapButton>
                    <MapButton onPress={this.onPressEnterZip.bind(this)}>Enter zip code</MapButton>
                    </View>
                    // marker for current location, if there is one
                    {region && (
                    <MapView.Marker coordinate={{latitude: region.latitude, longitude: region.longitude}}/>
                    )}
                    
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
