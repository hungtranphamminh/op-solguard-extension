export const ApplyGiftCard = (message, sendResponse) => {
  console.log("request origin: ", message.requestOrigin)
  switch(message.requestOrigin){
    case "Amazon":{
      ApplyAmazon(message, sendResponse)
      break
    }
    case "Lazada":{
      ApplyLazada(message, sendResponse)
    }
  }
}

const ApplyAmazon = (message, sendResponse) => {
  var inputCode = document.getElementById('spc-gcpromoinput') as HTMLInputElement
  /* enter code */
  if (inputCode) {
    inputCode.value = message.data
  } else {
    console.log('No input field found')
  }

  var ApplyCode = document.querySelector(
    'input.a-button-input[type="submit"][aria-labelledby="gcApplyButtonId-announce"]'
  ) as HTMLInputElement
  /* apply code */
  if (ApplyCode) {
    ApplyCode.click()
  } else {
    console.log(
      'No input tag found'
    )
  }

  sendResponse({
    action: 'confirmApply',
  })
        
}

const ApplyLazada = (message, sendResponse) => {
  var inputCode = document.getElementById('automation-voucher-input') as HTMLInputElement
  /* enter code */
  if (inputCode) {
    inputCode.value = message.data
  } else {
    console.log('No input field found')
  }

  var ApplyCode = document.getElementById("automation-voucher-input-button") as HTMLInputElement
  /* apply code 
      -> disabled for lazada demo since automated voucher input with wrong voucher code will be disabled
  */ 
  // if (ApplyCode) {
  //   ApplyCode.click()
  // } else {
  //   console.log(
  //     'No input tag found'
  //   )
  // }

  sendResponse({
    action: 'confirmApply',
  })
        
}