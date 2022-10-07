import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View , FlatList} from 'react-native'
import React ,{useState , useEffect} from 'react';
import { ActivityIndicator, DataTable } from 'react-native-paper'
// import {Table  , Row , Rows} from "react-native-table-component"
import axios from 'axios';
import {useDispatch , useSelector} from 'react-redux'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootComponents } from './Container';
import { addData } from '../Action/dataAction';

const TabContent = ({route , navigation }: NativeStackScreenProps<RootComponents , 'Table'>) => {

   const dispatch = useDispatch()
   const [data , setData] = useState([])
   const [count , setCount] = useState(0)
  
   const info = useSelector((state : any)=>{
      return state.data
   })

   const itemsPerPage : number = 20
   const [page , setPage] = useState(0)
   const from = page * itemsPerPage;
   const to = Math.min((page + 1) * itemsPerPage)


   const getData=()=>{
      axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${count}`)
      .then((res : any)=>{
           const result : any = res.data
               
              dispatch(addData(result.hits))
            
       })
      .catch((err : any)=>alert(err.message))
   }

   const loaderRender=()=>{
      console.log('load data')
      setCount(count + 1)
  }

  useEffect(()=>{
     getData()
  },[count])

   useEffect(()=>{
      let res = setInterval(()=>{
            setCount(count + 1)
              getData()
      },10000)
       return ()=>{
         clearInterval(res)
       }
 },[count])
   
  



   
   
      
  //  console.log('data' , data)
     
  //   let url : any = data.hits.map((ele : any)=> ele.url)


  

  //  const tableData : any =  [
  //    [ url.map((ele : any)=> ele[0]) , 'hgfytdktdytdkytd','gg', 'a'  ],
    
  //  ]

   const handlePress=(index : number)=>{
     //alert(`you have selected-${index}`)
     navigation.navigate('Json' , {
       value : info[index]
     })

   }
 
   

    
  

  return (
    
    <View>
    
    
    
    {/* <View style={{paddingTop : 20 , width : '95%' , marginLeft : 10 }}>
       <Table borderStyle={{borderWidth : 1 , margin : 2}}>
          <Row data={headers.flat()} style={styles.head}  textStyle={styles.head}/>
          
          
           <Rows  onPress={handlePress} style={styles.text}  data={tableData} textStyle={styles.text}/>
           
          
       </Table>
        
    </View> */}
     { info.length > 1 ? (
        <View style={{marginTop : 20}}>
            <DataTable >
    
        
        <DataTable.Header style={{borderBottomWidth : 1}} >
          <DataTable.Title textStyle={{fontSize : 16}}>Url</DataTable.Title>
          <DataTable.Title textStyle={{fontSize : 16}}>Title</DataTable.Title>
          <DataTable.Title textStyle={{fontSize : 16}}>Created-At</DataTable.Title>
          <DataTable.Title textStyle={{fontSize : 16}}>Author</DataTable.Title>
        </DataTable.Header>

        

           <FlatList  data={info} 
           onEndReachedThreshold={0.5}
           onEndReached={loaderRender}
            keyExtractor={(x, i: any)=> i} 
            renderItem={({item , index})=>(
                <View>
                           <TouchableOpacity onPress={()=>handlePress(index)}>
                  <View style={{flexDirection : 'row' , borderBottomColor : 'black' ,borderBottomWidth : 2, width : '90%' , marginLeft : 10}}  >
                    
                    <View  style={{width : '25%'}} >
                    <Text  >{item.url}</Text>
                     
                    </View> 
                     
                     <View style={{width : '25%'}}>
                        <Text>{item.title}</Text>
                     </View>
              
              
                    <View style={{width : '25%'}}>
                       <Text>{item.created_at}</Text>
                    </View>
              
                    
                    <View style={{width : '25%' }}>
                       <Text style={{textAlign : 'center'}}>{item.author}</Text>
                    </View>
             
               </View>
                  </TouchableOpacity>
             
             </View>
             
                
            )}
          />
        {/* 
           { info.map((ele: any, index : any)=> {
             return (
                <View  key={index} >
             
                  <TouchableOpacity onPress={()=>handlePress(index)}>
                  <DataTable.Row  style={{flexDirection : 'row' , borderBottomColor : 'black' ,borderBottomWidth : 2, width : '90%' , marginLeft : 10}}  >
                    
                    <View  style={{width : '25%'}} >
                    <Text  >{ele.url}</Text>
                     
                    </View> 
                     
                     <View style={{width : '25%'}}>
                        <Text>{ele.title}</Text>
                     </View>
              
              
                    <View style={{width : '25%'}}>
                       <Text>{ele.created_at}</Text>
                    </View>
              
                    
                    <View style={{width : '25%' }}>
                       <Text style={{textAlign : 'center'}}>{ele.author}</Text>
                    </View>
             
               </DataTable.Row>
                  </TouchableOpacity>
             
             </View>
            
             )
           }) } */}
             

              <DataTable.Pagination page={page}
            numberOfPages={Math.floor(info.length / itemsPerPage)}
            onPageChange={page => setPage(page)}
            label={`${from + 1}-${to} of ${info.length}`} 
          />
        
      </DataTable>  
        </View>
     ) : (
        <View>
            <Text style={{textAlign : 'center'}}>Loading...</Text>
        </View>
     )}
     
   
     
      
    </View>
  
  )
}

export default TabContent

const styles = StyleSheet.create({
   
  text : {
 
    textAlign : 'center',
    fontSize : 20
  },
  head: {
     
     fontSize : 20,
     textAlign : 'center',
     fontWeight : 'bold' 
     },
})




// using react-native-paper


