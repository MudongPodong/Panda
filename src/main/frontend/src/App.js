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
import BoughtList from "./pages/BoughtList";
import FixBar from "./pages/FixBar";
import Chat from "./pages/Chat";
import SearchResult from "./pages/SearchResult";


function App() {

  return (
      <div id='root'>


          <Routes>
              <Route path="/pages/OtherPage" exact={true} element={<OtherPage />}/>
              <Route path="/pages/OtherPage2" exact={true} element={<OtherPage2 />}/>
              <Route path="/pages/BoughtList" exact={true} element={<BoughtList />}/>
              <Route path="/pages/FixBar" exact={true} element={<FixBar />}/>
              <Route path="/pages/Chat" exact={true} element={<Chat />}/>
              <Route path="/pages/SearchResult" exact={true} element={<SearchResult />}/>
          </Routes>


      </div>
  );
}

export default App;
