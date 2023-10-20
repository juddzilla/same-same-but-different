// export default function() {
//   const subscribers = new Set();
//
//   return {
//     subscribe: function(cb) {
//       subscribers.add(cb);
//     },
//
//     unsubscribe: function(cb) {
//       subscribers.delete(cb);
//     },
//
//     notify: function(message) {
//       subscribers.forEach((cb) => cb(message));
//     },
//   };
// }

class Subscription {
  constructor() {
    this.subscriptions = new Set();
  }

  subscribe(cb) {
    this.subscriptions.add(cb);
  }

  unsubscribe(cb) {
    this.subscriptions.delete(cb);
  }

  notify(message) {
    this.subscriptions.forEach(cb => cb(message));
  }
}

export default new Subscription();