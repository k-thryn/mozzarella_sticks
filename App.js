import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Row, TouchableWithoutFeedback, Alert } from 'react-native';
import { MapView } from 'expo';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showMap: false};
        this.toggleShowMap = this.toggleShowMap.bind(this);
    }
    
    // Handler function to allow child components to toggle showMap flag.
    toggleShowMap() {
        this.setState(previousState => {
                      return {showMap: !(previousState.showMap)};
                      });
    }
    
    render() {
        return (
                <ScrollView contentContainerStyle={styles.container}>
                <Text>mozzarella stick</Text>
                <MozzarellaStick toggleShowMap={this.toggleShowMap}></MozzarellaStick>
                <MozzarellaStickFinder showMap={this.state.showMap}></MozzarellaStickFinder>
                </ScrollView>
                );
    }
}

class MozzarellaStick extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isGrinning: false};
    }
    
    _onPress() {
        // Make the mozzarella stick smile. :)
        this.setState(previousState => {
                      return {isGrinning: !(previousState.isGrinning)};
                      });
        // Toggle showing the map.
        this.props.toggleShowMap();
    }
    
    _onLongPress() {
        Alert.alert('MOOZADELL');
    }
    
    render() {
        let img = this.state.isGrinning ? require('./img/mozz-stick-grin.png') : require('./img/mozz-stick.png');
        return (
                <TouchableWithoutFeedback onPress={this._onPress.bind(this)} onLongPress={this._onLongPress}>
                <Image source={img}/>
                </TouchableWithoutFeedback>
                );
    }
}

class MozzarellaStickFinder extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        if (this.props.showMap) {
            return (
                    <View style={{flex: 1, position:'relative', alignSelf:'stretch'}}>
                    <MapView style={styles.map}></MapView>
                    </View>
                    );
        }
        else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
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
                                 map: {
                                    ...StyleSheet.absoluteFillObject
                                 }
                                 });
