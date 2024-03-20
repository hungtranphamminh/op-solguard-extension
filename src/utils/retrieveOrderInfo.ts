export const retrieveOrderInfo = (requestOrigin) => {
  console.log("request origin: ", requestOrigin)
  switch(requestOrigin){
    case "Amazon":{
      return retrieveAmazonOrder()
    }
    case "Lazada":{
      return retrieveLazadaOrder()
    }
  }
}

const retrieveAmazonOrder = () => {
  // Select the second div element with the data attribute 'data-a-input-name' set to 'currencyOptions'
  var divs = document.querySelectorAll('div[data-a-input-name="currencyOptions"]')
  if (divs.length > 1) {
    var targetDiv = divs[1]

    // Get the text content of a span inside a span inside a label
    var textContent = targetDiv.querySelector('label > span > span').textContent

    console.log('total: ', textContent)
    return textContent
  } else {
    console.log('order price not found')
  }
}

const retrieveLazadaOrder = () => {
  // Select the second div element with the data attribute 'data-a-input-name' set to 'currencyOptions'
  var divs = document.getElementsByClassName('checkout-order-total-fee')
  if (divs.length >= 1) {
   
    // Get the text content of a span inside a span inside a label
    var textContent = divs[0].textContent

    console.log('total: ', textContent)
    return textContent
  } else {
    console.log('order price not found')
  }
}