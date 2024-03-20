export const IsMaliciousWindow = () => {
  if(window.postMessage.toString()!=='function postMessage() { [native code] }')return true
  else return false
}