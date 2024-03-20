/**
*   @description  create popup window with custom options
*/
async function show(url: string, width:number, height:number) {
    const w = await chrome.windows.create({
        width: width,
        height: height,
        type: 'popup',
        url: url, 
        top: 0,
        left: 1000,
    })
}
  
/**  
*   @description Popup Opener to open different approve / notification
*   pages from Provider's requests
*
*   @param url string - url of the request screen
*   @param params Record<string,any> - parameters to pass in the page
*/
export function createPopupWindow(url: string, width:number, height:number, params?: Record<string, any>) {
    const queryStr = new URLSearchParams(params).toString()
    show(chrome.runtime.getURL('src/pages/index.html#' + url) + (queryStr ? '?' + queryStr : ''), width, height)
}
