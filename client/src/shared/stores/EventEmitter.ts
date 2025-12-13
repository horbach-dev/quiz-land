type TListener<T> = (args: T) => void;

export const makeEventEmitter = <T extends string>() => {
  const emitter = {
    subscribers: [] as TListener<T>[],
    subscribe: (fn: TListener<T>) => {
      emitter.subscribers.push(fn);
      return () => {
        emitter.subscribers = emitter.subscribers.filter((sub) => sub !== fn);
      };
    },
    notify: (data: T) => emitter.subscribers.forEach((sub: TListener<T>) => sub(data)),
  };
  return emitter;
};
