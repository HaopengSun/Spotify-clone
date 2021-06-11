/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function UserAuth(code){
  const [accessToken, setSccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  useEffect(() => {
    axios.post('http://localhost:3001/login', {
      code 
    }).then(res => {
      console.log(res.data);
    }).catch(() => {
      console.log('error')
    })
  }, [code])
}