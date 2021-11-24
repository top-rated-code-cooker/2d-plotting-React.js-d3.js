import React, { Component } from 'react'; 
import './App.css';
import Plot from './Plot'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      back_color: {
        background: ''
      }
    }
  };

  handleChange = (e) => {
    this.setState({
      back_color: {
        background: e
      }
    })
  }

  render() { 
    return ( 
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App"  style = {this.state.back_color}> 
          <Switch>
                <Route exact path= "/" render={() => (
                  <Redirect to="/plotting"/>
                )}/>
                 <Route exact path='/plotting' render={() => <Plot back_color={(e) => this.handleChange(e)}/>} />
          </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
