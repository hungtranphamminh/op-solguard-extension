const MOCKUP_ORDER_TOTAL_SCRIPT = ` var targetDiv = divs[1]

// Get the text content of a span inside a span inside a label
var textContent = targetDiv.querySelector('label > span > span').textContent

console.log('total from eval executing: ', textContent)
return textContent
`

// eval(MOCKUP_ORDER_TOTAL_SCRIPT)