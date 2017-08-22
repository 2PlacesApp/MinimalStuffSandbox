/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import MapView from 'react-native-maps';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window')

const SCREEN_HEGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width/height

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = 0.0421

export default class myApp extends Component {

	constructor(props){
		super(props)
		this.state = {
			initialPosition: {
				latitude: 0,
	           	longitude: 0,
		    	latitudeDelta: LATITUDE_DELTA,
	      		longitudeDelta: LONGITUDE_DELTA,
			},
			markerPosition: {
				latitude: 0,
	           	longitude: 0,
			}
		}
	}

	watchID: ?number = null

	componentDidMount(){
		navigator.geolocation.getCurrentPosition((position) => {
			var lat = parseFloat(position.coords.latitude)
			var long = parseFloat(position.coords.longitude)

			var initialRegion =  {
	    		latitude: lat,
	           	longitude: long,
		    	latitudeDelta: LATITUDE_DELTA,
	      		longitudeDelta: LONGITUDE_DELTA,
		    }

		    this.setState({initialPosition: initialRegion})
		    this.setState({markerPosition: initialRegion})
		},
		(error) => alert(JSON.stringify(error)),
		{enableHighAccuracy: true, timeout: 20000, maximumAge: 10000})

		this.watchID = navigator.geolocation.watchPosition((position) => {
			var lat = parseFloat(position.coords.latitude)
			var long = parseFloat(position.coords.longitude)

			var lastRegion =  {
	    		latitude: lat,
	           	longitude: long,
		    	latitudeDelta: LATITUDE_DELTA,
	      		longitudeDelta: LONGITUDE_DELTA,
		    }

		    this.setState({initialPosition: lastRegion})
		    this.setState({markerPosition: lastRegion})
		})
	}

	componentWillUnmount(){
		navigator.geolocation.clearWatch(this.watchID)
	}

  	render() {
	    return (
	      <View style={styles.container}>
	        <MapView
		         style={styles.map}
		         initialRegion={this.initialPosition}
	        >
		        <MapView.Marker coordinate={this.markerPosition}>
			        <View style={styles.radius}>
				        <View style={styles.marker}>
				        </View>
			        </View>
		        </MapView.Marker>
	        </MapView>
	        <View style={styles.textContainer}>
		        <Text style={styles.welcome}>
		          Welcome ThisIS Wild!
		        </Text>
		        <Text style={styles.instructions}>
		          Work and edit the index.ios.js
		        </Text>
		        <Text style={styles.instructions}>
		          Press Cmd+R to reload,{'\n'}
		          Cmd+D or shake for dev menu
		        </Text>
	        </View>
	      </View>
	    );
	  }
}

const styles = StyleSheet.create({
  radius: {
  	position: 'absolute',
  	left: 10,
  	top: 10,
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
  	position: 'relative',
  	backgroundColor: 'transparent'
  },
  container: {
    flex: 1
  },
  map: {
  	left: 0,
  	right: 0,
  	top: 0,
  	bottom: 0,
  	position: 'absolute'
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
