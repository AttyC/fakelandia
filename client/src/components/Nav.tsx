import NavItem from './NavItem';

const Nav: React.FC = () => (
  <ul className='primary-nav inline-flex'>
    <NavItem to={'/'} text={'Home'} />
    <NavItem to={'misdemeanours/20'} text={'Misdemeanours'} />
    <NavItem to={'confess'} text={'Confess to us'} />
  </ul>
);

export default Nav;
