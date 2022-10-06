import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootComponents } from './Container'
const JsonFormat = ({route}: NativeStackScreenProps<RootComponents , 'Json'>) => {

   const value1 = route.params?.value
    const result = JSON.stringify(value1 , undefined , 20)
  return (
     <ScrollView>
        <View>
      <Text style={{fontSize : 14}}>{result}</Text>
    </View>
     </ScrollView>
    
  )
}

export default JsonFormat