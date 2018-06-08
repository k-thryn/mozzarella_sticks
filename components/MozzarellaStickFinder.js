import React from 'react';
import { Animated, View, StyleSheet, Text } from 'react-native';
import { MapView, Permissions, Location } from 'expo';
import MapButton from './MapButton.js';
import Vendor from './Vendor.js';
import MozzMap from './MozzMap.js';

export default class MozzarellaStickFinder extends React.Component {
    constructor(props) {
        super(props);
        let initialFlex = props.show ? 1 : 0;
        this.state = {flex: new Animated.Value(initialFlex), sticks: []};
    }
    
    // On props or state change
    componentDidUpdate(prevProps, prevState) {
        // Animate flex value on map toggle
        if (prevProps.show != this.props.show) {
            Animated.timing(
                            this.state.flex,
                            {
                            toValue: this.props.show ? .5 : 0,
                            duration: 500,
                            }
                            ).start();
        }
        if (this.props.show && (prevState.showMap != this.state.showMap)) {
            Animated.timing(
                            this.state.flex,
                            {
                            toValue: this.state.showMap ? 1 : .5,
                            duration: 500,
                            }
                            ).start();
        }
        // On region change - refresh list of nearby vendors
        if (prevState.region != this.state.region) {
            this.onRegionChange();
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
            latitudeDelta: .01,
            longitudeDelta: .01
            }
            this.setState(previousState => {
                          return { location: location, region: region };
                          });
        }
    }
    
    // On press for 'enter zip code' option
    onPressEnterZip() {
        alert('zippity zip zip');
    }
    
    // on map region change
    async onRegionChange() {
        let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.region.latitude},${this.state.region.longitude}&radius=10000&keyword=mozzarella%20sticks&key=AIzaSyBcjH-PDXCfO2nwn_r2I8lavt2zVc07pnw`;
        let response = await fetch(url);
        let responseJson = await response.json();
        let results = responseJson.results;
        this.setState(previousState => {
                      return { showMap: true, sticks: results };
                      });
    }
    
    // Hide map.
    removeRegion() {
        this.setState({ showMap: false });
    }
    
    // Render component
    render() {
        if (this.props.show) {
            let { flex, location, region, sticks, showMap } = this.state;
            if (!showMap)
            {                return (
                        <Animated.View style={{flex: flex, position: 'relative', alignSelf: 'stretch'}}>
                        <View style={styles.buttonRow}>
                        <MapButton onPress={this.onPressCurrentLoc.bind(this)}>Use current location</MapButton>
                        </View>
                        </Animated.View>
                )
            }
            else {
                return (
                        <MozzMap flex={flex} region={region} exit={this.removeRegion.bind(this)} sticks={sticks} />
                        )
            }
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
