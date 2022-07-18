import React from 'react'
import './HomeShopDevicesComponent.scss'
import { Link } from "react-router-dom";
import { setProducts } from "../../reducers/products";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function HomeShopDevicesComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productsMain = useSelector(store => store.products.datas);
    const shopeDevices = () => {
            const result = productsMain.filter(x => 
                x.category == "electronics"
             );
            dispatch(setProducts(result));
            navigate('/Products/Electronics');
    }
    return (
        <>
        <section className='inner-container'>
           <div className='home--shop--devices'> 
            <div className='aem-Grid aem-Grid--12'> 
                <div className='aem-GridColumn aem-GridColumn--phone--12 aem-GridColumn--default--7 home--shop--devices_banner'>
                    <img src={require('../../assets/images/adventure-banner.jpg')} alt="Adventure Image" />
                </div>
                <div className='aem-GridColumn aem-GridColumn--phone--12 aem-GridColumn--default--5 home--shop--devices_text'>
                    <article>
                        <div className='home--shop--devices__row'>
                            <h2>Conquer your next adventure</h2>
                            <p className='home--shop--devices__row_subtitle'>Lorem Ipsum Dolor Tempor</p>
                            <div className='home--shop--devices__row__button'>
                                <button type='button' onClick={shopeDevices} className='transparent--button transparent--button--mod'>
                                    SHOP DEVICES
                                </button>
                            </div>
                        </div>    
                    </article>
                    <div className='home--shop--devices__row__location'>
                        <img src={require('../../assets/images/1.png')} alt="Location Icon" />
                    </div>
                </div>
            </div>
          </div> 
        </section>       
        </>
    )
}

export default HomeShopDevicesComponent
