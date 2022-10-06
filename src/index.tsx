import App from '@/App'
import '@/config/env'
import '@/polyfill'
import ReactDOM from 'react-dom'

function Root() {
  return <App />
}

ReactDOM.render(<Root />, document.querySelector('#root'))
