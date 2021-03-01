import React, {Component} from 'react'
import {View, Text, StyleSheet, FlatList, Image, ActivityIndicator} from 'react-native'

class App extends Component{
  constructor(props){
    super(props)
    this.state={
      data:[],
      page:1,
      isLoading: false,
    }
  }

  //fetch data
  componentDidMount(){
    this.setState({isLoading:true}, this.getData)
  }

  //get data
  getData=()=>{
    console.log(this.state.page+"this is page number")
    const apiUrl=`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${this.state.page}`
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

  paginateData=()=>{
    this.setState({page: this.state.page+1, isLoading:true}, this.getData)
    console.log(this.state.page)
  }

  //list footer
  listFooter=()=>{
    return(
      this.state.isLoading?
      <View style={styles.loading}>
        
        <ActivityIndicator size='large' color='red' />
      </View>:null
    )
  }

  render(){
    return(
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index)=>index.toString()}
          onEndReached={this.paginateData}
          onEndReachedThreshold={0}
          ListFooterComponent={this.listFooter}
         />
      </View>
    )
  }
}

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
  }
})

export default App;