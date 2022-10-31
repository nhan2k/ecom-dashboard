const setItem = (key: string, value: string): void => {
  return window.localStorage.setItem(key, JSON.stringify(value))
}
const getItem = (key: string): string | null => {
  return window.localStorage.getItem(key)
}
const removeItem = (key: string) => {
  return window.localStorage.removeItem(key)
}
const clear = (): void => {
  return window.localStorage.clear()
}
const key = (index: number): string | null => {
  return window.localStorage.key(index)
}

export { setItem, getItem, removeItem, clear, key }
