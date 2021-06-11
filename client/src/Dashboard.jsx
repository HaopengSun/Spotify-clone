/* eslint-disable no-unused-vars */
import React from 'react'
import UserAuth from './UserAuth'

export default function Dashboard({code}){
  const accessToken = UserAuth(code)
  return(
    <div>{code}</div>
  )
}