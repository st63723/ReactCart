import React from 'react';
import { useState, useEffect } from "react";
import './PaymentInformation.scss';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { setPaymentInformation } from '../../reducers/form';
import { useNavigate } from "react-router-dom";
import EditIcon from '../../assets/svg/edit.svg';
import PriceSummary from './PriceSummary';
function PaymentInformation() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [count, setCount] = useState(0);
  const cartItems = useSelector(state => state.products.cart);
  const getFormShIn = useSelector(state => state.form.shippingInformation);
  const getFormShMe = useSelector(state => state.form.shippingMethod);
  const getFormPayIn = useSelector(state => state.form.paymentInformation);
  const [selectCardDetails, setSelectCardDetails] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectPayment = (e) => {
    if (e.target.value == "Credit Card") {
      setSelectCardDetails(true);
    } else if (e.target.value == "Paypal") {
      setSelectCardDetails(false);
      setValue("NameOnCard", '');
      setValue("CreditCardNumber", '');
      setValue("ExpirationDate", '');
      setValue("CVV", '');
      setValue("BillingAddress", '');
    }
  }
  const onSubmit = (data) => {
    dispatch(setPaymentInformation(data));
    navigate('/ReviewOrder');
    console.log(data);
  };
  const ShippingInformationEdit = () => {
    navigate('/ShippingInformation');
  }
  const ShippingMethodEdit = () => {
    navigate('/ShippingMethod');
  }
  useEffect(() => {
    setValue("BillingPayment", getFormPayIn.BillingPayment);
    setValue("NameOnCard", getFormPayIn.NameOnCard);
    setValue("CreditCardNumber", getFormPayIn.CreditCardNumber);
    setValue("ExpirationDate", getFormPayIn.ExpirationDate);
    setValue("CVV", getFormPayIn.CVV);
    setValue("BillingAddress", getFormPayIn.BillingAddress);
    if (getFormPayIn.BillingPayment == 'Credit Card') {
      setSelectCardDetails(true);
    }
  }, []);
  return (
    <>
      <div className="inner-container shipping--information shipping--method--page payment-method">
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
                    <span className='shipping--information--edit__address'>{getFormShIn.StreetAddress} <br /> {getFormShIn.StreetAddress2}</span>
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
                  <div className="aem-GridColumn aem-GridColumn--default--8 aem-GridColumn--phone--12">
                    <div className="form--group credit--card">
                      <input type="radio" id='creditCart' onClick={selectPayment} className='creditcard' value="Credit Card" name='BillingPayment' {...register("BillingPayment", {
                        required: "true"
                      })} />
                      <label for="creditCart"> Credit Card</label>
                    </div>
                  </div>
                </div>
                <div className={`${selectCardDetails ? "show--card--details" : "hide--card--details"}`}>
                  <div className='aem-Grid aem-Grid--12 margin-bottom-20'>
                    <div className="aem-GridColumn aem-GridColumn--default--8 aem-GridColumn--phone--12">
                      <div className="form--group">
                        <label> Name on Card</label>
                        <input placeholder=''
                          name="NameOnCard" type="text" {...register("NameOnCard", {
                            required: {
                              value: selectCardDetails,
                              message: 'Enter Name on Card'
                            },
                            pattern: {
                              value: /^[a-zA-Z ]{2,30}$/,
                              message: 'Enter only Letters'
                            }
                          })}
                        />
                        {errors.NameOnCard && <p className="errorMsg">{errors.NameOnCard.message}</p>}
                      </div>
                    </div>
                  </div>
                  <div className='aem-Grid aem-Grid--12 margin-bottom-20'>
                    <div className="aem-GridColumn aem-GridColumn--default--8 aem-GridColumn--phone--12">
                      <div className="form--group">
                        <label> Credit Card Number</label>
                        <input placeholder='xxxx-xxxx-xxxx-xxxx'
                          name="CreditCardNumber" type="number" {...register("CreditCardNumber", {
                            required: {
                              value: selectCardDetails,
                              message: 'Enter only Numbers'
                            },
                            pattern: {
                              value: /^\(?([0-9]{4})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
                              message: 'Enter Valid Card Number(16 Digits)'
                            }
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
                          name="ExpirationDate" type="date" value="2018-07-22"
                          min="2018-01-01" max="2028-12-31" {...register("ExpirationDate", {
                            required: {
                              value: selectCardDetails,
                              message: 'Enter Card Expire Date'
                            },
                          })}
                        />
                        {errors.ExpirationDate && <p className="errorMsg">{errors.ExpirationDate.message}</p>}
                      </div>
                    </div>
                    <div className="aem-GridColumn aem-GridColumn--default--2">
                      <div className="form--group">
                        <label> CVV</label>
                        <input placeholder=''
                          name="CVV" type="number" {...register("CVV", {
                            required: {
                              value: selectCardDetails,
                              message: 'Enter Secret CVV'
                            },
                            pattern: {
                              value: /^\(?([0-9]{3})$/,
                              message: 'Enter only Numbers (3 Digits)'
                            }
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
                    <div className="aem-GridColumn aem-GridColumn--default--8 aem-GridColumn--phone--12">
                      <div className="form--group credit--card">
                        <input type="checkbox" className='creditcard' name='BillingAddress' {...register("BillingAddress", {
                          required: {
                            value: selectCardDetails,
                            message: 'Select Checkbox If Billing address Same'
                          }
                        })} value="Billing address same as shipping address" />
                        <label for="standardShipping"> Billing address same as shipping</label>
                        {errors.BillingAddress && <p className="errorMsg">{errors.BillingAddress.message}</p>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='aem-Grid aem-Grid--12 margin-bottom-20'>
                  <div className="aem-GridColumn aem-GridColumn--default--12 paypal--border">
                    <div className="form--group credit--card">
                      <input type="radio" className='creditcard' onClick={selectPayment} name='BillingPayment' value="Paypal" {...register("BillingPayment", {
                        required: "Select Credit Card or Paypal"
                      })} />
                      <label for="standardShipping"> Paypal</label>
                      {errors.BillingPayment && <p className="errorMsg">{errors.BillingPayment.message}</p>}
                    </div>
                  </div>
                </div>
              </div>
              <div className='checkout--button'>
                <input type='submit' className='transparent--button' value="CONTINUE TO REVIEW ORDER" />
              </div>
            </form>
          </div>
          <PriceSummary />
        </div>
      </div>
    </>
  )
}
export default PaymentInformation;