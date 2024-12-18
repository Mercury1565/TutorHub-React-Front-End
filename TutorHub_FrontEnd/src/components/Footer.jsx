import '../styles/Footer/footer.css';

import twitterIcon from '../assets/header_assets/Symbol-1.png';
import whatsappIcon from '../assets/header_assets/Symbol-2.png';
import linkedinIcon from '../assets/header_assets/Symbol-3.png';
import youtubeIcon from '../assets/header_assets/Symbol-4.png';
import facebookIcon from '../assets/header_assets/Symbol-5.png';

import logo_white from "../assets/footer_assets/Logo-white.png";
import a2sv_logo from "../assets/footer_assets/a2sv_logo.png";
import separator from "../assets/footer_assets/separator.png";

function Footer(){
  return (
    <footer className="footer">
      <div className="footer-section">
        <div className="footer-column">
          <img className="nav-logo" src={logo_white} alt="Logo" />
          <img className="a2sv-logo" src={a2sv_logo} alt="a2sv_Logo" />
          <p className="footer_description" style={{color:"#d7a558"}}>
            Internal Hackathon, 2024
          </p>
        </div>
       
        <div className="footer-column">
          <h3>Our Team</h3>
          <img src={separator} alt='?'/>
          <p className='name-p'>Eba Adisu</p>
          <p className='name-p'>Fedasa Yilmachew</p>
          <p className='name-p'>Hermon Getachew</p>
          <p className='name-p'>Rabuma Milisha</p>
          <p className='name-p'>Yohanes Solomon</p>
        </div>

        <div className="footer-column">
          <h3>Get In Touch</h3>
          <img src={separator} alt='?'/>
          <div className="footer-social-icons">
            <a href="#"><img src={facebookIcon} alt="Facebook" className="header-icon" /></a>
            <a href="#"><img src={twitterIcon} alt="Twitter" className="header-icon" /></a>
            <a href="#"><img src={whatsappIcon} alt="WhatsApp" className="header-icon" /></a>
            <a href="#"><img src={linkedinIcon} alt="LinkedIn" className="header-icon" /></a>
            <a href="#"><img src={youtubeIcon} alt="YouTube" className="header-icon" /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className='footer_left'>
          <p>©2024 TutorHub All rights reserved.</p>
        </div>

        <div className='footer_right'>
          <p> <a href="#" className="footer-link">Term of Use</a></p>
          <p>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</p>
          <p> <a href="#" className="footer-link">Privacy Policy</a> </p>
        </div>
      </div>
    </footer>
  );  
};;

export default Footer;
