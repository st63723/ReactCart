import React from "react"
import { useParams } from "react-router-dom"
import HeartIcon from '../../assets/svg/heart.svg';
import ShareIcon from '../../assets/svg/share.svg';
import SweatwickIcon from '../../assets/svg/layers.svg';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import './ProductDetails.scss';
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../reducers/products";
import LoaderComponent from "../Loader/LoaderComponent";
import { Rating } from 'react-simple-star-rating';
import ReadMoreComponent from '../ReadMore/ReadMoreComponent';
import { setWishlist } from "../../reducers/products";
import { useNavigate } from "react-router-dom";
function ProductDetail() {
    const productsMain = useSelector(store => store.products.datas);
    const products = useSelector(store => store.products.data);
    const [rating, setRating] = useState(0) // initial rating value
    const cartItems = useSelector(store => store.products.cart);
    const dispatch = useDispatch();
    const { productId } = useParams();
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const [cartItemss, setCartItems] = useState();
    const ifCartInItem = cartItems.filter(prod => prod.id == productId)
    if (ifCartInItem.length >= 1) {
        var thisProduct = cartItems.filter(prod => prod.id == productId)
    } else {
        var thisProduct = productsMain.filter(prod => prod.id == productId);
    }
    const increment = (product) => {
        if (product.quantity < 10) {
            product.quantity = product.quantity + 1;
            setCartItems(product.quantity);
        }
    }
    const incrementCount = (product) => {
        if (count < 10) {
            setCount(count + 1)
        }
    }
    const decrement = (product) => {
        if (product.quantity > 0) {
            const quantity = count - 1;
            product.quantity = product.quantity + quantity;
            setCartItems(product.quantity);
        }
    }
    const decrementCount = (product) => {
        if (count > 0) {
            setCount(count - 1)
        }
    }
    let CounthandleChange = (e) => {
        setCount(e.target.value);
    }
    const addItemToCart = (product, count) => {
        if ((product.quantity >= 1) ? (product.quantity > 0) : (count > 0)) {
            const itemInCart = cartItems.filter(item => item.id == product.id);
            if (itemInCart.length == 0) {
                navigate('/ShoppingBag');
                dispatch(addToCart(product, count));
            } else {
                alert("Product Updated 'My Cart' successfully..")
                navigate('/ShoppingBag');
            }
        } else {
            alert("Please select Product Quantity");
        }
    }
    const HeartIconEvent = (e) => {
        const x = e.target.id;
        if (e.target.className == "save--share__save__heart--icon") {
            e.target.className = "save--share__save__heart--icon--red"
        } else {
            e.target.className = "save--share__save__heart--icon"
        }
        const whishItem = productsMain.filter(xv =>
            xv.id == x
        );
        dispatch(setWishlist(whishItem));
    }
    return (
        thisProduct.length ?
            <div className="inner-container">
                {thisProduct.map((product) => (
                    <><div className='product-details aem-Grid aem-Grid--12' aria-label="Product Details" key={product}>
                        {/* Product Thumbnails start*/}
                        <div className="product-thumbnails aem-GridColumn aem-GridColumn--tablet--1 aem-GridColumn--default--1 aem-GridColumn--phone--hide">
                            <img src={product.image} alt="Product Thumbnail" />
                            <img src={product.image} alt="Product Thumbnail" />
                            <img src={product.image} alt="Product Thumbnail" />
                            <img src={product.image} alt="Product Thumbnail" />
                        </div>
                        {/* Product Thumbnails end */}
                        {/* Product Big image */}
                        <div className="product-image aem-GridColumn aem-GridColumn--tablet--4 aem-GridColumn--default--4 aem-GridColumn--phone--12">
                            <nav className="crumbs mobile-view">
                                <Link to="/" aria-label='Clothing url'>Clothing</Link> /
                                <Link to="/" aria-label='Womens url'>Women's</Link> /
                                <Link to="/" aria-label='Outerwear url'>Outerwear</Link>
                            </nav>
                            <img src={product.image} alt="Product Image" />
                        </div>
                        {/* Product all details start */}
                        <div className="details aem-GridColumn aem-GridColumn--tablet--7 aem-GridColumn--default--5 aem-GridColumn--phone--12" >
                            <nav className="crumbs desktop-view">
                                <Link to="/" aria-label='Clothing url'>Clothing</Link> /
                                <Link to="/" aria-label='Womens url'>Women's</Link> /
                                <Link to="/" aria-label='Outerwear url'>Outerwear</Link>
                            </nav>
                            <h2 className="product-name" role="Product Name">{product.title}</h2>
                            <h6 className="product-price" role="Product Price">${product.price}</h6>
                            <div className="product-rating" role="Product star Rating">
                                <Rating readonly size="16px" fillColor="#172026" ratingValue={(product.rating.rate * 20)} /* Available Props */ />
                                <span className="product-rating_number">({product.rating.count})</span></div>
                            <div className="description" role="Product Description">
                                <ReadMoreComponent>
                                    {product.description}
                                </ReadMoreComponent>
                                {/* <span className="readmore">Read more</span>*/}
                            </div>
                            <div className="quantity" role="Product Quantity">
                                <h6 className="p-details-heading">quantity</h6>
                                <div>
                                    {product.quantity >= 1 ? <button type="button" onClick={() => decrement(product)}> - </button> : <button type="button" onClick={decrementCount}> - </button>}
                                    <input type="text" readOnly id={product.id} value={product.quantity >= 1 ? product.quantity : count} />
                                    {product.quantity >= 1 ? <button type="button" onClick={() => increment(product)}> + </button> : <button type="button" onClick={incrementCount}> + </button>}
                                </div>
                            </div>
                            {/* Product Add to Cart and share buttons */}
                            <div className="addToCart" role="Product Add To Cart" >
                                <button type="button" onClick={() => addItemToCart(product, count)}>ADD TO CART</button>
                            </div>
                            <div className="save--share" role="product save and share">
                                <div className="save--share__save">
                                    <span onClick={HeartIconEvent} id={product.id} className="save--share__save__heart--icon">
                                    </span>
                                    <span className="save--share__save__title">
                                        Save
                                    </span>
                                </div>
                                <div className="save--share__share">
                                    <img src={ShareIcon} className="save--share__share__icon" alt="Share icon" />
                                    <span className="save--share__share__title">Share</span>
                                </div>
                            </div>

                        </div>
                    </div>
                        {/* Product summary */}
                        <div className='bottom-row-details aem-Grid aem-Grid--12' aria-label="Product Details" key={product.id}>
                            <h2 className="product-name" role="Product Name">{product.title}</h2>
                            <h6 className="product-description" role="Product Description Name">Description</h6>
                            <p role="Product Description">
                                {product.description}
                            </p>
                        </div></>
                ))}
            </div>
            : <LoaderComponent />
    )
}
let id = 0;
const createRandomItem = () => {
    id = id + 1;
    return {
        id,
        qty: 1,
        desc: `Item number: ${id}`,
        price: Number((Math.random() * 10 + 1).toFixed(2))
    };
};
export default ProductDetail