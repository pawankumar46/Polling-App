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
   const [data , setData] = useState<any>([])
   const [page , setPage] = useState(0)
    const [isLoading , setIsLoading] = useState(true)
  
  //  const info = useSelector((state : any)=>{
  //     return state.data
  //  })

  //  const itemsPerPage : number = 20
   
  //  const from = page * itemsPerPage;
  //  const to = Math.min((page + 1) * itemsPerPage)


   useEffect(() => {
   
      const timer = setInterval(() => {
        
       getData();
       setPage(page + 1)
        
      }, 20000)
      return () => clearInterval(timer);
   
  }, [data])
  

 const getData=()=>{
   console.log('api')
   axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`)
   .then((res : any)=>{
        const result : any = res.data.hits
         setData([...data,...result])
         setIsLoading(false)
    })
   .catch((err : any)=>alert(err.message))
}

 
    const handlePress=(index : number)=>{
     alert(`you have selected-${index}`)
     navigation.navigate('Json' , {
       value : data[index]
     })

   }
 
   

    const renderFooter=()=>{
        return (
          isLoading ? 
         <View style={styles.loader}>
             <ActivityIndicator  size='large'/>
         </View>  : null
        )
    }
  
    console.log('total',data)

  return (
    
    <View>
    
    
    
    
     { data.length > 1 ? (
        <View style={{marginTop : 20}}>
            <DataTable >
    
        
        <DataTable.Header style={{borderBottomWidth : 1}} >
          <DataTable.Title textStyle={{fontSize : 16}}>Url</DataTable.Title>
          <DataTable.Title textStyle={{fontSize : 16}}>Title</DataTable.Title>
          <DataTable.Title textStyle={{fontSize : 16}}>Created-At</DataTable.Title>
          <DataTable.Title textStyle={{fontSize : 16}}>Author</DataTable.Title>
        </DataTable.Header>

        

           <FlatList  data={data} 
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
            onEndReachedThreshold={0}
            onEndReached={() => { console.log('load More') , setPage(prevPage => prevPage + 1) , getData()}}
            ListFooterComponent={renderFooter}
          />
        
             
{/* 
              <DataTable.Pagination page={page}
            numberOfPages={Math.floor(info.length / itemsPerPage)}
            onPageChange={page => setPage(page)}
            label={`${from + 1}-${to} of ${info.length}`} 
          /> */}
        
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
   loader : {
       marginTop : 30,
       alignItems : 'center'
     }
})




// using react-native-paper


