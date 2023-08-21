import './About.scss'
import about from '../../images/about.png'
import title from '../../images/travelbro-blue-title.png'
import { RiWechatLine, RiCarLine } from 'react-icons/ri'
import { RiSecurePaymentFill } from 'react-icons/ri'
import { FaCarSide } from 'react-icons/fa'
import { MdOutlinePersonOutline } from 'react-icons/md'
import { BiCar } from 'react-icons/bi'
import { BsLightning } from 'react-icons/bs'
import Footer from '../Footer/Footer'
import Mynavbar from '../Mynavbar/Mynavbar'

import driver from '../../images/driver.jpg'
import { useState } from 'react'
//import { Alert } from 'react-bootstrap'
const About = () => {
  const [selected, setSelected] = useState(false)

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(false)
    }

    setSelected(i)
  }
  return (
    <>
      <Mynavbar />
      <div className="my-container ">
        <div className="row about-banner  pt-2 pb-5 ">
          <div className="col-sm-6 mt-5 ">
            <div className="about-title center  pt-5 mb-5">
              <div className="about-image center ">
                <img src={title} className="image1" alt="Travelbro" />
              </div>

              <span className="sub-title">
                Let's take you through the whole travel process
              </span>
            </div>
          </div>
          <div className="col-sm-6 mt-5 mb-5">
            <img src={about} className="image" />
          </div>
        </div>

        <div className="info-section">
          <div className="row container center">
            <div className="col-sm-4">
              <div className="info-icon">
                <RiWechatLine size={60} color="#6dd5fa" />
              </div>
              <div className="info-title">At your service 24/7 </div>
              <div className="info-text">
                Our team is at your disposal to answer any questions by email or
                social media. You can also have a live chat directly with
                experienced members.
              </div>
            </div>
            <div className="col-sm-4 ">
              <div className="info-icon">
                <FaCarSide size={50} color="#6dd5fa" />
              </div>
              <div className="info-title">Proximity makes it easier </div>
              <div className="info-text">
                There is always a ride close to you. Now you can find the
                closest ride among the largest carpool network ever with a
                simple filter.
              </div>
            </div>
            <div className="col-sm-4">
              <div className="info-icon">
                <RiSecurePaymentFill size={45} color="#6dd5fa" />
              </div>
              <div className="info-title">100% secure information </div>
              <div className="info-text ">
                Our team is dedicated to the protection of your data, which is
                always 100% confidential thanks to monitoring tools, secure
                navigation and encrypted data.
              </div>
            </div>
          </div>
        </div>

        <div className="scam-section">
          <div className="scam-header container">
            <h1 className="container">What you can do to avoid a scam</h1>
          </div>
          <div className="row container center mt-5">
            <div className="col-sm-4">
              <div className="scam-title">
                Never visit links sent by drivers
              </div>
              <div className="scam-text">
                Some fake drivers could try to make you pay outside our app by
                sending a link, a phone number or an email address.
              </div>
            </div>
            <div className="col-sm-4 ">
              <div className="scam-title">
                Be aware of weird behavior and requests
              </div>
              <div className="scam-text">
                Experienced drivers know they should not ask for money outside
                the platform. So if someone asks you to do so, politely decline.
              </div>
            </div>
            <div className="col-sm-4">
              <div className="scam-title">
                Only pay for your ride on our app{' '}
              </div>
              <div className="scam-text ">
                Even if the website sent by fake drivers looks like BlaBlaCar’s,
                do not transfer money outside our app.
              </div>
            </div>
          </div>
          <div className="row container center ">
            <div className="col-sm-4">
              <div className="scam-title">
                If the driver sends you a link to pay for your ride
              </div>
              <div className="scam-text">
                You can respond: “I’m uncomfortable using the link you sent, I
                will follow BlaBlaCar’s recommendation and pay on their app.”
              </div>
            </div>
            <div className="col-sm-4 ">
              <div className="scam-title">
                If the driver insists on getting paid in another way
              </div>
              <div className="scam-text">
                You can respond: “Don't worry, BlaBlaCar’s application is
                secure.”
              </div>
            </div>
            <div className="col-sm-4">
              <div className="scam-title">
                If the driver asks you for additional charges
              </div>
              <div className="scam-text ">
                You can respond: “I have already paid for the ride on
                BlaBlaCar's app.”
              </div>
            </div>
          </div>
        </div>

        <div className="driver-section">
          <div className="row container center mt-3 mb-3">
            <div className="col-sm-6 img-container">
              <div className="img-div center">
                <img src={driver} className="driver-img" />
              </div>
            </div>

            <div className="col-sm-6 text-container">
              <div className="driver-textarea center">
                <div className="row container center">
                  <div className="step-row center row">
                    <div className="driver-icon col-2">
                      <MdOutlinePersonOutline size={50} color="#8a8888" />
                    </div>
                    <div className="texts col-10">
                      <div className="driver-title">
                        Create a Travelbro account
                      </div>
                      <div className="driver-text">
                        Add your profile picture, a few words about you and your
                        phone number to increase trust between members.
                      </div>
                    </div>
                  </div>
                  <div className="step-row center row">
                    <div className="driver-icon col-2">
                      <BiCar size={50} color="#8a8888" />
                    </div>
                    <div className="texts col-10">
                      <div className="driver-title">Publish your ride</div>
                      <div className="driver-text">
                        Indicate departure and arrival points, the date of the
                        ride and check our recommended price to increase your
                        chances of getting your first passengers and ratings.
                      </div>
                    </div>
                  </div>
                  <div className="step-row center row">
                    <div className="driver-icon col-2">
                      <BsLightning size={50} color="#8a8888" />
                    </div>
                    <div className="texts col-10">
                      <div className="driver-title">
                        Accept booking requests
                      </div>
                      <div className="driver-text">
                        Review passenger profiles and accept their requests to
                        ride with you. That’s how easy it is to start saving on
                        travel costs!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="faq-section">
          <div className="faq-header container">
            <h1 className="container">Frequently Asked Questions</h1>
          </div>
          <div className="row container center mt-5">
            <div
              className={
                selected === 1 ? 'col-sm-4 section open' : 'col-sm-4 section'
              }
              onClick={() => toggle(1)}
            >
              <div className="faq-title">How do I book a carpool ride?</div>
              <div className={selected === 1 ? 'faq-text show' : 'faq-text'}>
                You can book a ride on our website. Simply search for your
                destination, choose the date you want to travel and pick the
                trip that suits you best! Some rides can be booked instantly,
                while other rides require manual approval from the driver.
                Either way, booking a carpool ride is fast, simple and easy.
              </div>
            </div>
            <div
              className={
                selected === 2 ? 'col-sm-4 section open' : 'col-sm-4 section'
              }
              onClick={() => toggle(2)}
            >
              <div className="faq-title">How do I publish a ride?</div>
              <div className={selected === 2 ? 'faq-text show' : 'faq-text'}>
                Offering a carpool ride on BlaBlaCar is easy. To publish your
                ride, use our website. Indicate your departure and arrival
                points, the date and time of your departure, how many passengers
                you can take and the price per seat. You’ll also need to choose
                how you want to accept bookings (either automatically or
                manually), and you have the option of adding any important
                details you think your passengers should know about. Then tap
                ‘Publish ride’ and you’re done!
              </div>
            </div>
            <div
              className={
                selected === 3 ? 'col-sm-4 section open' : 'col-sm-4 section'
              }
              onClick={() => toggle(3)}
            >
              <div className="faq-title">How do I cancel my ride?</div>
              <div className={selected === 3 ? 'faq-text show' : 'faq-text'}>
                If you have a change of plans, you can always cancel your ride
                from the ‘Your rides’ section of our app. The sooner you cancel,
                the better. That way the driver has time to accept new
                passengers. The amount of your refund will depend on how far in
                advance you cancel. If you cancel more than 24 hours before
                departure, for example, you’ll receive a full refund, excluding
                the service fee.
              </div>
            </div>
          </div>
          <div className="row container center ">
            <div
              className={
                selected === 4 ? 'col-sm-4 section open' : 'col-sm-4 section'
              }
              onClick={() => toggle(4)}
            >
              <div className="faq-title">
                How do I cancel a ride as a driver of a ride?
              </div>

              <div className={selected === 4 ? 'faq-text show' : 'faq-text'}>
                It only takes a minute to cancel a listed ride. However, if a
                driver cannot fulfill a ride that has been already booked, it is
                their responsibility to cancel in a timely manner to allow the
                passenger time to adjust their plans. Before cancelling we
                advise drivers to let passengers know by message that they
                cannot travel anymore. Cancellation penalties Drivers won’t be
                penalised for cancelling, but when drivers cancel regularly
                and/or at the last minute, we can suspend them from offering
                rides to keep Travelbro reliable.
              </div>
            </div>
            <div
              className={
                selected === 5 ? 'col-sm-4 section open' : 'col-sm-4 section'
              }
              onClick={() => toggle(5)}
            >
              <div className="faq-title">When do I get my money?</div>
              <div className={selected === 5 ? 'faq-text show' : 'faq-text'}>
                We send your money 48 hours after the ride if you travelled as
                planned. You’ll get your money 1 to 5 weekdays (not counting
                weekends and holidays) after we send it. If you don’t see any
                money in Awaiting transfers, it’s because we already sent it.
                You can check out what we’ve sent in your Transfer history.
              </div>
            </div>
            <div
              className={
                selected === 6 ? 'col-sm-4 section open' : 'col-sm-4 section'
              }
              onClick={() => toggle(6)}
            >
              <div className="faq-title">
                What should I do if there’s an error with my ride?
              </div>
              <div className={selected === 6 ? 'faq-text show' : 'faq-text'}>
                You should edit your ride as soon as you spot the error. If you
                can’t edit your ride because passengers have already booked,
                contact them explaining the mistake. If the changes don’t suit
                them, you should cancel your ride and publish a new one.
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default About
