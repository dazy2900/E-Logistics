import './Register.scss'
import logo from '../../images/travelbro-blue-nav.png'
import { BsArrowRightShort } from 'react-icons/bs'
import { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import Mynavbar from '../Mynavbar/Mynavbar'
import Signin from '../../images/signin.png'

const Signup = () => {
  const [inputs, setInputs] = useState({})
  const [post, setPost] = useState({})
  const [cookies, setCookie] = useCookies(['user'])

  const baseURL = 'http://localhost/Travelbro/api.php'

  const change_handler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }
  const submit_handler = (e) => {
    e.preventDefault()
    console.log(inputs)

    const datas = {
      request: 'signin',
      data: inputs,
    }

    const new_data = JSON.stringify(datas)
    //const new_data2 = JSON.parse(new_data)

    axios.post(baseURL, new_data).then((response) => {
      setPost(response.data)
      console.log(response.data)
      //alert(post)
      const status = response.data.status
      console.log(status)
      if (status == 'logged_in') {
        const type = response.data.user_info[0].user_status
        const UserInfo = response.data.user_info[0]
        const UserDp = UserInfo.profile_picture
        console.log(type)
        console.log(UserInfo)
        window.location.href = '/dashboard'
        setCookie('user', inputs.email, { path: '/' })
        setCookie('page_to_load', type, { path: '/' })
        setCookie('status', type, { path: '/' })
        setCookie('UserInfo', UserInfo, { path: '/' })
        setCookie('UserDp', UserDp, { path: '/' })
        //alert(cookies.user)
      } else if (status == 'admin_logged_in') {
        window.location.href = '/admin'
      } else {
        // alert('not yet')
      }
      //alert(JSON.parse(new_data))
    })

    if (post == 'true') {
      // alert('redirect to dashboard')
    }
  }

  const componentClicked = () => {
    console.log('clicked')
  }

  return (
    <>
      <Mynavbar />
      <div className="my-container">
        <div className="row">
          <div className="col-sm-5">
            <div className="signup-image-div ml-2 center">
              <img src={Signin} className="signup-image" />
            </div>
          </div>
          <div className="col-sm-1"></div>
          <div className="col-sm-5 s-container">
            <div className="signin-container  ">
              <div className="logo-container center ">
                <img src={logo} alt="Travelbro" className="logo-img" />
              </div>

              <div className="header-container">
                <h1 className="signup-title">Sign into Travelbro</h1>
              </div>

              <div className="form-container ">
                <form onSubmit={submit_handler}>
                  <div className="form-group email-input-div center mb-4">
                    <input
                      type="email"
                      className=" email-input"
                      name="email"
                      aria-describedby="emailHelp"
                      placeholder=" Enter email"
                      value={inputs.email}
                      onChange={change_handler}
                      required
                    />
                  </div>
                  <div class="form-group pass-input-div center mb-5">
                    <input
                      type="password"
                      className=" pass-input"
                      name="password"
                      placeholder=" Password"
                      value={inputs.password}
                      onChange={change_handler}
                      required
                    />
                  </div>
                  <div className="button-div center mb-4">
                    <input
                      type="submit"
                      className="btn button "
                      value="Submit"
                    />
                  </div>
                </form>

                <div className="signin-link center">
                  Don't have an account?{' '}
                  <span
                    className="link text-primary"
                    onClick={() => {
                      window.location.href = '/signup'
                    }}
                  >
                    Sign up
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
