import React from 'react';
import {connect} from 'react-redux';

class LoginPage extends React.Component{

  state = {
      email:'',
      password:''
  }
  
  onEmailChange = (e)=>{
    const email = e.target.value;
    this.setState({email});
  }

  onPasswordChange=(e)=>{
    const password = e.target.value;
    this.setState({password});
  }

  startLogin = (e)=>{
    e.preventDefault();
    //this.props.startLogin(this.state.email,this.state.password);
    

    
    // axios.post('/login',{email:'mladen@gmail.com',password:'123asd'}).then((response)=>{
    //   const token = response.headers['x-auth'];
    //   const ws = new Ws(config.url,token);
    //   ws.connect().then(()=>{
    //       console.log("connected successfully");
    //       ws.on('ws_close',()=>{
    //           console.log('Closed')
    //       });
        
    //       ws.on('newMessage',(messageData)=>{
    //           console.log(messageData);
    //       });
    //       ws.emmit('userMessage',{from:'madmax',text:'heyyy'});
    //   },(error)=>{
    //       console.log('rejected',error);
    //   })
    // }).catch((e)=>{
    //   console.log(e);
    // })
  }


render(){
    return(
      <div>
        <h1 className="test">Login Page</h1>
        <form onSubmit={this.startLogin}>
          <input type="email" name="email" value={this.state.email} onChange={this.onEmailChange}/>
          <input type="password" name="password" value={this.state.password} onChange={this.onPasswordChange}/>
          <button>Log in</button>
        </form>
      </div>
    )
  }
}
  


export default connect(undefined, undefined)(LoginPage);

