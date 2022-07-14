import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './FilterComponent.scss';
import { useNavigate } from "react-router-dom";
import { setCartElectronics, setCartJewellery, setCartWomen, setProducts } from "../../reducers/products";
import { setCartMen } from "../../reducers/products";

function FilterComponent() {
  const productsMain = useSelector(store => store.products.datas);
  const products = useSelector(store => store.products.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jewelleryItems = useSelector(store => store.products.jewellery);
  const menItems = useSelector(store => store.products.men);
  const womenItems = useSelector(store => store.products.women);
  const electronicItems = useSelector(store => store.products.electronics);
    let url = "";

 /* const jewelleryCheckbox = () =>{
  dispatch(setProducts(jewelleryItems));
  navigate('/Products/Jewellery');
} */

useEffect(() => {
  console.log([...menItems]);
  const result = productsMain.filter(x => 
    x.category == "jewelery"
  );
  dispatch(setCartJewellery(result));

  const result1 = productsMain.filter(x => 
    x.category == "men's clothing"
  );
  dispatch(setCartMen(result1));

  const result2 = productsMain.filter(x => 
    x.category == "electronics"
  );
  dispatch(setCartElectronics(result2));

  const result3 = productsMain.filter(x => 
    x.category == "women's clothing"
  );
  dispatch(setCartWomen(result3));

     }, []);


    const checkedResults =[];
    const cartCheckbox = (e) => {
        var s = e.target.value;
        if (e.target.checked) {
          checkedResults.concat(s);
          alert(checkedResults);
             checkedResults.push(s);
           // dispatch(setProducts(checkedResults));
        } else {
            var index = checkedResults.indexOf(s);
            if (index > -1) {
              checkedResults.splice(index, 1);
            }
            dispatch(setProducts(productsMain));  
        }
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
                     <div className='colors-names-row'>
                        <span className='colors-name'>Black</span>
                       <a href={url}>Clear all</a> 
                     </div>
                </div> 
                <div className='filter-title filters-desktop'>Filters</div>

             {/* Brands section start */}   
            <fieldset>
                <div className='filter-sub-title'>Category</div>
                    <div role="group">
                      <label>  
                          <input type="checkbox" onChange={cartCheckbox}  value="jewelleryItems" className="checkbox-field" />
                          Jewellery
                      </label>
                    </div>
                    <div role="group">
                      <label>  
                          <input type="checkbox" onChange={cartCheckbox}  value="electronicItems" className="checkbox-field" />
                          Electronics
                        </label>
                    </div>
                    <div role="group">
                        <label>  
                          <input type="checkbox" onChange={cartCheckbox} value="menItems" className="checkbox-field" />
                          Men's Clothing
                        </label>
                    </div>
                    <div role="group">
                      <label>  
                          <input type="checkbox" onChange={cartCheckbox} value="womenItems" className="checkbox-field" />
                          Women's Clothing
                        </label>
                    </div>
                 </fieldset>   
        </div>
        {/* filters section end */}
    </>
    )
}

export default FilterComponent


