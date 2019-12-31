/**
 * Heavily inspired by
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * 👏
 */

import { useEffect, useRef } from 'react'

export const useInterval = (callback: () => void, delay: number | null, immediate?: boolean) => {
  const savedCallback = useRef<() => void>(callback)

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    if (immediate) {
      savedCallback.current()
    }
  }, [immediate])

  useEffect(() => {
    const tick = () => {
      savedCallback.current()
    }

    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
