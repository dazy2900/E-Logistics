import './Footer.scss'
import Logo from '../../images/travelbro-blue-nav.png'
import { Link } from 'react-router-dom'
import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialTwitter,
} from 'react-icons/ti'
import { FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="footer-container pt-5">
      <div className="row container center pt-5 pb-5">
        <div className="col-sm-4 ">
          <div className="register-links  ">
            <div className="img-div top mb-2">
              <img src={Logo} className="footer-logo" alt="Travelbro" />
            </div>

            <div className="signin mb-2">
              <Link to="/signin">Sign In</Link>
            </div>
            <div className="signin mb-2">
              <Link to="/publish">Publish a Ride</Link>
            </div>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="text-links  ">
            <div className="About top mb-4">About</div>
            <div className="how mb-2">
              <Link to="/signin">How It Works</Link>
            </div>
            <div className="TnC mb-2">
              <Link to="/signin">Terms and Conditions</Link>
            </div>
          </div>
        </div>

        <div className="col-sm-4 mb-5">
          <div className="contact-links  ">
            <div className="top contact mb-4">Contact us</div>
            <div className="tel mb-2">+2348109876543</div>
            <div className="email mb-5">support@travelbro.com</div>
            <div className="social row">
              <div className="social-icon col-3">
                <TiSocialFacebook size={30} color="#4F52FF" />
              </div>
              <div className="social-icon col-3">
                <TiSocialInstagram size={30} color="#4F52FF" />
              </div>
              <div className="social-icon col-3">
                <TiSocialTwitter size={30} color="#4F52FF" />
              </div>
              <div className="social-icon col-3">
                <FaWhatsapp size={30} color="#4F52FF" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
