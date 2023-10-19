export default ({ attempts, game, score }) => {
  console.log('game', game);
  return (
      <div>
        <div>Started: { game.startedAt }</div>
        <div>Completed: { game.completedAt }</div>
        <div>Score</div>
        <div>You: { score.mine }</div>
        <div>Them: { score.theirs }</div>
      </div>
  )
}