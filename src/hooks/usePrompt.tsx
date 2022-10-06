import type { History } from 'history'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom'

//ref from https://github.com/remix-run/react-router/issues/8139#issuecomment-1216812007
const usePrompt = (when: boolean = false) => {
  const [showPrompt, setShowPrompt] = useState<boolean>(false)
  const confirm = useRef<any>(null)
  const context = useRef<any>(null)
  const { navigator } = useContext(NavigationContext)
  const blockNavigator = navigator as History

  const next = useCallback(() => {
    confirm.current()
    context.current?.retry?.()
  }, [showPrompt])

  useEffect(() => {
    if (!when) return
    const unblock = blockNavigator.block((tx) => {
      setShowPrompt(true)
      context.current = tx
    })
    confirm.current = unblock
    return unblock
  }, [blockNavigator, when])

  return [showPrompt, setShowPrompt, next] as const
}

export default usePrompt
