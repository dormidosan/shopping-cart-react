import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext(undefined)

export function CartProvider ({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.uuid === item.uuid)
      if (existingItem) {
        return prevCart.map((i) =>
          i.uuid === item.uuid
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      } else {
        return [...prevCart, item]
      }
    })
  }

  const removeFromCart = (itemUUID) => {
    setCart((prevCart) => prevCart.filter((item) => item.uuid !== itemUUID))
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart () {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
