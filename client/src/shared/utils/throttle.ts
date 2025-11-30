export const throttle = (fn, delay = 500) => {
  let canCall = true

  return (...args) => {
    if (canCall) {
      fn(...args)
      canCall = false

      setTimeout(() => {
        canCall = true
        fn(...args)
      }, delay)
    }
  }
}
