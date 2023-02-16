import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';
import Loader from './Loader';
import GoodsList from './GoodsList';
import Cart from './Cart';
import BasketList from './BasketList';
import Alert from "./Alert";

const Shop = () => {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [isBasketShow, setBasketShow] = useState(false);
  const [alertText, setAlertText] = useState('');

  const addToBasket = (item) => {
    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);

    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      }
      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          }
        } else {
          return orderItem;
        }
      })
      setOrder(newOrder);
    }
    setAlertText(`${item.name} добавлен в корзину`);
  }

  const handleCheckout = () => {
    setBasketShow(!isBasketShow);
    setOrder([]);
    setAlertText(`Спасибо за покупку!`);
    
  }

  const removeFromBasket = (itemId) => {
    const newOrder = order.filter((item) => item.id !== itemId);
    setOrder(newOrder);
  }

  const changeQuantity = (itemId, operation) => {
    const newOrder = order.map((item) => {
      if (item.id === itemId) {
        let newQuantity;
        if (operation === '+') newQuantity = ++item.quantity;
        if (operation === '-') newQuantity = --item.quantity;
        return {
          ...item,
          quantity:
            operation === '-'
              ? newQuantity >= 0
                ? newQuantity
                : 0
              : newQuantity,
        }
      } else {
        return item;
      }
    })
    setOrder(newOrder);
  }

  const handleBasketShow = () => {
    setBasketShow(!isBasketShow);
  }

  const closeAlert = () => {
    setAlertText('');
  }

  useEffect(() => {
    fetch(API_URL, {
      headers: {
        Authorization: '1857368b-63ecfdb8-90d1fa10-b4c25b20',
      },
    })
      .then((response) => response.json())
      .then((data) => data.featured && setGoods(data.featured))
      .catch((err) => console.warn(err))
      .finally(() => setLoading(false));
  }, [])

  return (
    <main className="container content">
      <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
      {loading ? (
        <Loader />
      ) : (
        <GoodsList goods={goods} addToBasket={addToBasket} />
      )}
      {isBasketShow ? (
        <BasketList
          order={order}
          handleBasketShow={handleBasketShow}
          removeFromBasket={removeFromBasket}
          changeQuantity={changeQuantity}
          handleCheckout={handleCheckout}
        />
      ) : null}
      {
        alertText ? <Alert text={alertText} closeAlert={closeAlert} /> : null
      }
    </main>
  )
}

export default Shop