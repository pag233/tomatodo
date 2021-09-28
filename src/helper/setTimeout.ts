export default function _setTimeOut(
  fn: () => void,
  delay: number,
  commit: (clearId: number) => void,
  maxDelay = 2 ** 31 - 1,
): void {
  commit(
    delay > maxDelay ?
      window.setTimeout(() => {
        console.log('reset clear id');
        _setTimeOut(fn, delay - maxDelay, commit);
      }, maxDelay) :
      window.setTimeout(() => {
        fn()
      }, delay)
  )
}