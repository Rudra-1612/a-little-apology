import { useEffect, useRef } from 'react'

export default function useDialogA11y(open, onClose, dialogRef, initialFocusRef) {
  const closeRef = useRef(onClose)
  closeRef.current = onClose
  const initialRef = useRef(initialFocusRef)
  initialRef.current = initialFocusRef

  useEffect(() => {
    if (!open) return undefined

    const previouslyFocused = document.activeElement
    const focusTimer = window.setTimeout(() => {
      initialRef.current?.current?.focus?.()
    }, 40)

    const getFocusable = () => {
      if (!dialogRef.current) return []
      return Array.from(
        dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null)
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeRef.current?.()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = getFocusable()
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus()
      }
    }
  }, [open, dialogRef])
}
