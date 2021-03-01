import React, {Component} from 'react'
import {View, Text, Button} from 'react-native'
import * as appConstant from '../consts/appConstant'

export class HomeScreen extends Component{
    render(){
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button title='Detail Page' onPress={()=>this.props.navigation.navigate(appConstant.SCREEN.DETAIL, {data1: 'Hello World', data2: 'This is data 2'})} />
            </View>
        )
    }
  }