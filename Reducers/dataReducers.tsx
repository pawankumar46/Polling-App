const initialData :any = null

const dataReducers =(state = initialData , action: any)=>{
    switch(action.type){
        case 'ADD-DATA' : {
            return {...state , ...action.payload}
        }
        default : {
             return state
        }
    }
}
 export default dataReducers