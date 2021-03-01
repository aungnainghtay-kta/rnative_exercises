import React, {Component} from 'react'
import {View, Text, StyleSheet, FlatList, Image, ActivityIndicator, Button} from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'


class App extends Component{
  constructor(props){
    super(props)
    this.state={
      data:[],
      page:1,
      isLoading: true,
      isrefresh:false,
    }
  }

  //fetch data
  componentDidMount(){
    this.setState({isLoading:true}, this.getData)
  }

  //get refresh data
  getRefresh=async()=>{
    const apiUrl=`https://jsonplaceholder.typicode.com/photos?_limit=5&_page=1`
    this.setState({isrefresh:true})
    fetch(apiUrl).then((res)=>res.json())
    .then((resJson)=>{
      this.setState({
        data: this.state.data.concat(resJson),
        isLoading:false
      }) 
    }).finally(()=>this.setState({isrefresh:false}))
  }

  //get data
  getData=async()=>{
    const apiUrl=`https://jsonplaceholder.typicode.com/photos?_limit=5&_page=${this.state.page}`
    fetch(apiUrl).then((res)=>res.json())
    .then((resJson)=>{
      this.setState({
        data: this.state.data.concat(resJson),
        isLoading:false
      }) 
    })
  }

  renderItem=({item})=>{
    return(
      <View style={styles.itemList}>
        <Button title='go detail' onPress={()=>this.props.navigation.navigate('Details')} />
        <Image style={styles.image} source={{ uri:item.thumbnailUrl }} />
        <Text>
          {item.title}
        </Text>
        <Text>
          {item.id}
        </Text>
      </View>
    )
  }

   //list footer
   indicateLoading=()=>{
    return(
      this.state.isLoading?
      <View style={styles.loading}>
        
        <ActivityIndicator size='large' color='red' />
      </View>:null
    )
  }

  paginateData=()=>{
    this.setState({page: this.state.page+1, isLoading:true}, this.getData)
    console.log(this.state.page)
  }

 

  render(){
    return(
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index)=>index.toString()}
          onEndReached={this.paginateData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={this.indicateLoading}
          refreshing={this.state.isrefresh}
          onRefresh={this.getRefresh}
         />
      </View>
    )
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: App,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const styles=StyleSheet.create({
  container:{
    paddingTop: 35,
    paddingHorizontal: 10,
  },
  itemList: {
    paddingVertical:10,
    borderBottomColor: '#eee',
    borderBottomWidth:1,
  },
  image:{
    width: '100%',
    height:300,
  },
  loading:{
    marginTop:10,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default createAppContainer(AppNavigator);