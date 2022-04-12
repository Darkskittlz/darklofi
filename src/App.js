import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import Home from './components/Home';
import Contact from './components/Contact';
import { Navbar, NavItem, DropdownMenu } from './components/Navbar';
import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as BoltIcon } from './icons/bolt.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';


const App = () => {
    return (
        <div className="app">
            <div>
            <Navbar>
                <NavItem icon={<PlusIcon />} />
                <NavItem icon={<BellIcon />} />
                <NavItem icon={<BoltIcon />} />

                <NavItem icon={<CaretIcon />}>
                    <DropdownMenu />

                </NavItem>
            </Navbar>
                <Layout>
                    <div className='routes'>
                        <Routes>
                            <Route path='/' element={<Home />} />                           
                            <Route path='/Contact' element={<Contact />} />                           
                        </Routes>
                    </div>
                </Layout>
            </div>
        </div>
    )
}

export default App
