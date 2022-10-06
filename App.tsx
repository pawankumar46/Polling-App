import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Container from './components/Container';
import ConfigureStore from './Store/ConfigureStore';
import { Provider } from 'react-redux';


import { NavigationContainer } from '@react-navigation/native'
 const store = ConfigureStore()
 console.log('store' ,  store.getState())

  store.subscribe(()=>{
     console.log('updated' , store.getState())
  })
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
    <View style={styles.container}>
       <View style={styles.table}>
         <Text style={{fontSize : 20}} >Table-Content</Text>
    </View>
       <Container/>
      <StatusBar style="auto" />
    </View>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  table : {
    marginTop: 50,
    fontWeight : 'bold',
    marginLeft : 140,
  },
});
