import React from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
// import pizzas from './assets/db.json';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { increment, decrement } from './redux/Slices/filterSlice'; 


export const SearchContext = React.createContext(); 

function App() {

  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="App">
      <div className="wrapper">
        <SearchContext.Provider value={{searchValue, setSearchValue}}>
          <Header />
          <div className="content">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='*' element={<NotFound />} />
              <Route path='/Cart' element={<Cart />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
    </div>
  );
}

export default App;


