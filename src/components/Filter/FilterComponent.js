import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './FilterComponent.scss';
import { useNavigate } from "react-router-dom";
import { setCartElectronics, setCartJewellery, setCartWomen, setProducts } from "../../reducers/products";
import { setCartMen } from "../../reducers/products";
import { toppings } from "./toppings";
function FilterComponent() {
  const productsMain = useSelector(store => store.products.datas);
  const checkedValues = useSelector(store => store.products.jewellery);
  const products = useSelector(store => store.products.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jewelleryItems = useSelector(store => store.products.jewellery);
  const menItems = useSelector(store => store.products.men);
  const womenItems = useSelector(store => store.products.women);
  const electronicItems = useSelector(store => store.products.electronics);
  let url = "";
  const checkedResults = [];
  const [checkedState, setCheckedState] = useState(
    new Array(toppings.length).fill(false)
  );
  useEffect(() => {
    dispatch(setCartJewellery(false));
  }, []);
  const [total, setTotal] = useState(0);
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    updatedCheckedState.forEach((val, index) => {
      if (val == true && index == 0) {
        checkedResults.push('womenItems');
      } else if (val == true && index == 1) {
        checkedResults.push('menItems');
      } else if (val == true && index == 2) {
        checkedResults.push('jewelleryItems');
      } else if (val == true && index == 3) {
        checkedResults.push('electronicItems');
      }
    })
    let totalVals = [];
    let uniqueChars = [...new Set(checkedResults)];
    var a = checkedResults;
    for (let i = 0; i < a.length; i++) {
      if (a[i] == 'womenItems') {
        let result = productsMain.filter(x =>
          x.category == "women's clothing"
        );
        Array.prototype.push.apply(totalVals, result);
      } else if (a[i] == 'menItems') {
        let result = productsMain.filter(x =>
          x.category == "men's clothing"
        );
        Array.prototype.push.apply(totalVals, result);
      } else if (a[i] == 'jewelleryItems') {
        let result = productsMain.filter(x =>
          x.category == "jewelery"
        );
        Array.prototype.push.apply(totalVals, result);
      } else if (a[i] == 'electronicItems') {
        let result = productsMain.filter(x =>
          x.category == "electronics"
        );
        Array.prototype.push.apply(totalVals, result);
      }
      if (a.length - 1 === i) {
        dispatch(setProducts(totalVals));
      }
    }
    if (checkedResults.length == 0) {
      dispatch(setProducts(productsMain));
    }
    navigate('/FilterResults')
    setCheckedState(updatedCheckedState);
  }
  return (
    <>
      {/* Page Navigation section */}
      <nav className="crumbs">
        <Link to="/" aria-label='Clothing url'>Clothing</Link> /
        <Link to="/" aria-label='Womens url'>Women's</Link> /
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
        {/* Brands section start */}
        <fieldset>
          <div className="filter-sub-title">Category</div>
          {toppings.map(({ name, price }, index) => {
            return (
              <div role="group" key={index}>
                <label htmlFor={`custom-checkbox-${index}`}>
                  <input
                    type="checkbox"
                    className='checkbox-field'
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  {name}</label>
              </div>
            );
          })}
        </fieldset>
      </div >
      {/* filters section end */}
    </>
  )
}
export default FilterComponent