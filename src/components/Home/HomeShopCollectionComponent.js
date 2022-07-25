import React from 'react'
import './HomeShopCollectionComponent.scss'
import { Link } from "react-router-dom";
import { setProducts } from "../../reducers/products";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function HomeShopCollectionComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productsMain = useSelector(store => store.products.datas);
    const shopNow = () => {
        dispatch(setProducts(productsMain));
        navigate('/Products')
    }
    return (
        <>
            <section className='inner-container'>
                <div className='home--shop--collection'>
                    <div className='aem-Grid aem-Grid--12'>
                        <div className='aem-GridColumn aem-GridColumn--phone--12 mobile'>
                            <img src={require('../../assets/images/men-image.jpg')} alt="Product Image" />
                        </div>
                        <div className='aem-GridColumn aem-GridColumn--default--6 aem-GridColumn--phone--12'>
                            <article>
                                <div className='home--shop--collection__row'>
                                    <h2>Take off in the new Signature Legging</h2>
                                    <p className='home--shop--collection__row__subtitle'>Lorem Ipsum Dolor Tempor</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor labore dolore magna lorem ipsum dolor sit dolore magna.</p>
                                    <div className='home--shop--collection__row__buttons'>
                                        <button type='button' onClick={shopNow} className='transparent--button'>
                                            SHOP COLLECTION
                                        </button>
                                        <button type='button' onClick={shopNow} className='blue--button'>
                                            SHOP NOW
                                        </button>
                                    </div>
                                    <div className='home--shop--collection__row__line'></div>
                                </div>
                            </article>
                        </div>
                        <div className='aem-GridColumn aem-GridColumn--default--6 desktop'>
                            <img src={require('../../assets/images/men-image.jpg')} alt="Product Image" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default HomeShopCollectionComponent