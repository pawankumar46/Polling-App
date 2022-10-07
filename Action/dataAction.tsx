export const addData=(data : any)=>{
     console.log('action' , data)
    return {
        type : 'ADD-DATA',
        payload : data
    }
}