import {createStore , combineReducers} from 'redux'
import dataReducers from '../Reducers/dataReducers'
const ConfigureStore =()=>{

    const store = createStore(combineReducers({
        data : dataReducers
    }))
     return store
}

export default ConfigureStore