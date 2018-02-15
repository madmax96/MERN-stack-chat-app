/*


Receive{
    text:String,
    chatId:ObjectId
}

broadcast{
    text:String,
    time:timestamp,
    creator:ObjectId
    chatId:ObjectId
}
*/


export default (data,setState)=>{
   console.log('received',data)
   setState((prevState)=>({     
        messages:[...prevState.messages,data]
    }))
// return (prevState) => ({
//     messages:[...prevState.messages,data]
// })
}