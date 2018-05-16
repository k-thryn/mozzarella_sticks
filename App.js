import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Alert } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>mozzarella stick</Text>
        <MozzarellaStick></MozzarellaStick>
      </View>
    );
  }
}

class MozzarellaStick extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isGrinning: false};
    }
    
    _onPress() {
        this.setState(previousState => {
                      return {isGrinning: !(previousState.isGrinning)};
                      });
    }
    
    _onLongPress() {
        Alert.alert('MUUUUSSSZZZAREELL');
    }
    
    render() {
        let img = this.state.isGrinning ? require('./img/mozz-stick-grin.png') : require('./img/mozz-stick.png');
        return (
                <TouchableHighlight onPress={this._onPress.bind(this)} onLongPress={this._onLongPress} underlayColor="black">
                    <Image source={img}/>
                </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
