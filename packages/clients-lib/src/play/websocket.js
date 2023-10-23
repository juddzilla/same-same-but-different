// import StateHook from './stateHook';
// const useCustomState = StateHook([]);
// export default (url, id, onMessage) => {
//   // const [state, setState] = useCustomState([]);
//   // console.log('STATE', state);
//
//   const WS = new WebSocket(`${url}/${id}`);
//   // Connection opened
//   WS.addEventListener("open", (event) => {
//     WS.send(JSON.stringify({ game: { id }}));
//   });
//
// // Listen for messages
//   WS.addEventListener("message", onMessage);
//
//   return {
//     send: WS.send,
//   };
// };

import Subscription from './subscription';

export default class {
  constructor(props) {
    const { id, url } = props;

    this.connection = new WebSocket(`${url}/${id}`);

    this.connection.addEventListener("open", (event) => {
      // this.connection.send(JSON.stringify({ game: { id }}));
    });

// Listen for messages
    this.connection.addEventListener("message", function(event) {
      const attempt = JSON.parse(event.data);
      Subscription.notify(attempt)
    });
  }

  send(message) {
    this.connection.send(JSON.stringify(message));
  }
}