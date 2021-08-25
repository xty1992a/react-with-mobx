import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="box">
        <p>hello</p>
      </div>

      <style jsx>{`
.box{
    height:100px;
    width:100px;
    background-color: yellowgreen;
    p{
    font-size: 18px;
    }
}      
`}</style>
    </div>
  );
}

export default App;
