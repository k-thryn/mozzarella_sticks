import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MozzarellaStick from './components/MozzarellaStick.js';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showMap: false};
    }
    
    render() {
        return (
                <ScrollView contentContainerStyle={styles.container}>
                <Text>mozzarella stick</Text>
                <MozzarellaStick />
                </ScrollView>
                );
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
                                 }
                                 });
