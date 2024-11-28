import { useRef } from 'react'
import useHover from './useHover'

export default () => {
  const ref = useRef<HTMLDivElement>(null)
  const isHovering = useHover(ref, {
    onEnter: () => {
      console.log('enter')
    },
    onLeave: () => {
      console.log('leave')
    }
  })
  return <div ref={ref}>{isHovering ? 'hover' : 'leaveHover'}</div>
}
