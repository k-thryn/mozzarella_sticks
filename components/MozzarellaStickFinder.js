import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { MapView, Permissions, Location } from 'expo';
import MapButton from './MapButton.js';
import Vendor from './Vendor.js';

const grinningMozz = require('../img/italian-hand.png');

export default class MozzarellaStickFinder extends React.Component {
    constructor(props) {
        super(props);
        let initialFlex = props.showMap ? 1 : 0;
        this.state = {visible: props.showMap, flex: new Animated.Value(initialFlex), sticks: []};
    }
    
    // On props or state change
    componentDidUpdate(prevProps, prevState) {
        // Animate flex value on map toggle
        if (prevProps.showMap != this.props.showMap) {
            this.setState(previousState => {
                          return { visible: true };
                          });
            Animated.timing(
                            this.state.flex,
                            {
                            toValue: this.props.showMap ? 1 : 0,
                            duration: 1000,
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
    
    // On map press: for now, creates mozzarella stick locations via press location
    onMapPress(e) {
        let coordinate = e.nativeEvent.coordinate;
    }
    
    // on map region change
    async onRegionChange() {
        let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.region.latitude},${this.state.region.longitude}&radius=10000&keyword=mozzarella%20sticks&key=AIzaSyBcjH-PDXCfO2nwn_r2I8lavt2zVc07pnw`;
        let response = await fetch(url);
        let responseJson = await response.json();
        let results = responseJson.results;
        this.setState(previousState => {
                      return { sticks: results };
                      });
    }
    
    // Render component
    render() {
        if (this.state.visible) {
            let { flex, location, region, sticks } = this.state;
            return (
                    <Animated.View style={{flex: flex, position: 'relative', alignSelf: 'stretch'}}>
                    <MapView style={[StyleSheet.absoluteFill, styles.map]}
                    region={region}
                    onPress={this.onMapPress.bind(this)}>
                    <View style={styles.buttonRow}>
                    <MapButton onPress={this.onPressCurrentLoc.bind(this)}>Use current location</MapButton>
                    </View>
                    // marker for current location, if there is one
                    {region && (
                                <MapView.Marker coordinate={{latitude: region.latitude, longitude: region.longitude}} image={grinningMozz}/>
                    )}
                    // markers for found mozzarella stick locations
                    {sticks.map(stick => (
                                          <Vendor location={stick.geometry.location} key={stick.id} name={stick.name}/> )
                    )
                    }
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
