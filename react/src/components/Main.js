import React from 'react';
import { Switch, Route } from 'react-router-dom';
import User from './User.js';

function Main (props){
  return (
    <main>
      <Switch>
        <Route exact path='/users/:option' component={User}/>
      </Switch>
    </main>
  );
}

export default Main;
