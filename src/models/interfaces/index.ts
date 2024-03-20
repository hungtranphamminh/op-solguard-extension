export interface Account {
  id: string
  _id?: string
  name: string
  wallet: {
    address: string
    balance: number
    chainId: number
    domain?: string
    share_b?: {
      key: string
    }
  }
}

export interface Chain {
  _id?: string
  chainId: string
  evm: boolean
  logo: string
  name: string
  rpcHttp: string
  symbol: string
  testnet: boolean
  scan?: string
}

export interface Token {
  USD?: number
  contractAddress: string
  decimals: number
  logo?: string
  name: string
  symbol: string
  tokenBalance: number
  isNative?: boolean
}
