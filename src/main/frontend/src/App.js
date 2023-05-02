import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import CommonTable from './Tables/CommonTable';
import CommonTableColumn from './Tables/CommonTableColumn';
import CommonTableRow from './Tables/CommonTableRow';
import {Routes,Route,Link,NavLink,useNavigate} from 'react-router-dom';
import axios from 'axios';
import OtherPage from "./pages/OtherPage";
import OtherPage2 from "./pages/OtherPage2";



function App() {

  return (
      <div id='root'>


          <Routes>
              <Route path="/pages/OtherPage" exact={true} element={<OtherPage />}/>
              <Route path="/pages/OtherPage2" exact={true} element={<OtherPage2 />}/>
          </Routes>


      </div>
  );
}

export default App;
