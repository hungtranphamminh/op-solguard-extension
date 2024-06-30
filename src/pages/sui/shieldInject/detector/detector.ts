export const IsMaliciousWindow = () => {
  try {
    if (window.postMessage.toString() !== 'function postMessage() { [native code] }') return true
    else if (chrome.runtime.connect.toString() !== 'function connect() { [native code] }') return true
    else if (chrome.runtime.sendMessage.toString() !== 'function sendMessage() { [native code] }') return true
    else if (window.alert.toString() !== 'function alert() { [native code] }') return true
    else if (toString.toString() !== 'function toString() { [native code] }') return true
    else if (Object.toString() !== 'function Object() { [native code] }') return true
    else return false
  }
  catch (e) {
    return true
  }
}