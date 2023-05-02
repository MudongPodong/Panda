import './App.css';
import React, {useEffect, useState} from 'react';
import CommonTable from './Tables/CommonTable';
import CommonTableColumn from './Tables/CommonTableColumn';
import CommonTableRow from './Tables/CommonTableRow';
import {Routes, Route, Link, NavLink, useNavigate} from 'react-router-dom';
import axios from 'axios';
import LogInPage from './pages/login_page';
import MemPage from './pages/joinmem_page';
import Home from './pages/home';
import OtherPage from "./pages/OtherPage";
import OtherPage2 from "./pages/OtherPage2";
import BoughtList from "./pages/BoughtList";
import FixBar from "./pages/FixBar";


function App() {
    return (
        <div id='root'>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/pages/loginpage" element={<LogInPage/>}></Route>
                <Route path="/pages/joinmempage" element={<MemPage/>}></Route>
                <Route path="/pages/OtherPage" exact={true} element={<OtherPage/>}/>
                <Route path="/pages/OtherPage2" exact={true} element={<OtherPage2/>}/>
                <Route path="/pages/BoughtList" exact={true} element={<BoughtList/>}/>
                <Route path="/pages/FixBar" exact={true} element={<FixBar/>}/>
            </Routes>
        </div>
    );
}

export default App;
