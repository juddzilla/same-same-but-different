import svgs from './svgs';
import './svgs.css';

export default (name) => {
  const icon = !Object.hasOwn(svgs, name) ? 'warning' : name;
  const iconClassList = ['Icon', name];
  return (
      <>
        <div className={ iconClassList.join(' ') } dangerouslySetInnerHTML={{__html:svgs[icon]}}/>
      </>
  );
}