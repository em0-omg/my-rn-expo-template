import { useCounterStore } from '@/stores/counter-store';

describe('counter store', () => {
  beforeEach(() => {
    useCounterStore.getState().reset();
  });

  it('starts at zero', () => {
    expect(useCounterStore.getState().count).toBe(0);
  });

  it('increments and decrements', () => {
    const { increment, decrement } = useCounterStore.getState();

    increment();
    increment();
    decrement();

    expect(useCounterStore.getState().count).toBe(1);
  });

  it('sets and adds arbitrary amounts', () => {
    const { setCount, incrementByAmount } = useCounterStore.getState();

    setCount(10);
    incrementByAmount(5);

    expect(useCounterStore.getState().count).toBe(15);
  });

  it('resets back to the initial state', () => {
    useCounterStore.getState().setCount(42);

    useCounterStore.getState().reset();

    expect(useCounterStore.getState().count).toBe(0);
  });
});
