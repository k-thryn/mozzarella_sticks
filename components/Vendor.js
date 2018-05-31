import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MapView } from 'expo';

const grinningMozz = require('../img/mozz-stick-pin.png');

// Representing a mozzarella stick vendor. Has a location (latitude/longitude), as well as business info (details TBD)
// Props: location, name (so far)
// State: selected (boolean)
export default class Vendor extends React.Component {
    constructor(props) {
        super(props);
    }
    
    onSelect() {
      //  alert(this.props.name);
    }
    
    render() {
        return (
                <TouchableOpacity onPress={this.onSelect}>
                <MapView.Marker
                title={this.props.name}
                image={grinningMozz}
                coordinate={{latitude: this.props.location.lat, longitude: this.props.location.lng}}
                />
                </TouchableOpacity>
        )
    }
}
