import React from 'react'

export const ShoppingCart = ({ items, onCheckout }) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
      {items.length === 0
        ? (
          <p>Your cart is empty</p>
          )
        : (
          <>
            <ul className="space-y-2 mb-4">
              {items.map((item) => (
                <li key={item.name} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>x{item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Items: {totalItems}</span>
              <button
                onClick={onCheckout}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Checkout
              </button>
            </div>
          </>
          )}
    </div>
  )
}
