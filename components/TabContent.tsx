import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React ,{useState , useEffect} from 'react';
import { DataTable } from 'react-native-paper'
// import {Table  , Row , Rows} from "react-native-table-component"
import axios from 'axios';
import {useDispatch , useSelector} from 'react-redux'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootComponents } from './Container';
import { addData } from '../Action/dataAction';

const TabContent = ({route , navigation }: NativeStackScreenProps<RootComponents , 'Table'>) => {

   const dispatch = useDispatch()
   const [count , setCount] = useState(0)
  //  const [headers  , setHeaders] = useState([['Url', 'Title' , 'Created--At' , 'Author']])
    const [data , setData] = useState(null)
 
    const info = useSelector((state : any)=>{
       return state.data
    })
   
   
   useEffect(()=>{
        let res = setInterval(()=>{
              setCount(count + 1)
              axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${count}`)
               .then((res : any)=>{
                    const result : any = res.data
                       dispatch(addData(result))
                     
                })
               .catch((err : any)=>alert(err.message))
        }, 300000)
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
       value : info.hits[index]
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
     { info ? (
        <View style={{marginTop : 20}}>
            <DataTable >
        <DataTable.Header style={{borderBottomWidth : 1}} >
          <DataTable.Title textStyle={{fontSize : 16}}>Url</DataTable.Title>
          <DataTable.Title textStyle={{fontSize : 16}}>Title</DataTable.Title>
          <DataTable.Title textStyle={{fontSize : 16}}>Created-At</DataTable.Title>
          <DataTable.Title textStyle={{fontSize : 16}}>Author</DataTable.Title>
        </DataTable.Header>

        <ScrollView>
           { info.hits.map((ele: any, index : any)=> {
             return (
                <View  key={index} >
             
                  <TouchableOpacity onPress={()=>handlePress(index)}>
                  <DataTable.Row  style={{flexDirection : 'row' , borderBottomColor : 'black' ,borderBottomWidth : 2, width : '90%' , marginLeft : 10}}  >
                    
                    <View  style={{width : '25%'}} >
                    <Text  >{ele.url}</Text>
                     {/* <DataTable.Cell  textStyle={{fontSize : 14  }}><Text style={{width : '25%'}}  >{ele.url}</Text></DataTable.Cell> */}
                    </View> 
                     
                     <View style={{width : '25%'}}>
                        <Text>{ele.title}</Text>
                     </View>
              
               {/* <DataTable.Cell  textStyle={{fontSize : 14 }}><Text>{ele.title}</Text></DataTable.Cell> */}
                    <View style={{width : '25%'}}>
                       <Text>{ele.created_at}</Text>
                    </View>
               {/* <DataTable.Cell  textStyle={{fontSize : 14 }}>{ele.created_at}</DataTable.Cell> */}
                    
                    <View style={{width : '25%' }}>
                       <Text style={{textAlign : 'center'}}>{ele.author}</Text>
                    </View>
               {/* <DataTable.Cell  textStyle={{fontSize : 14 }}>{ele.author}</DataTable.Cell> */}
               
               </DataTable.Row>
                  </TouchableOpacity>
             
             </View>
            
             )
           }) }
         
         </ScrollView>
        
      </DataTable>  
        </View>
     ) : (
        <View>
            <Text>Loading...</Text>
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


