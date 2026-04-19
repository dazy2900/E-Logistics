import React from 'react'
//import logo from './logo.svg'
import { usePaystackPayment } from 'react-paystack'
//import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

const config = {
  reference: new Date().getTime().toString(),
  email: cookies.get('user'),
  amount: cookies.get('price'),
  publicKey: 'pk_test_64126f61df754329ea3017aa6288110785b7cf1d',
  //pk_live_09c77e40e978d48d71865e8a5efd59bd0e089ddb
}

// you can call this function anything
const onSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference)
  alert('success')
}

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed')
}

const PaystackHookExample = ({ Config }) => {
  const initializePayment = usePaystackPayment(Config)
  return initializePayment(onSuccess, onClose)
}

export default PaystackHookExample
