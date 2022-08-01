import React, { useState, useEffect } from "react";
import Axios from "axios";
import FilterComponent from '../Filter/FilterComponent';
import LoaderComponent from "../Loader/LoaderComponent";
import FiltersIcon from '../../assets/svg/filters.svg';
import ArrowUpIcon from '../../assets/svg/arrow-up.svg';
import ArrowDownIcon from '../../assets/svg/arrow-down.svg';
import HeartIcon from '../../assets/svg/heart.svg';
import './ProductsComponent.scss';
import './PaginationComponent.scss';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom"
import Pagination from "react-js-pagination";
import { setProducts, setWishlist } from "../../reducers/products";
import { setMainProducts } from "../../reducers/products";
import { useDispatch, useSelector } from "react-redux";
function ProductsComponent() {
    const productsMain = useSelector(store => store.products.datas);
    const [dropdownValue, setDropdownValue] = useState([]);
    const [sortAllProducts, setSortAllProducts] = useState(false);
    const [changeHeartIcon, setChangeHeartIcon] = useState(false);
    const [hideLightbox, setHideLightbox] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const dispatch = useDispatch();
    const products = useSelector(store => store.products.data);
    const location = useLocation();
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const dropdownChange = (e) => {
        var x = e.target.value;
        if (x == "low") {
            var inData = products?.sort((a, b) => (a.price > b.price ? 1 : -1));
            setDropdownValue(x);
            dispatch(setProducts(inData));
        } else {
            var inData = products?.sort((a, b) => (a.price > b.price ? -1 : 1));
            setDropdownValue(x);
            dispatch(setProducts(inData));
        }
    }
    const sortProducts = (value) => {
        var x = value;
        if (x == "low") {
            var inData = products?.sort((a, b) => (a.price > b.price ? 1 : -1));
            setDropdownValue(x);
            dispatch(setProducts(inData));
        } else {
            var inData = products?.sort((a, b) => (a.price > b.price ? -1 : 1));
            setDropdownValue(x);
            dispatch(setProducts(inData));
        }
    }
    const HeartIconEvent = (e) => {
        const x = e.target.id;
        if (e.target.className == "products--box__product__heart--icon") {
            e.target.className = 'products--box__product__heart--icon--red'
        } else {
            e.target.className = 'products--box__product__heart--icon'
        }
        // setChangeHeartIcon(x);
        const whishItem = productsMain.filter(xv =>
            xv.id == x
        );
        dispatch(setWishlist(whishItem));
    }
    //pagination 
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
    let url = "";
    return (
        products.length ?
            <div className='inner-container'>
                <div className='products aem-Grid aem-Grid--12' aria-label="Cloth Products">
                    {/* Left Filters section start */}
                    <div className={`${hideLightbox ? "products__show--lightbox" : "products__hide--lightbox"}`}>
                        <span className='products__cross--mobile' onClick={() => setHideLightbox(false)}> X </span>
                        <div className="products__filters aem-GridColumn aem-GridColumn--default--4 aem-GridColumn--phone--12">
                            <aside>
                                <FilterComponent />
                            </aside>
                        </div>
                    </div>

                    <div className="products__filters aem-GridColumn aem-GridColumn--default--4 aem-GridColumn--phone--12">
                        {/* Page Navigation section */}
                        <nav className="crumbs">
                            <Link to="/" aria-label='Clothing url'>Clothing</Link> /
                            <Link to="/" aria-label='Outerwear url'>Outerwear</Link>
                        </nav>
                        {/* filters section start */}
                        <div className="filters">
                            <div className="filters-mobile">
                                <div className='filter-title'>
                                    Filters
                                </div>
                            </div>
                            <div className='filter-title filters-desktop'>Filters</div>
                            <div className="filter-sub-title">Category</div>
                            <aside className={`${(products[0].allProducts == "yes") ? "all__products__show" : "all__products__hide"}`}>
                                <FilterComponent />
                            </aside>
                            <aside className={`${(products[0].category == "men's clothing") ? "mens__products__show" : "mens__products__hide"}`}>
                                <div role="group"><label><input type="checkbox" checked="checked" readOnly />Men's Clothing</label></div>
                            </aside>
                            <aside className={`${(products[0].category == "jewelery") ? "jewelery__products__show" : "jewelery__products__hide"}`}>

                                <div role="group"><label><input type="checkbox" checked="checked" readOnly />Jewellery</label></div>
                            </aside>
                            <aside className={`${(products[0].category == "electronics") ? "electronics__products__show" : "electronics__products__hide"}`}>

                                <div role="group"><label><input type="checkbox" checked="checked" readOnly />Electronics</label></div>
                            </aside>
                            <aside className={`${(products[0].category == "women's clothing") ? "womens__products__show" : "womens__products__hide"}`}>

                                <div role="group"><label><input type="checkbox" checked="checked" readOnly />Women's Clothing</label></div>
                            </aside>
                        </div>
                    </div>
                    {/* Left Filters section end */}
                    <div className="aem-GridColumn aem-GridColumn--default--8 aem-GridColumn--phone--12">
                        {/* Filter resultsand sort products for mobile view */}
                        <div className='filters--sort mobile--view'>
                            {/*  <span className='filters--sort__results' onClick={() => setHideLightbox(true)}>
                                <img src={FiltersIcon} alt="Filters icon" />
                                Filter Results
                            </span>*/}
                            <span className='filters--sort__products'>
                                <img src={ArrowDownIcon} onClick={() => sortProducts('low')} alt="Sort Products icon" />
                                <img src={ArrowUpIcon} onClick={() => sortProducts('high')} alt="Sort Products icon" />
                                Sort Products
                            </span>
                        </div>
                        {/* Filter resultsand sort products for mobile view end*/}
                        {/* products length and sort dropdown start*/}
                        <div className="aem-GridColumn aem-GridColumn--default--12 aem-GridColumn--phone--12">
                            <div className='aem-Grid aem-Grid--12'>
                                <div className="aem-GridColumn aem-GridColumn--default--6 aem-GridColumn--phone--12">
                                    <span className='dark--gunmental semi-bold products--count'> {products.length} Results</span>
                                </div>
                                <div className="aem-GridColumn aem-GridColumn--default--6 aem-GridColumn--phone--hide">
                                    <select onChange={(e) => dropdownChange(e)}>
                                        <option value="low">Sort By Price: Low to High</option>
                                        <option value="high">Sort By Price: High to Low</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* products length and sort dropdown end*/}
                        {/* products List start*/}
                        <section>
                            <div className='products--box'>
                                {currentPosts.map((product) => (
                                    <article key={product.id}>
                                        <div className='products--box__product'>
                                            <Link to={`/Products/${product.id}`}>
                                                <img src={product.image} alt={product.title} />
                                                <span className='products--box__product__name'>{product.title}</span>
                                                <span className='products--box__product__price'>${product.price}</span>
                                            </Link>
                                            <div onClick={HeartIconEvent} id={product.id} className="products--box__product__heart--icon"></div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                        {/* products List end*/}
                        {/* Pagination start*/}
                        <div className="pagination-background">
                            <Pagination
                                itemsCountPerPage={postsPerPage}
                                activePage={currentPage}
                                totalItemsCount={products.length}
                                onChange={handlePageChange}
                                hideFirstLastPages={true}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>   {/* Pagination end*/}
                    </div>
                </div>
            </div>
            : <div className='container'><LoaderComponent /></div>
    )
}
export default ProductsComponent