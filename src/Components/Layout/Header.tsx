import logo from '../../Images/logo192.png';
import '../../CSS/style.css';
const Header = () => {
  return (
    <div>
      <div className="banner-style py-3">
        <img src={logo} className="logo-style px-3" />
        <h1 className="heading1">Contactopedia</h1>        
      </div>
    </div>
  );
};

export default Header;
