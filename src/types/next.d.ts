/* eslint-disable no-unused-vars */
import { NextPage } from 'next/types'
import React from 'react'

type CustomPage = NextPage & {
  title: string
  fullPage: boolean
}

type MenuLinkType = {
  label: string
  link: string
  icon: React.ReactNode
}

type MarketTokenType = {
  label: string
  iconPath: string
  price: number
  priceCurrency: '$'
}

type TokenInfoType = {
  label: string
  value: number
  type: '$' | '%'
  colorMode?: 'default' | 'redgreen' | 'blue'
}

type TabType = {
  label: string
  action: () => void
  icon?: React.ReactNode
}

type OptionType = {
  strike: number
  breakEven: number
  toBreakEven: number
  impliedVolatility: number
  price: number
  isSell: boolean
  isCall: boolean
  date: DateTime
}

type PositionType = {
  token: MarketTokenType
  operation: 'Call' | 'Put'
  numContracts: number
  strike: number
  expDate: Date
  value: number
  costPerOption: number
  price: number
  profit: number
  status: 'Open' | 'Closed'
  impliedVolatility: number
  delta: number
  vega: number
  gamma: number
  theta: number
  openInterest: number
  openDate: Date
}

type TokenIconProps = {
  size: number
}