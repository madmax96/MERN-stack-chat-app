/*


Receive{
    group:String,
    title:String,
    maxNumOfUsers:Number
}
broadcast{
    group:String,
    title:String,
    maxNumOfUsers:Number
    chatId:ObjectId
    admin:User
}

*/

export default (data, setState) => {
  console.log('new chat', data);
};
