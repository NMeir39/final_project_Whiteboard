import React from 'react';
// import { Navbar } from './components/Navbar';
// import { Sidebar } from './components/Sidebar';
// import { Canvas } from './components/Canvas';
import  Whiteboard  from './components/Whiteboard';
// import Join from './components/Join/Join';
// import Chat from './components/Chat/Chat';


// import { BrowserRouter as Router, Route } from 'react-router-dom';


class App extends React.Component {

  // render(){
  //  return(
  //    <Router>
  //    <Route path="/" exact component={Join} />
  //    <Route path="/chat" exact component={Chat} />
  //    </Router>
  //   )
  // }

  // render() {
  //   return (
  //     <div className="App">

  //       <Navbar />
  //       <Sidebar
  //         isSelectPressed={() => this.sellectPressed()}
  //         isBrushPressed={() => this.BrushPressed()}
  //       />
  //       <Canvas statesOfBottons={this.state} />
  //     </div>
  //   );
  // }

  render (){
    return (
      <div>
        <Whiteboard/>
      </div>
    );
  }
}



export default App;



