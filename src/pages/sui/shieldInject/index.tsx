import { createRoot } from 'react-dom/client'
import InjectedShield from './InjectedShield'

console.log('init content sciprt')

const root = document.createElement('div')
console.log('document is: ', document)
console.log('root is: ', root)
root.id = 'content'
document.body.append(root)

createRoot(root).render(<InjectedShield />)
