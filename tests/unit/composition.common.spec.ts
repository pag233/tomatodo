import { useRef, watchInjector } from '@/composition/common'

describe('useRef unit tests', () => {

  test('it should returns the same initial passed value', () => {
    const value1 = 42;
    const [state1] = useRef(value1);
    expect(state1.value).toEqual(value1);

    const value2 = { key: true };
    const [state2] = useRef(value2);
    expect(state2.value).toEqual(value2);
  })

  test('the setState function should accept either a value type parameter or a callback type parameter', () => {
    const value = 42 as number;
    const [state, setState] = useRef(value);
    setState(24);
    expect(state.value).toEqual(24);

    const value2 = 42 as number;
    const [state2, setState2] = useRef(value2);
    setState2(state => state + 1);
    expect(state2.value).toEqual(value2 + 1);

    const value3 = {
      key: 42
    };
    const [state3, setState3] = useRef(value3);
    setState3(state => ({
      key: state.key + 1
    }))
    expect(state3.value.key).toEqual(43);
  })
})

describe('watchInjector unit tests', () => {

  // let age: number;
  // let originSource: { name: string };

  // beforeEach(() => {
  //   age = 42;
  //   originSource = { name: "John" };
  // })

  // test('executor could update outer source', () => {
  // })

  // test('executor should be called n times as we update source with n times', () => {
  // })

})