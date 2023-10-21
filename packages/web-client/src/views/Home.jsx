const Component = () => {
  return (
      <>
        <div className='home-view'>
          <h1 className='headline'>Homee</h1>
        </div>
      </>
  )
};

const Route = {
  path: "/",
  element: <Component />,
};

export default Route;