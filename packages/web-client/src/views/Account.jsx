const Component = () => {
  return (
      <div className='user-account'>
        <h1 className='headline'>Account</h1>
        <div className='stats'>Stats</div>
        <div className='games'>Games</div>
      </div>
  )
};

const Route = {
  path: "/account",
  element: <Component />,
};

export default Route;