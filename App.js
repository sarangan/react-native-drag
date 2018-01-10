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
    PanResponder,
    Animated,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';

var {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window');


export default class App extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {

    };

  }


  componentWillMount() {

   this._animatedValue = new Animated.ValueXY()
   this._value = {x: 0, y: 0}

   this._animatedValue.addListener((value) => this._value = value);
   this._panResponder = PanResponder.create({
       onMoveShouldSetResponderCapture: () => true, //Tell iOS that we are allowing the movement
       onMoveShouldSetPanResponderCapture: () => true, // Same here, tell iOS that we allow dragging
       onPanResponderGrant: (e, gestureState) => {
         this._animatedValue.setOffset({x: this._value.x, y: this._value.y});
         this._animatedValue.setValue({x: 0, y: 0});
       },
       onPanResponderMove: Animated.event([
         null, {dx: this._animatedValue.x, dy: this._animatedValue.y}
       ]), // Creates a function to handle the movement and set offsets
       onPanResponderRelease: () => {
         this._animatedValue.flattenOffset(); // Flatten the offset so it resets the default positioning
       }
     });


  }

  moveBox = (event) => {
    let eve = event.nativeEvent
    console.log(eve.pageX);
    console.log(eve.pageY);
    
    this._animatedValue.setValue({x: eve.pageX, y: eve.pageY});

  }




  render() {
    // var interpolatedColorAnimation = this._animatedValue.y.interpolate({
    //   inputRange: [0, deviceHeight - 100],
    //   outputRange: ['rgba(229,27,66,1)', 'rgba(90,146,253,1)'],
    //   extrapolate: 'clamp'
    // });

    // var interpolatedRotateAnimation = this._animatedValue.x.interpolate({
    //   inputRange: [0, deviceWidth/2, deviceWidth],
    //   outputRange: ['-360deg', '0deg', '360deg']
    // });

    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={(event)=>this.moveBox(event)} style={{backgroundColor: 'grey', flex: 1, width: deviceWidth, height: deviceHeight}}>
        </TouchableOpacity>

        <Animated.View
          style={[
              styles.box,
              {
                transform: [
                  {translateX: this._animatedValue.x},
                  {translateY: this._animatedValue.y},
                  //{rotate: interpolatedRotateAnimation}
                ],
                backgroundColor: '#333'
              }
            ]}
            {...this._panResponder.panHandlers}
          />


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  box: {
    position: 'absolute',
    width: 100,
    height: 100
  }
});
