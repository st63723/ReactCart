import React from 'react'
import './CheckoutForm.scss';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';

function ShippingInformation() {
    const { register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = (data) => {
        console.log(data);
      };
    
    return (
    <>
    <div className="inner-container">
            <h1 className="sh-bag-heading1">Checkout</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
    <h2 className="sh-bag-heading1">Checkout</h2>
        <div className="form--group ">
            <label> Email</label>
            <input
            name="Email" type="text" {...register("Email", {required: "Required",
            pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Email is not valid.'
            }
            })}
            />
            {errors.Email && <p className="errorMsg">{errors.Email.message}</p>}
            
        </div>
        <div className='filter-sub-title'>Category</div>
                    <div role="group">
                      <label>  
                          <input type="checkbox"  value="jewelleryItems" className="checkbox-field" />
                          Jewellery
                      </label>
                    </div>
        
        <div className="form-control">
          <label></label>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
    </>
    )
}

export default ShippingInformation;

