import React from 'react';
import { useState } from "react";
import './PaymentInformation.scss';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditIcon from '../../assets/svg/edit.svg';

function ReviewOrder() {
    const { register, handleSubmit, setValue, formState: { errors }} = useForm();
    const [count, setCount] = useState(0);
    const cartItems = useSelector(state => state.products.cart);
    const getFormShIn = useSelector(state => state.form.shippingInformation);
    const getFormShMe = useSelector(state => state.form.shippingMethod);
    const getFormPayIn = useSelector(state => state.form.paymentInformation);
    const navigate = useNavigate();

    const ShippingInformationEdit = () =>{
      navigate('/ShippingInformation');
    } 
    const ShippingMethodEdit = () =>{
        navigate('/ShippingMethod');
      }
      const PaymentInformationEdit = () =>{
        navigate('/PaymentInformation');
      } 
     
    return (
    <>
    <div className="inner-container shipping--information payment-method review-order">
            <h1 className="checkout--heading">Order Successfull</h1>
            <div className='aem-Grid aem-Grid--12' aria-label="Add Cart Details">
                <div className="aem-GridColumn aem-GridColumn--default--8 aem-GridColumn--phone--12">
                <form onSubmit={handleSubmit(onSubmit)}>
                      <h2 className="guest--checkout">Order Number 1700834</h2>
                      
                      <div className="shipping--information--edit">
                        <div className='aem-Grid aem-Grid--12 form--row'>
                          <h4 className='shipping--information--edit_heading'>Shipping Information</h4>
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
                        </div>
                        <div className='aem-Grid aem-Grid--12 form--row'>
                            <div className="aem-GridColumn aem-GridColumn--default--6 aem-GridColumn--phone--12">
                              <span className='shipping--Method--edit__standarshipping'>{getFormShMe.ShippingMethod}</span>
                            </div>
                        </div>     
                      </div>

                      <div className="shipping--information--edit payment--method--edit">
                        <div className='aem-Grid aem-Grid--12 form--row'>
                          <h4 className='shipping--information--edit_heading'>Payment Information</h4>
                        </div>
                        <div className='aem-Grid aem-Grid--12 form--row'>
                            <div className="aem-GridColumn aem-GridColumn--default--6 aem-GridColumn--phone--12">
                              <span className='shipping--Method--edit__standarshipping'>{getFormPayIn.creditCard}</span>
                              <span className='shipping--Method--edit__standarshipping'>Visa ending in {getFormPayIn.CreditCardNumber}</span>
                            </div>
                        </div>     
                      </div>
                    </form>

                   
                     {/* Added Cart items list start*/} 
                <div className='placed--items'> 
                  <section>     
                  <div className='order--items'>{cartItems.length} items in your order</div>
                    <> 
                    <div className="shopping-thumbnails aem-Grid aem-Grid--12" >
                        {cartItems.map((product) => ( 
                        <div className="aem-GridColumn aem-GridColumn--default--6 aem-GridColumn--phone--12" role="Added Cart items" key={product.id}>
                            <img src={product.image} alt="Product Image" />
                            <div className="bag-product-details" role="Added Cart item Details">
                                <span className="bag-p-name">{product.title}</span>
                                <span className="bag-p-size">Size: Medium</span>
                                <span className="bag-p-color">Color: Storm</span>
                                <span className="bag-p-price">${product.quantity}</span>
                            </div>
                          </div>
                          ))}
                    </div>
                    </>
                </section>
                </div>
                {/* Added Cart items list end*/}
            
                <p>You will also receive an email with the details and we will let you know when your order has shipped.</p>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. For assistance call Support at 1-800-867-5309, M - F, 9am - 8pm EST.</p>
                </div>
                 
                </div>
            </div>    
    </>
    )
}

export default ReviewOrder;

