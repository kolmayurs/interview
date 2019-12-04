import React from 'react';
import './App.css';
import axios from 'axios';
class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = { data: [],load: true};
  }
  componentDidMount(){
    axios.get('https://inques.herokuapp.com/')
    .then(res  => {
      this.setState({data:res.data.data,load: false});
      console.log(this.state.data);
    })
    .catch(err => {
      console.log(err);
    });

    
  }
  render() {
    
    if(this.state.load){
      return(<div>loading</div>);
    }

    const data = this.state.data.map((items,i) => {
      return(<div key={'key_'+i}>
                <div>{items.question}</div>
                <div>{items.answer}</div>
              </div>);
    });
    

      return (<div className="App">{data}</div>
              );
  }

}

export default App;