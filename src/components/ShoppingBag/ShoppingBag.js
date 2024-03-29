import React, { useState, useEffect } from "react";
import './ShoppingBag.scss';
import SaveForIcon from '../../assets/svg/heart.svg';
import EditIcon from '../../assets/svg/edit.svg';
import RemoveIcon from '../../assets/svg/trash.svg';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "../../reducers/products";
import { deleteToCart } from "../../reducers/products";
import { Link } from "react-router-dom";
import CollapsibleComponent from "../Collapsible/CollapsibleComponent";
import PriceSummary from '../Checkout/PriceSummary';
import { useParams } from "react-router-dom"
import { setWishlist } from "../../reducers/products";
function ShoppingBag() {
    const productsMain = useSelector(store => store.products.datas);
    const cartItems = useSelector(state => state.products.cart);
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();
    const [subTotalCount, setSubTotalCount] = useState([]);
    const [EstimatedTotalCount, setEstimatedTotalCount] = useState([0]);
    const { productId } = useParams();
    const [cartItemss, setCartItems] = useState();
    const increment = (product) => {
        if (product.quantity < 10) {
            const quantity = count + 1;
            product.quantity = product.quantity + quantity;
            setCartItems(product.quantity);
        }
    }
    const decrement = (product) => {
        if (product.quantity > 1) {
            const quantity = count - 1;
            product.quantity = product.quantity + quantity;
            setCartItems(product.quantity);
        }
    }
    let CounthandleChange = (e) => {
        setCount(e.target.value);
    }
    const removeItem = (product) => {
        const productId = product.id;
        const x = cartItems.filter((item) => item.id !== productId);
        dispatch(deleteToCart(x));
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
        cartItems.length ?
            <div className="inner-container">
                <h1 className="sh-bag-heading">Your Shopping Bag</h1>
                <div className='shopping-bag aem-Grid aem-Grid--12' aria-label="Add Cart Details">
                    <div className="aem-GridColumn aem-GridColumn--default--8 aem-GridColumn--phone--12">
                        {/* Added Cart items list start*/}
                        <section>
                            {cartItems.map((product) => (
                                <>
                                    <div className="shopping-thumbnails aem-Grid aem-Grid--12" >
                                        <div className="product--details" role="Added Cart items" key={product.id}>
                                            <img src={product.image} alt="Product Image" />
                                            <div className="bag-product-details" role="Added Cart item Details">
                                                <span className="bag-p-name">{product.title}</span>
                                                <span className="bag-p-size">Size: Medium</span>
                                                <span className="bag-p-color">Color: Storm</span>
                                                <span className="bag-p-price">${product.price}</span>
                                            </div>
                                        </div>
                                        <div className="product--quantity--edit">
                                            <div className="quantity" role="Product Quantity">
                                                <button type="button" onClick={() => decrement(product)}> - </button>
                                                <input type="number" readOnly id={product.id} value={product.quantity} />
                                                <button type="button" onClick={() => increment(product)}> + </button>
                                            </div>

                                            <div className="product-modify" role="Product Modification">
                                                <Link to={`/products/${product.id}`}>
                                                    <div className="edit">
                                                        <img src={EditIcon} className="Edit-icon" alt="Edit Icon" />
                                                        <span className="edit-title" role="Edit Cart Item">Edit item</span>
                                                    </div>
                                                </Link>
                                                <div className="remove" onClick={() => removeItem(product)} id={product.id}>
                                                    <img src={RemoveIcon} className="remove-icon" alt="Remove Icon" />
                                                    <span className="remove-title" role="Remove Cart Item">Remove</span>
                                                </div>
                                                <div className="savefor">
                                                    <span onClick={HeartIconEvent} id={product.id} className="save--share__save__heart--icon">
                                                    </span>
                                                    <span className="save-later" role="Save for later Cart Item">Save for later</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </section>
                        {/* Added Cart items list end*/}
                        {/* Product Shipping details start*/}
                        <section>
                            <div className="product--estimation">
                                <div className="product--estimation__row">
                                    <CollapsibleComponent label="Estimation your shipping">
                                        Estimation shipping details...
                                    </CollapsibleComponent>
                                </div>
                                <div className="product--estimation__row">
                                    <CollapsibleComponent label="Enter a coupon code">
                                        Coupon code details...
                                    </CollapsibleComponent>
                                </div>
                                <div className="product--estimation__row">
                                    <CollapsibleComponent label="Apply gift card">
                                        Gift card details:..
                                    </CollapsibleComponent>
                                </div>
                            </div>
                        </section>
                        {/* Product Shipping details end*/}
                    </div>
                    <PriceSummary />
                </div>
            </div> : <p className="no-cart" aria-label="No Products Description">No Products added in your Cart</p>
    );
}
export default ShoppingBag;