import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './index.scss';
function My404Component() {
    let url = "";
    return (
        <>
            <section>
                <div className='my404'>
                    <h1>Page Not Found</h1>
                    <p>Sorry, there is nothing to see here.</p>
                    <p><Link to="/ReactCart">Back to Home</Link></p>
                </div>
            </section>
        </>
    )
}
export default My404Component
