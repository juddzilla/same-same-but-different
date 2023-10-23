import { useEffect, useState } from 'react';
import createSubscribable from './subscription';

export default (initialValue) => {
  const subscribers = createSubscribable();

  return () => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => subscribers.subscribe(setValue), []);

    useEffect(() => {
      return () => {
        subscribers.unsubscribe(setValue);
      };
    }, []);

    return [
      value,
      (v) => {
        subscribers.notify(v);
      },
    ];
  };
}
