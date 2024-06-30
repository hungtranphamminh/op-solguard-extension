import { createRoot } from 'react-dom/client'
import '@pages/popup/Popup.scss'
import refreshOnUpdate from 'virtual:reload-on-update-in-view'
import { HashRouter } from 'react-router-dom'
import Analyzer from '@src/components/AnalyzePopup/Analyzer'
//Font
refreshOnUpdate('pages/popup')

function init() {
  const appContainer = document.getElementById('app-container')
  if (!appContainer) {
    throw new Error('Can not find app-container')
  }
  const root = createRoot(appContainer)

  console.log('location is: ', window.location.href)

  root.render(
    <>
      <HashRouter>
        {/* <Popup /> */}
        <Analyzer />
        {/* <Toast autoDelete={true} /> */}
      </HashRouter>
    </>
  )
}

init()
