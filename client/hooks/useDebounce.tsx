import { useEffect, useState } from 'react'

const useDebounce = (value: string, delay: number = 500) => {
  const [debouncedValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(id)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce

//Code from tutorial on debouncing at https://www.youtube.com/watch?v=MHm-2YmWEek
