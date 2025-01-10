import React from 'react';
import { useTranslation } from "react-i18next";

import PayPal from '../images/PayPal.png'
import payment_me from '../images/payment_me.png'

const NewCheckout = (props) => {

    const { t } = useTranslation();

    return (
        <div className='checkout-new-page'>
            <div class="row">
            <div class="col-md-6">
           <div className='checkout-left'>
            <h6 className='express-text'>Express Checkout</h6>
            <div className='express-checkout-design'>
            <button type="submit"><img src={PayPal} /> </button>
            <button type="submit" className='payment_me'><img src={payment_me} /></button>
            </div>
            <p className='or-design'>or</p>
            <hr></hr>
            <div className='login-check'>
                <h2>Contact</h2>
                <a href='#'>Log in</a>
            </div>
            <input type="text" id="" name="" placeholder="Phone number or email" required/>
            <label className='billing-same'>
          <input type="checkbox" checked="checked" name="sameadr"/> Shipping address same as billing
        </label>
        <div className='deliver-check'>
            <h2>Delivery</h2>
            <select name="country" id="country" required>
							<option value="">Country/Region</option>
							<option value="Canada">Canada</option>
							<option value="Not Canada">Not Canada</option>
						</select>
                        <div class="input_form">
            <div class="row">
              <div class="col-md-6">
                <div class="input_box_cart">
                  <input type="" placeholder="First name"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="input_box_cart">
                <input type="" placeholder="Last name"/>
                </div>
              </div>
            </div>
        </div>
        <div class="row">
              <div class="col-md-12">
                <div class="input_box_cart">
                <input type="" placeholder="Company (optional)"/>
                </div>
              </div>
           </div>
           <div class="row">
              <div class="col-md-12">
                <div class="input_box_cart">
                <input type="" placeholder="Street Address "/>
                </div>
              </div>
           </div>
           <div class="row">
              <div class="col-md-12">
                <div class="input_box_cart">
                <input type="" placeholder="Apartment, suite, unit, etc. (optional)"/>
                </div>
              </div>
           </div>
           <div class="row">
              <div class="col-md-4">
                <div class="input_box_cart">
                <input type="" placeholder="City"/>
                </div>
              </div>
              <div class="col-md-4">
                <div class="input_box_cart">
                <select name="country" id="country" required>
							<option value="">State</option>
							<option value="Canada">Canada</option>
							<option value="Not Canada">Not Canada</option>
						</select>
                </div>
              </div>
              <div class="col-md-4">
                <div class="input_box_cart">
                <input type="text"placeholder="PIN code" class="form-control" id="code" />
                </div>
              </div>
           </div>
        </div>
        <h2 className='method-ses'>Shipping method</h2>
        <div className='stateShipping-method'>
                <p>Enter your shipping address to view available shipping methods.</p>
                </div>
        </div>
        </div>
        <div class="col-md-6 input-all">
            <div className='all-data'>
        <div class="blA7b">
            <div className='total-method'>
                <img src="https://sladmin.scoliolife.com/uploads/2019/05/ScolioPosture-01-1.png"/>
            </div>
            <div className='total-num'>
                <p>2</p>
            </div>
            <div className='product-nam'>
                <p>Scoliosis Exercises Online Streaming</p>
                <div className='size-nam'>Size: M</div>
            </div>
            <div className='product-price-nam'>
                <p>$80.00 SGD</p>
            </div>
            </div>
            <div class="discount-code-nam">
                <input type="text"placeholder="Discount code" class="form-control" id="code" />
                <button type="submit" disabled="" aria-label="Apply Discount Code" class="apply"><span class="AjwsM">Apply</span></button>
                </div>
                <div className='subtotal-nam'>
                    <p>Subtotal</p>
                    <h5>$80.00 SGD</h5>
                </div>
                <div className='subtotal-nam'>
                    <p>Shipping</p>
                    <h6>Enter shipping address</h6>
                </div>
                <div className='subtotal-nam'>
                    <p>Discount</p>
                    <span className='Discount-prices'>-20.00 SGD</span>
                </div>
                <div className='subtotal-nam'>
                    <p>Tax</p>
                    <h5 className='all-price-add'>$80.00 SGD</h5>
                </div>
                <div className='subtotal-nam'>
                    <p>Total</p>
                    <h5 className='all-price-add'>$80.00 SGD</h5>
                </div>
        </div>
        </div>
        </div>
        </div>
    )
}

export default NewCheckout;