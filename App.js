import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Row, TouchableWithoutFeedback, Alert, Animated } from 'react-native';
import { MapView, Permissions, Location } from 'expo';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showMap: false};
    }
    
    render() {
        return (
                <ScrollView contentContainerStyle={styles.container}>
                <Text>mozzarella stick</Text>
                <MozzarellaStick></MozzarellaStick>
                </ScrollView>
                );
    }
}

class MozzarellaStick extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isGrinning: false, showMap: false};
    }
    
    _onPress() {
        // Make the mozzarella stick smile. :) And toggle the map display
        this.setState(previousState => {
                      return {isGrinning: !(previousState.isGrinning), showMap: !(previousState.showMap)};
                      });
        if (this.state.showMap) {
            let locationAllowed = this.getPermissions();
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
    
    
    // because I CAN
    _onLongPress() {
        Alert.alert('MUUUUSSSZZZAREELL');
    }
    
    render() {
        let img = this.state.isGrinning ? require('./img/mozz-stick-grin.png') : require('./img/mozz-stick.png');
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

class MozzarellaStickFinder extends React.Component {
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
        // See if permissions have been granted.     TODO: may not need this
        if (nextProps.locationPermissionsGranted != this.props.locationPermissionsGranted) {
            
        }
    }
    
    render() {
        if (this.state.visible) {
            let { flex } = this.state;
            return (
                    <Animated.View style={{flex: flex, position: 'relative', alignSelf: 'stretch'}}>
                    <MapView style={styles.map}></MapView>
                    </Animated.View>
                    );
        }
        else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
                                 // container styles
                                 container: {
                                 flex: 1,
                                 position: 'relative',
                                 backgroundColor: '#fff',
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 top: 25,
                                 left: 0,
                                 right: 0,
                                 bottom: 0,
                                 },
                                 // map styles
                                 map: {
                                 ...StyleSheet.absoluteFillObject
                                 }
                                 });
