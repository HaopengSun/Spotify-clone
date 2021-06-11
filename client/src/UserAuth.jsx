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
      setSccessToken(res.data.access_token);
      setRefreshToken(res.data.refresh_token);
      setExpiresIn(res.data.expires_in);

      // remove the token in the url
      window.history.pushState({}, null, '/')
    }).catch(() => {
      // if the token is expired, the home page will be shown
      window.location = '/';
    })
  }, [code])

  // auto refresh because the token will expire in a hour
  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    axios.post('http://localhost:3001/refresh', {
      refreshToken 
    }).then(res => {
      setRefreshToken(res.data.refresh_token);
      setExpiresIn(res.data.expires_in);
    }).catch(() => {
      // if the token is expired, the home page will be shown
      window.location = '/';
    })
  }, [refreshToken, expiresIn])

  return accessToken;
}