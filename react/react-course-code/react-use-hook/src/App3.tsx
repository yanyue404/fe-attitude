// import {useLifecycles} from 'react-use';
import useLifecycles from './useLifecycles'

const App = () => {
  useLifecycles(
    () => console.log('MOUNTED'),
    () => console.log('UNMOUNTED')
  )

  return null
}

export default App
