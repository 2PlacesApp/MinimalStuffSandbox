'use strict';

import React, {
  Component
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import MapView from 'react-native-maps';

const {
  width,
  height
} = Dimensions.get('window')

const SCREEN_HEGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

export default class myApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initialPosition: {
        latitude: 42.698334,
        longitude: 23.319941,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markerPosition: {
        latitude: 42.698334,
        longitude: 23.319941,
      }
    }
  }

  watchID: ? number = null

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
        var lat = parseFloat(position.coords.latitude)
        var long = parseFloat(position.coords.longitude)

        var initialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }

        this.setState({
          initialPosition: initialRegion,
          markerPosition: initialRegion
        })
      },
      (error) => alert(JSON.stringify(error)), {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000
    });

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }

      this.setState({
        initialPosition: lastRegion,
        markerPosition: lastRegion
      })
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  render() {
    return (
      <View style = {styles.container} >
        <MapView style = {styles.map}
                  initialRegion = {this.state.initialPosition} >
          <MapView.Marker coordinate = {this.state.markerPosition} >
            <View style = {styles.radius} >
              <View style = {styles.marker} ></View>
            </View>
          </MapView.Marker>
        </MapView>
        <View style = {styles.textContainer} >
          <Text style = {styles.welcome} >
            Welcome ThisIS Wild!
          </Text>
          <Text style = {styles.instructions} >
            Work and edit the index.ios.js
          </Text>
          <Text style = {styles.instructions} >
            Press Cmd + R to reload, {'\n'}
            Cmd + D or shake for dev menu
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  radius: {
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },
  textContainer: {
    top: 30,
    width: '100%',
    position: 'absolute',
    marginLeft: 'auto',
    backgroundColor: 'transparent'
  },
  container:{
    ...StyleSheet.absoluteFillObject,
   justifyContent: 'flex-end',
   alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  welcome: {
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('myApp', () => myApp);
