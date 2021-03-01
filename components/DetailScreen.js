import React, {Component} from 'react'
import {View, Text, Button} from 'react-native'
import * as appConstant from '../consts/appConstant'

export class DetailsScreen extends React.Component {
    constructor(props){
        super(props)
        this.value=this.props.navigation.getParam('data1')
        this.data2=this.props.navigation.getParam('data2')
    }
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>{this.value}</Text>
          <Text>{this.data2}</Text>
          <Button title='Go Home' onPress={()=>this.props.navigation.navigate(appConstant.SCREEN.HOME)} />
        </View>
      );
    }
  }