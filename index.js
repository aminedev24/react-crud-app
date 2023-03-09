import React, { useState } from 'react';
import ReactDOM from 'react-dom';
;
import App from './app'

function Main(){
  
  return(
    <div className='App'>
      <App />
    </div>
    )
}

ReactDOM.render(<Main />, document.getElementById('react-app'));
