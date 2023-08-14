import Nav from './Nav';
import Logo from './Logo';

const Header: React.FC = () => (
  // <header className='header w-full justify-between'>
  <header className='flex justify-between border-sky-900 border p-8'>
    <Logo />
    <Nav />
  </header>
);

export default Header;