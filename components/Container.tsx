import { View, Text } from 'react-native'
import React from 'react'
import TabContent from './TabContent'
import JsonFormat from './JsonFormat'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type RootComponents ={
  Table : any;
   Json : any;
 }
const Stack = createNativeStackNavigator<RootComponents>()

const Container = () => {
  return (
     <Stack.Navigator initialRouteName='Table'>
          <Stack.Screen name='Table' component={TabContent}  />
          <Stack.Screen name='Json' component={JsonFormat}  />

     </Stack.Navigator>
  )
}

export default Container