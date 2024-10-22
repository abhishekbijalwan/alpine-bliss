import React, { useState } from 'react'
import store from '../../store'

import './index.css'

const basePrice = 47.4

const CheckoutPage: React.FC = () => {
  const userEmail = store((state) => state.userState.email)
  const userName = store((state) => state.userState.name)
  const discount = store((state) => state.discountState.discountPercent)

  const discountedPrice = (basePrice * discount) / 100
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Mock form submission logic
    console.log('Form submitted', { name, email, creditCard })
  }

  return (
    <div className="wrapper">
      <div className="discount">
        Personalised Discount: <span className='discount-percent'>{discount}%</span>
      </div>
      <div className="main-c">
        <img
          className="headset"
          src="https://alpinebliss.com/cdn/shop/files/AB_12-pack_energy_v2_c6dd30bc-d5a8-4a71-8629-774608e3ec89_1240x1240.jpg?v=1724504095"
          alt="drink pack"
        />
        <div id="cart-text">
          <button className="free-shipping">Free shipping</button>
          <h2>Alpine Bliss™ Cognitive Energy Booster</h2>
          <h3>${basePrice} </h3>
          <h1>
            ${discountedPrice} - {discountedPrice / 12}/can
          </h1>
          <h4>The offer is valid until Nov 3, or as long as stock lasts!</h4>
          <button className="add-to-cart">Buy Now</button>
          <h3 className="stock">
            <i className="fa-solid fa-circle"></i> 50+ pcs. in stock.
          </h3>
          <div id="buttons">
            <button className="add-to-cart-2">
              <i className="fa-solid fa-cart-shopping"></i> Add to Cart
            </button>
            <button className="add-to-wishlist">
              <i className="fa-solid fa-heart"></i> Add to wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
