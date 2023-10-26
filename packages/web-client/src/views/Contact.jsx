const style = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
};

const container = { maxWidth: '80ch' };

const Component = () => {
  return (
      <div>
        <h1 className='headline'>Privacy Policy</h1>
        <div className='view-content' style={style}>
          <div style={container}>
            <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLScnamev-h0Fb1CK9Uwo7UnPbZoe2twVnvTExCG4zWNS0yzJmg/viewform?embedded=true"
                width="640" height="1000" frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>
          </div>
        </div>
      </div>
  );
};

export default {
  element: <Component />,
  path: '/contact',
};

