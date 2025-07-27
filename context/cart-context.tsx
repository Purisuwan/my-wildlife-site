"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity">; quantity?: number }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const quantityToAdd = action.quantity || 1
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + quantityToAdd } : item,
        )
        return {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }
      }
      const newItems = [...state.items, { ...action.payload, quantity: quantityToAdd }]
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }
    }
    case "REMOVE_ITEM": {
      const filteredItems = state.items.filter((item) => item.id !== action.payload)
      return {
        items: filteredItems,
        total: filteredItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }
    }
    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        const filteredItems = state.items.filter((item) => item.id !== action.payload.id)
        return {
          items: filteredItems,
          total: filteredItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }
      }
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
      )
      return {
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }
    }
    case "CLEAR_CART":
      return { items: [], total: 0 }
    default:
      return state
  }
}

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })

  useEffect(() => {
    const savedCart = localStorage.getItem("wildlife-cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        parsedCart.items.forEach((item: CartItem) => {
          dispatch({ type: "ADD_ITEM", payload: item })
        })
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("wildlife-cart", JSON.stringify(state))
  }, [state])

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
