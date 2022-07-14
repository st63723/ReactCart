import { combineReducers } from "redux";
import entityErrors from "./error";
import products from "./products";

const reducers = combineReducers({
    entityErrors,
    products: products
})

export default reducers;