import React from 'react'
import './HeaderComponent.scss'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProducts } from "../../reducers/products";
import { setMainProducts } from "../../reducers/products";
import { useLocation } from "react-router-dom"
import Axios from "axios";
import { setCartJewellery } from "../../reducers/products";
function HeaderComponent() {
    const [hideLightbox, setHideLightbox] = useState(false);
    let url = "";
    const products = useSelector(store => store.products.data);
    const productsMain = useSelector(store => store.products.datas);
    const [selectedItems, setSelectedItems] = useState(0);
    const cartItems = useSelector(state => state.products.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [locations, setLocation] = useState();
    const splitLocation = location.pathname.split("/");
    const one = splitLocation[1];
    const two = splitLocation[2];
    const checkedValues = useSelector(store => store.products.jewellery);

    //navigate to cart items page
    const getCartValue = () => {
        navigate('/ShoppingBag')
    }
    useEffect(() => {
        if (products.length == 0) {
            Axios.get('https://fakestoreapi.com/products').then(res => {
                const data = res.data;
                var thisProduct = data.map(obj => ({ ...obj, quantity: 0 }));
                dispatch(setProducts(thisProduct));
                dispatch(setMainProducts(thisProduct));
            })
        }
    }, []);
    useEffect(() => {
        setSelectedItems(cartItems.length);
    }, [cartItems])
    const getHomeValue = () => {
        navigate('ReactCart');
        setHideLightbox(false);
    }
    const getAllProductsValue = () => {
        /* let y = { 'allProducts': 'yes' }
         const AllProductsArray = [y, ...productsMain]*/
        dispatch(setProducts(productsMain));
        navigate('/Products/AllProducts');
        setHideLightbox(false);
    }
    const getWomensValue = () => {
        dispatch(setCartJewellery(true));
        const result = productsMain.filter(x =>
            x.category == "women's clothing"
        );
        dispatch(setProducts(result));
        navigate('/Products/Women');
        setHideLightbox(false);
    }
    const getMensValue = () => {
        dispatch(setCartJewellery(false));
        const result = productsMain.filter(x =>
            x.category == "men's clothing"
        );
        dispatch(setProducts(result));
        navigate('/Products/Men');
        setHideLightbox(false);
    }
    const getJewelleryValue = () => {
        const result = productsMain.filter(x =>
            x.category == "jewelery"
        );
        dispatch(setProducts(result));
        navigate('/Products/Jewellery');
        setHideLightbox(false);
    }
    const getElectronicsValue = () => {
        const result = productsMain.filter(x =>
            x.category == "electronics"
        );
        dispatch(setProducts(result));
        navigate('/Products/Electronics');
        setHideLightbox(false);
    }
    return (
        <>
            <header>
                <div className='inner-container'>
                    <div className="inner-wrapper aem-Grid">
                        <div className='mobile-view'>  {/* show only in mobile */}
                            <div className='aem-Grid aem-Grid--12'>
                                {/* menu start for mobile */}
                                <div className="aem-GridColumn aem-GridColumn--default--2">
                                    <div className='menuicon'>
                                        <img src={require('../../assets/images/menu-icon.png')} alt='menu icon' onClick={() => setHideLightbox(true)} tabIndex={0} />
                                    </div>
                                    <nav className={`menu--mobile ${hideLightbox ? "show--lightbox" : "hide--lightbox"}`}>
                                        <span className='menu__title'>
                                            Shop Categories <span className='cross' onClick={() => setHideLightbox(false)}> X </span>
                                        </span>
                                        <span className='categories' role="Menu Navigation Links">
                                            <ul>
                                                <li onClick={getHomeValue}>
                                                    Home</li>
                                                <li onClick={getAllProductsValue}>
                                                    All Products</li>
                                                <li onClick={getWomensValue}>
                                                    Womens</li>
                                                <li onClick={getMensValue}>
                                                    Mens</li>
                                                <li onClick={getJewelleryValue}>
                                                    Jewellery</li>
                                                <li onClick={getElectronicsValue}>
                                                    Electronics</li>
                                            </ul>
                                        </span>
                                    </nav>
                                </div>
                                {/* menu end for mobile */}
                                {/* logo */}
                                <div className="aem-GridColumn aem-GridColumn--default--8">
                                    <span className="logo" aria-label='Venia Logo' tabIndex={0}>
                                        <Link to="ReactCart" aria-label='Link to Home Page'>
                                            <img src={require('../../assets/images/venia-logo.png')} alt='Venia Logo' />
                                        </Link>
                                    </span>
                                </div>
                                {/* Cart icon */}
                                <div className="aem-GridColumn aem-GridColumn--default--2">
                                    <div className="right--nav" role="navigation">
                                        <button type='button' onClick={getCartValue} className="right--nav__carticon">
                                            <img src={require('../../assets/images/cart-icon.png')} alt='Shopping Cart icon' />
                                            <span> {selectedItems}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='desktop aem-GridColumn'>  {/* show only in desktop */}
                            <div className='aem-Grid aem-Grid--12 '>
                                {/* logo */}
                                <div className="aem-GridColumn aem-GridColumn--default--2">
                                    <span className="logo" aria-label='Company Logo' tabIndex={0}>
                                        <Link to="ReactCart" aria-label='Link to Home Page'>
                                            <img src={require('../../assets/images/venia-logo.png')} alt='Venia Logo' />
                                        </Link>
                                    </span>
                                </div>
                                {/* menu start */}
                                <div className="aem-GridColumn aem-GridColumn--default--9">
                                    <nav className="desktop__menu">
                                        <ul>
                                            <li onClick={getHomeValue} className={one == "ReactCart" ? "active" : ""}>
                                                Home</li>
                                            <li onClick={getAllProductsValue} className={two == "AllProducts" ? "active" : ""}>
                                                All Products</li>
                                            <li onClick={getWomensValue} className={two == "Women" ? "active" : ""}>
                                                Womens</li>
                                            <li onClick={getMensValue} className={two == "Men" ? "active" : ""}>
                                                Mens</li>
                                            <li onClick={getJewelleryValue} className={two == "Jewellery" ? "active" : ""}>
                                                Jewellery</li>
                                            <li onClick={getElectronicsValue} className={two == "Electronics" ? "active" : ""}>
                                                Electronics</li>
                                        </ul>
                                    </nav>
                                </div>
                                {/* menu end */}
                                <div className="aem-GridColumn aem-GridColumn--default--1">
                                    <div className="right--nav" role="navigation">
                                        <button type='button' className="right--nav__carticon" onClick={getCartValue}>
                                            <img src={require('../../assets/images/cart-icon.png')} alt='Shopping Cart icon' />
                                            <span> {selectedItems}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
export default HeaderComponent