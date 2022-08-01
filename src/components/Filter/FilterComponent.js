import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './FilterComponent.scss';
import { useNavigate } from "react-router-dom";
import { setCartElectronics, setCartJewellery, setCartWomen, setProducts } from "../../reducers/products";
import { setCartMen } from "../../reducers/products";
import { toppings } from "./toppings";
import { useLocation } from "react-router-dom"
function FilterComponent() {
  const productsMain = useSelector(store => store.products.datas);
  const checkedValues = useSelector(store => store.products.jewellery);
  const products = useSelector(store => store.products.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menItems = useSelector(store => store.products.men);
  const womenItems = useSelector(store => store.products.women);
  const electronicItems = useSelector(store => store.products.electronics);
  const location = useLocation();
  const [showWomens, setShowWomens] = useState(checkedValues);
  const [clearVal, setClearVal] = useState(false);
  let url = "";
  const checkedResults = [];
  const [checkedState, setCheckedState] = useState(
    new Array(toppings.length).fill(false)
  );

  useEffect(() => {
    dispatch(setCartJewellery(false));
    /* if (location.pathname = '/Products/Women') {
      setShowWomens(true);
    } else {
      setShowWomens(false);
    } */
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

    setCheckedState(updatedCheckedState);
  }
  const clearAll = () => {
    // setClearVal(false);
    setCheckedState(new Array(toppings.length).fill(false));
    dispatch(setProducts(productsMain));
  }
  return (
    <>
      <div className='clear--all--row--link'>
        <span onClick={clearAll} className='clear--all--link'>Clear All</span>
      </div>
      <div className="filter-sub-title">Category</div>
      <aside>
        {toppings.map(({ name }, index) => {
          return (
            <div role="group" key={index}>
              <label>
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
      </aside>
      <div className='clear--all--row mobile--view'>
        <button type="button" value="Clear All" onClick={clearAll} className='clear--all'>see {products.length} results</button>
      </div>
    </>
  )
}
export default FilterComponent