import { Link } from 'react-router-dom';
import './NavLogo.scss';

const NavLogo = ({ logo }) => {
  const { title, titleHTML, src } = logo;
  return (
    <Link to='/' className='logo'>
      <img src={src} alt='logo' />
      <div>{title || titleHTML}</div>
    </Link>
  );
};

export default NavLogo;
