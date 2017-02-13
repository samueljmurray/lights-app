/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { ColorPicker, fromHsv } from 'react-native-color-picker';

class Lights extends Component {
  state: {
    colour: string;
  };

  constructor(props) {
    super(props);
    this.state = {
      colour: "#FFAA00"
    }
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  setColour(colour) {
    const rgb = this.hexToRgb(colour);
    fetch(`http://raspberrypi-sunrise:9000/colour/${rgb.r}/${rgb.g}/${rgb.b}/255`)
    this.setState({...this.state, colour: colour});
  }

  lightsOn() {
    const rgb = this.hexToRgb(this.state.colour);
    fetch(`http://raspberrypi-sunrise:9000/colour/${rgb.r}/${rgb.g}/${rgb.b}/255`)
  }

  lightsOff() {
    fetch("http://raspberrypi-sunrise:9000/off")
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <ColorPicker
          defaultColor={this.state.colour}
          onColorSelected={this.setColour.bind(this)}
          style={{flex: 3, width: Dimensions.get("window").width - 48, marginBottom: 60}}
          sliderMinimumTrackTintColor="rgb(60, 80, 138)"
          sliderMaximumTrackTintColor="rgb(40, 40, 58)"
        />
        <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
          <TouchableOpacity
            onPress={this.lightsOff.bind(this)}
            style={styles.button}
          >
            <Text style={{color: "white", fontSize: 18, fontWeight: "300"}}>Off</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.lightsOn.bind(this)}
            style={styles.button}
          >
            <Text style={{color: "white", fontSize: 18, fontWeight: "300"}}>On</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(18, 10, 38)',
    padding: 24
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "white",
    padding: 0,
    borderRadius: 80,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 40,
    marginRight: 40
  }
});

AppRegistry.registerComponent('Lights', () => Lights);

export default Lights;
