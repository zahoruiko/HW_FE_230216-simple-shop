import React from 'react'
import BasketItem from './BasketItem'

const BasketList = (props) => {
  const {
      removeFromBasket = Function.prototype,
      handleBasketShow = Function.prototype,
      changeQuantity = Function.prototype,
      handleCheckout = Function.prototype,
      order = [],
  } = props

  const totalPrice = order.reduce((sum, item) => {
      return sum + item.price * item.quantity;
  }, 0);

  return (
    <ul className="collection basket-list">
      <li className="collection-item active deep-purple">Cart</li>
      {order.length ? (
        order.map((orderItem) => (
          <BasketItem
              key={orderItem.id}
              removeFromBasket={removeFromBasket}
              changeQuantity={changeQuantity}
              {...orderItem}
          />
        ))
      ) : (
        <li className="collection-item">The cart is empty</li>
      )}
      <li className="collection-item deep-purple active">Total cost: ${totalPrice}
      <button onClick={handleCheckout}>Make a purchase!</button></li>
      <i className="material-icons basket-close" onClick={handleBasketShow}>
        close
      </i>
    </ul>
  )
}

export default BasketList
