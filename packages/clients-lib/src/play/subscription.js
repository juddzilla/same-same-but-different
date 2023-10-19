export default function() {
  const subscribers = new Set();

  return {
    subscribe: function(cb) {
      subscribers.add(cb);
    },

    unsubscribe: function(cb) {
      subscribers.delete(cb);
    },

    notify: function(message) {
      subscribers.forEach((cb) => cb(message));
    },
  };
}