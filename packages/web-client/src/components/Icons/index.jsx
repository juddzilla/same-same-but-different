import svgs from './svgs';

export default (name) => {
  console.log('name', name);
  const icon = !Object.hasOwn(svgs, name) ? 'warning' : name;
  return (
      <>
        <div className='Icon' dangerouslySetInnerHTML={{__html:svgs[icon]}}/>
      </>
  );
}