import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import {Urls} from "./pages/Urls";
import {EditUrl} from "./pages/EditUrl";
import {Redirect} from "./pages/Redirect";
import 'antd/dist/antd.css';

export const BASE_URL = '/api/'

function App() {
  return (
      <div className="App">
        <Switch>
          <Route component={Urls} path="/" exact={true}/>
          <Route component={EditUrl} path="/urls/new" exact={true} />
          <Route component={Redirect} path="/:id" exact={true} />
          <Route component={EditUrl} path="/urls/:id" exact={true} />
        </Switch>
      </div>
  );
}

export default App;
