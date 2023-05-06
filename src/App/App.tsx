
import './App.css';
import theme from '../assets/mui.theme';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from '../utils/redux/redux.store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import LandingPage from './components/HomePage/Landing/LandingPage';
import CategoriesPage from '../components/HomePage/ProductCategories/CategoriesPage';
import HomePage from '../components/HomePage/Home/Home';
import ProductDetail from '../components/Products/ProductDetail';
import ShopPage from '../components/Shop/ShopPage';
// import ProductDetail from './components/Products/ProductDetail';

function App() {
  return (
    <>

      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>

            <main>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/categories' element={<CategoriesPage />} />
                <Route path='/product/:productID' element={<ProductDetail />} />
                <Route path='/shop' element={<ShopPage />} />

              </Routes>
            </main>

          </BrowserRouter>
        </Provider>
      </ThemeProvider>

    </>

  );
}

export default App;




