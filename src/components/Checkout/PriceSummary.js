import React from 'react';
import { useState, useEffect } from "react";
import './PriceSummary.scss';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { setShippingInformation, setShippingMethod } from '../../reducers/form';
import { useNavigate } from "react-router-dom";

function PriceSummary() {
    const cartItems = useSelector(state => state.products.cart);
    const [count, setCount] = useState(0);
    return (
        <>
<div className="pricing-summary-box aem-GridColumn aem-GridColumn--default--4 aem-GridColumn--phone--12">
                    <div className="pricing-summary" role="Added Cart items Total Values">
                        <aside>
                        <h6>Pricing Summary</h6>
                        <div className="price-row">
                            <span className="left-val">Subtotal</span>
                            <span className="left-val"><strong>$ {Math.round(cartItems.reduce((total, item)=>total+(item.price*item.quantity),count)*  100) / 100}</strong></span>
                        </div>
                        <div className="price-row">
                            <span className="left-val">Coupon</span>
                            <span className="left-val"> $ 1</span>
                        </div>
                        <div className="price-row">
                            <span className="left-val">Gift Cart</span>
                            <span className="left-val"> $ 2</span>
                        </div>
                        <div className="price-row">
                            <span className="left-val">Estimated Tax</span>
                            <span className="left-val">$ 1</span>
                        </div>
                        <div className="price-row">
                            <span className="left-val">Estimated Shipping</span>
                            <span className="left-val">Free</span>
                        </div>
                        <div className="price-row">
                            <span className="left-val">Estimated Total</span>
                            <span className="left-val"><strong>$ {Math.round((cartItems.reduce((total, item)=>total+(item.price*item.quantity),count)+2) * 100) / 100}</strong></span>
                        </div>
                       </aside> 
                    </div>
                </div>
                </>
    )
                {/* Cart items Pricing details end*/} 

}
export default PriceSummary            