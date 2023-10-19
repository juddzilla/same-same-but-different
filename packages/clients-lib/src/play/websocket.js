// import StateHook from './stateHook';
// const useCustomState = StateHook([]);
export default (url, id, [attempts, updateAttempts]) => {
  // const [state, setState] = useCustomState([]);
  console.log('STATE', attempts);

  const WS = new WebSocket(`${url}/${id}`);
  // Connection opened
  WS.addEventListener("open", (event) => {
    WS.send(JSON.stringify({ game: { id }}));
  });

// Listen for messages
  WS.addEventListener("message", (event) => {
    const attempt = JSON.parse(event.data);
    const s = attempts;
    attempts.push(attempt)
    updateAttempts(attempts);
    console.log("Message from server ", attempt);
  });

  return {
    send: WS.send,
  };
};