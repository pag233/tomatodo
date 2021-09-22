export default function _setTimeOut(fn: () => void, delay: number, commitClearId: (clearId: number) => void, maxDelay = 2 ** 31 - 1): void {
  commitClearId(
    delay > maxDelay ?
      window.setTimeout(() => {
        // console.log('reset clear id');
        _setTimeOut(fn, delay - maxDelay, commitClearId);
      }, maxDelay) :
      window.setTimeout(() => {
        fn()
      }, delay)
  )
}