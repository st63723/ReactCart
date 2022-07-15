import React from 'react';
import { useState, useEffect } from "react";
import './PaymentInformation.scss';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { setPaymentInformation } from '../../reducers/form';
import { useNavigate } from "react-router-dom";
import EditIcon from '../../assets/svg/edit.svg';

function PaymentInformation() {
    const { register, handleSubmit, setValue, formState: { errors }} = useForm();
    const [count, setCount] = useState(0);
    const cartItems = useSelector(state => state.products.cart);
    const getFormShIn = useSelector(state => state.form.shippingInformation);
    const getFormShMe = useSelector(state => state.form.shippingMethod);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
      dispatch(setPaymentInformation(data));
      // navigate('/ShippingInformation');
        console.log(data);
      };
    const ShippingInformationEdit = () =>{
      navigate('/ShippingInformation');
    } 
    const ShippingMethodEdit = () =>{
        navigate('/ShippingMethod');
      }  
    useEffect(() => {
      setValue("ShippingMethod", getFormShIn.ShippingMethod); 
  }, []);

    return (
    <>
    <div className="inner-container shipping--information payment-method">
            <h1 className="checkout--heading">Checkout</h1>
            <div className='aem-Grid aem-Grid--12' aria-label="Add Cart Details">
                <div className="aem-GridColumn aem-GridColumn--default--8 aem-GridColumn--phone--12">
                <form onSubmit={handleSubmit(onSubmit)}>
                      <h2 className="guest--checkout">Guest Checkout</h2>
                      
                      <div className="shipping--information--edit">
                        <div className='aem-Grid aem-Grid--12 form--row'>
                          <h4 className='shipping--information--edit_heading'>Shipping Information</h4>
                          <div className="edit" onClick={ShippingInformationEdit}>
                               <img src={EditIcon} className="edit--icon" alt="Edit Icon" />
                               <span className="edit--title" role="Edit Cart Item">Edit</span>
                          </div>
                        </div>
                        <div className='aem-Grid aem-Grid--12 form--row'>
                            <div className="aem-GridColumn aem-GridColumn--default--6 aem-GridColumn--phone--12">
                              <span className='shipping--information--edit__email'>{getFormShIn.Email}</span>
                              <span className='shipping--information--edit__phonenumber'>{getFormShIn.PhoneNumber}</span>
                            </div>
                            <div className="aem-GridColumn aem-GridColumn--default--6 aem-GridColumn--phone--12">
                              <span className='shipping--information--edit__name'>{getFormShIn.FirstName} {getFormShIn.LastName}</span>
                              <span className='shipping--information--edit__address'>{getFormShIn.StreetAddress} <br /> {getFormShIn.StreetAddress}</span>
                              <span className='shipping--information--edit__city'>{getFormShIn.City}</span>
                              <span className='shipping--information--edit__statezip'>{getFormShIn.State} - {getFormShIn.Zip}</span>
                            </div>
                        </div>     
                      </div>

                      <div className="shipping--information--edit shipping--Method--edit">
                        <div className='aem-Grid aem-Grid--12 form--row'>
                          <h4 className='shipping--information--edit_heading'>Shipping Method</h4>
                          <div className="edit" onClick={ShippingMethodEdit}>
                               <img src={EditIcon} className="edit--icon" alt="Edit Icon" />
                               <span className="edit--title" role="Edit Cart Item">Edit</span>
                          </div>
                        </div>
                        <div className='aem-Grid aem-Grid--12 form--row'>
                            <div className="aem-GridColumn aem-GridColumn--default--6 aem-GridColumn--phone--12">
                              <span className='shipping--Method--edit__standarshipping'>{getFormShMe.ShippingMethod}</span>
                            </div>
                        </div>     
                      </div>
                      
                      <h4 className='payment--information--heding'>2. Payment Information</h4>
                      <div className='payment--information'>
                        <div className='aem-Grid aem-Grid--12 margin-bottom-20'>
                          <div className="aem-GridColumn aem-GridColumn--default--6 aem-GridColumn--phone--12">
                            <div className="form--group credit--card">
                                <input type="radio" checked id='creditCart' className='creditcard' name='creditCard' {...register("creditCard")} /> 
                                <label for="creditCart"> Credit Card</label>
                            </div>
                          </div>
                        </div>  
                        <div className='aem-Grid aem-Grid--12 margin-bottom-20'>
                          <div className="aem-GridColumn aem-GridColumn--default--6 aem-GridColumn--phone--12"> 
                            <div className="form--group">
                                <label> Name on Card</label>
                                <input placeholder=''
                                name="NameOnCard" type="text" {...register("NameOnCard", {required: "Required",
                                })}
                                />
                                {errors.NameOnCard && <p className="errorMsg">{errors.NameOnCard.message}</p>}   
                            </div>
                          </div>  
                        </div>  
                        
                        <div className='aem-Grid aem-Grid--12 margin-bottom-20'>   
                          <div className="aem-GridColumn aem-GridColumn--default--6 aem-GridColumn--phone--12">  
                            <div className="form--group">
                                <label> Credit Card Number</label>
                                <input placeholder=''
                                name="CreditCardNumber" type="number" {...register("CreditCardNumber", {required: "Required",
                                })}
                                />
                                {errors.CreditCardNumber && <p className="errorMsg">{errors.CreditCardNumber.message}</p>}   
                            </div>
                          </div>  
                        </div> 
                        <div className='aem-Grid aem-Grid--12 margin-bottom-20'>
                          <div className="aem-GridColumn aem-GridColumn--default--3">
                           <div className="form--group">
                                <label> Expiration Date</label>
                                <input placeholder=''
                                name="ExpirationDate" type="number" {...register("ExpirationDate", {required: "Required",
                                })}
                                />
                                {errors.ExpirationDate && <p className="errorMsg">{errors.ExpirationDate.message}</p>}   
                            </div>
                          </div>
                          <div className="aem-GridColumn aem-GridColumn--default--2">
                           <div className="form--group">
                                <label> CVV</label>
                                <input placeholder=''
                                name="CVV" type="number" {...register("CVV", {required: "Required",
                                })}
                                />
                                {errors.CVV && <p className="errorMsg">{errors.CVV.message}</p>}   
                            </div>
                          </div>
                          <div className="aem-GridColumn aem-GridColumn--default--1 question--mark">
                            <img src={require('../../assets/images/question-mark-icon.png')} alt='Question Mark Icon' />
                          </div>
                        </div> 
                        <div className='aem-Grid aem-Grid--12 margin-bottom-20'>
                          <div className="aem-GridColumn aem-GridColumn--default--6 aem-GridColumn--phone--12">
                            <div className="form--group credit--card">
                                <input type="checkbox" checked className='creditcard' name='billingAddress' value="Billing address same as shipping address" {...register("billingAddress")} /> 
                                <label for="standardShipping"> Billing address same as shipping</label>
                            </div>
                          </div>
                        </div>
                        <div className='aem-Grid aem-Grid--12 margin-bottom-20'>
                          <div className="aem-GridColumn aem-GridColumn--default--12 paypal--border">
                            <div className="form--group credit--card">
                                <input type="radio" className='creditcard' name='Paypal' value="Paypal" {...register("Paypal")} /> 
                                <label for="standardShipping"> Paypal</label>
                                {errors.Paypal && <p className="errorMsg">{errors.Paypal.message}</p>} 
                            </div>
                          </div>
                        </div> 

                     </div>        
                      <div className='checkout--button'>
                        <input type='submit' className='transparent--button' value="CONTINUE TO REVIEW ORDER" />     
                      </div>
                    </form>
                </div>
                
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
                {/* Cart items Pricing details end*/}  
                </div>
            </div>    
    </>
    )
}

export default PaymentInformation;

