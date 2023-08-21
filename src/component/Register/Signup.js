import './Register.scss'
import logo from '../../images/travelbro-blue-nav.png'
//import { TiSocialFacebook } from 'react-icons/ti'
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import Mynavbar from '../Mynavbar/Mynavbar'
import Signin from '../../images/signup.png'

const Signup = () => {
  const [inputs, setInputs] = useState('')
  const [post, setPost] = useState('')
  const [file, setFile] = useState('')
  const [cookies, setCookie] = useCookies(['user'])

  const baseURL = 'http://localhost/Travelbro/UploadApi.php'
  useEffect(() => {}, [])

  const change_handler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }
  const file_handler = (e) => {
    const fileImg = e.target.files[0]
    setFile(fileImg)
  }
  const submit_handler = (e) => {
    e.preventDefault()
    //console.log(file)
    //const filed = e.target['image'].files[0]
    console.log(inputs)
    console.log(file.name)
    const formData = new FormData()
    const datas = {
      request: 'signup',
      data: inputs,
    }
    const new_data = JSON.stringify(datas)
    formData.append('image', file, file.name)
    formData.append('signup', inputs)
    for (var key in inputs) {
      formData.append(key, inputs[key])
    }
    //console.log(formData.get('image').name)
    //console.log(file.name)

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }
    const UserDp = 'uploads/' + file.name
    axios.post(baseURL, formData).then((response1) => {
      console.log(response1.data)
      const status = response1.data.status
      setPost(status)
      console.log(status)

      if (status == 'signed_up') {
        window.location.href = '/dashboard'
        setCookie('user', inputs.email, { path: '/' })
        setCookie('page_to_load', 'Passenger', { path: '/' })
        setCookie('status', 'Passenger', { path: '/' })
        setCookie('UserInfo', inputs, { path: '/' })
        setCookie('UserDp', UserDp, { path: '/' })
      } else {
        // alert('not yet')
      }
    })
    /*axios.post(baseURL, new_data).then((response) => {  
      const status = response.data.status
      
     
    })*/
  }

  return (
    <>
      <Mynavbar />
      <div className="my-container">
        {post}
        <div className="row">
          <div className="col-sm-5">
            <div className="signup-image-div center">
              <img src={Signin} className="signup-image" />
            </div>
          </div>
          <div className="col-sm-5 center s-container">
            <div className="signup-container border center ">
              <div className="tape"></div>
              <div className="logo-container center ">
                <img src={logo} alt="Travelbro" className="logo-img" />
              </div>

              <div className="header-container">
                <h1 className="signup-title">Sign up with us</h1>
              </div>

              <form onSubmit={submit_handler}>
                <div className="body-container center">
                  <div className="form-input center">
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Upload a display picture</Form.Label>
                      <Form.Control
                        type="file"
                        value={file.image}
                        onChange={file_handler}
                        accept="image/png, image/gif, image/jpeg, image/jpg"
                      />
                    </Form.Group>
                  </div>
                  <div className="row half-div center">
                    <div className="form-group col-6 pp-input-div center mb-4">
                      <input
                        type="email"
                        className=" email-input input"
                        name="email"
                        placeholder=" Enter email"
                        value={inputs.email}
                        onChange={change_handler}
                        required
                      />
                    </div>
                    <div className="form-group col-6 tel-input-div center mb-4">
                      <input
                        type="number"
                        className=" email-input input"
                        name="tel"
                        placeholder=" Tel"
                        value={inputs.tel}
                        onChange={change_handler}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group name-input-div center mb-4">
                    <input
                      type="text"
                      className=" email-input input"
                      name="name"
                      placeholder=" Full Name"
                      value={inputs.name}
                      onChange={change_handler}
                      required
                    />
                  </div>

                  <div className="form-group password-input-div center mb-4">
                    <input
                      type="password"
                      className=" password-input input"
                      name="password"
                      placeholder=" Password"
                      value={inputs.password}
                      onChange={change_handler}
                      required
                    />
                  </div>
                  <div className="form-group referal-input-div center mb-4">
                    <input
                      type="text"
                      className=" referal-input input"
                      name="referal"
                      placeholder=" Referral Code"
                      value={inputs.referal}
                      onChange={change_handler}
                    />
                  </div>
                  <div className="button-div center mb-4">
                    <input
                      type="submit"
                      className="btn button "
                      value="Submit"
                    />
                  </div>

                  {/*<div className="fb-div center">
                  <div className="fb-text">Continue with Facebook</div>
                  <div className="fb-arrow">
                    <BsFacebook size={30} color="#5153e4" />
                    <BsArrowRightShort size={30} />
                  </div>
                </div> 
                 */}

                  <div className="signin-link center">
                    Already a member{' '}
                    <span
                      className="link text-primary"
                      onClick={() => {
                        window.location.href = '/signin'
                      }}
                    >
                      Sign in
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
