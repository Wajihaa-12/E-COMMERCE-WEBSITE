
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Collection from './pages/Collection'
import Cart from './pages/Cart'
import Product from './pages/Product'
import About from './pages/About'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Homes from './import/Homes'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';


function App() {

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>

      <ToastContainer />
      <Homes />
      <SearchBar />
      {/* routes */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/about' element={<About />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
    </div>

  )
}

export default App
