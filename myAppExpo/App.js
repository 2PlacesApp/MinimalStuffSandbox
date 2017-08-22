import React from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working Hello threr on your app!</Text>
        <Text style={styles.text}>Changes you makesss will automatically reload.</Text>
        <Text>Shake your phone toddd open the developer menu.</Text>
        <Image
          style={{width: 200, height: 200}}
          source={{uri: 'https://goo.gl/e5WzoY'}}
        />
      </View>
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
  text: {
    color: '#ccc'
  }
});
