import { Link } from 'react-router-dom'
import Farlab from '../assets/favicon96.png'
import { useRef, useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
// import { useToggle } from '../hooks/useToggle'

const navbarlinks = [
  { id: 1, tittle: 'Home', link: '/' },
  { id: 2, tittle: 'About', link: '/about' },
  { id: 3, tittle: 'Catalog', link: '/catalog' },
  { id: 4, tittle: 'Contact', link: '/contact' }
]

// const sociallinks = [
//   { id: 1, tittle: 'Fac', link: 'https://www.facebook.com' },
//   { id: 2, tittle: 'Twi', link: 'https://www.twitter.com' },
//   { id: 3, tittle: 'Ins', link: 'https://www.instagram.com' },
//   { id: 4, tittle: 'Lin', link: 'https://www.linkedin.com' }
// ]

const sociallinks = []

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const { cart } = useCart()
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const cartRef = useRef(null)

  const handleToggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="fixed top-0 bg-blue-800 w-full bg-opacity-50 backdrop-blur-md z-50">
      <div className="flex justify-between sm:px-12 sm:py-4 items-center px-4 py-3">
        {/* Logo */}
        <div>
          <img src={Farlab} alt="" />
        </div>
        {/* Hamburger */}
        <button className="md:hidden text-blue" onClick={handleToggleMenu}>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen
              ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
                )
              : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
                )}
          </svg>
        </button>

        {/* Nav desktop */}
        <div className="hidden md:block">
          <ul className="flex sm:space-x-8 space-x-4">
            {navbarlinks.map((element) => (
              <li key={element.id}>
                <Link
                  className="text-blue sm:text-lg text-sm hover:text-sky-300
                  transition-tranform hover:scale-110 tranform inline-block duration-300"
                  to={element.link}
                >
                  {element.tittle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:block bg-red-600">
          <ul className="flex space-x-1">
            {sociallinks.map((element) => (
              <li key={element.id}>
                <a href={element.link}>{element.tittle}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative" ref={cartRef}>
          <button
            onClick={handleToggleCart}
            className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
          >
            Cart: {totalItems}
          </button>
          {isCartOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-10">
              <div className="p-4">
                <h3 className="font-semibold mb-2">Cart Items</h3>
                {cart.length === 0
                  ? (
                    <p>Your cart is empty</p>
                    )
                  : (
                    <>
                      <ul className="mb-4">
                        {cart.map((item, index) => (
                          <li key={index} className="flex justify-between py-1">
                            <span>{item.nombre}</span>
                            <span>x{item.quantity}</span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        to="/checkout"
                        onClick={() => setIsCartOpen(!isCartOpen)}
                        className="block w-full text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                      >
                        Go to Checkout
                      </Link>
                    </>
                    )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Nav mobile */}
      <div
        className={`md:hidden absolute w-full bg-blue-950 transition-all duration-200 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <ul className="flex flex-col px-4 py-2 ">
          {navbarlinks.map((element) => (
            <li key={element.id} className="py-2 text-center">
              <a
                className="text-white hover:text-sky-300"
                href={element.link}
                onClick={() => setIsOpen(false)}
              >
                {element.tittle}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
