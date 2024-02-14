import { useEffect } from "react"

export const useOnMount = (action: () => void) => {
  useEffect(() => action(), [])
}