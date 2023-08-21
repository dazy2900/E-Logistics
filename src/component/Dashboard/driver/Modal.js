import Signup from '../../Register/Signup'
import './driver.scss'
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const CompleteSignup = () => {
  const [inputs, setInputs] = useState('')
  const [post, setPost] = useState('')
  const [cookies, setCookie] = useCookies(['user', 'status'])

  const baseURL = 'http://localhost/Travelbro/api.php'

  const change_handler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }

  const submit_handler = (e) => {
    e.preventDefault()
    console.log(inputs)
    const user = cookies.user
    //console.log(cookies.user)
    //console.log(cookies.status)
    const datas = {
      request: 'complete_signup',
      data: inputs,
      user: user,
    }

    const new_data = JSON.stringify(datas)
    //const new_data2 = JSON.parse(new_data)

    axios.post(baseURL, new_data).then((response) => {
      const res = response.data.status

      setPost(res)
      if (res == 'driver') {
        setCookie('user', inputs.email, { path: '/' })
        setCookie('status', 'driver', { path: '/' })
        console.log(res)
        console.log(cookies.status)
      }
    })
  }

  return (
    <div className="modal-container">
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6 center form-container2">
          <h4>Fill to be a Driver</h4>
          <form onSubmit={submit_handler}>
            <div className="modal-div p-4  center">
              <div className="mb-3">
                <Form.Select
                  aria-label="Default select example"
                  name="idcard-type"
                  onChange={change_handler}
                  required
                >
                  <option>Id-Card Type</option>
                  <option value="NIN">National ID-Card</option>
                  <option value="international_passport">
                    International Passport
                  </option>
                  <option value="drivers_lincense">Drivers Lincense</option>
                </Form.Select>
              </div>
              <div className="row half-div center">
                <div className="form-group col-6 idcard-number-div center mb-4">
                  <input
                    type="text"
                    className="idcard-number-input input"
                    name="idcard-number"
                    placeholder=" Id-Card Number"
                    value={inputs.idcard_number}
                    onChange={change_handler}
                    required
                  />
                </div>
                <div className="form-group col-6 drivers-lincense-div center mb-4">
                  <input
                    type="text"
                    className=" drivers-lincense-input input"
                    name="drivers-lincense-number"
                    placeholder=" Drivers Lincense Number"
                    value={inputs.drivers_lincense_number}
                    onChange={change_handler}
                    required
                  />
                </div>
              </div>
              <div className="row half-div center">
                <div className="form-group col-6 bank-div center mb-4">
                  <Form.Select
                    aria-label="Default select example"
                    name="bank"
                    onChange={change_handler}
                    required
                  >
                    <option value="">--Select Bank--</option>

                    <option value="abbey_mortgage">Abbey Mortgage Bank</option>

                    <option value="access">Access Bank</option>

                    <option value="diamond">Diamond Bank</option>

                    <option value="ASO">ASO Savings and Loans</option>

                    <option value="bowen_microfinance">
                      Bowen Microfinance Bank
                    </option>

                    <option value="CEMCS_microfinance">
                      CEMCS Microfinance Bank
                    </option>

                    <option value="citibank">Citibank Nigeria</option>

                    <option value="coronation_merchant">
                      Coronation Merchant Bank
                    </option>

                    <option value="Ecobank">Ecobank Nigeria</option>

                    <option value="ekondo_microfinance">
                      Ekondo Microfinance Bank
                    </option>

                    <option value="Eyowo">Eyowo</option>

                    <option value="fidelity">Fidelity Bank</option>

                    <option value="firmus_MFB">Firmus MFB</option>

                    <option value="first_bank">First Bank of Nigeria</option>

                    <option value="First_city_monument">
                      First City Monument Bank
                    </option>

                    <option value="FSDH_merchant">
                      FSDH Merchant Bank Limited
                    </option>

                    <option value="globus">Globus Bank</option>

                    <option value="gtb">Guaranty Trust Bank</option>

                    <option value="hackman_microfinance">
                      Hackman Microfinance Bank
                    </option>

                    <option value="hasal_microfinance">
                      Hasal Microfinance Bank
                    </option>

                    <option value="Heritage">Heritage Bank</option>

                    <option value="Ibile_Microfinance">
                      Ibile Microfinance Bank
                    </option>

                    <option value="Infinity_MFB">Infinity MFB</option>

                    <option value="Jaiz_Bank">Jaiz Bank</option>

                    <option value="Keystone">Keystone Bank</option>

                    <option value="Kuda_Bank">Kuda Bank</option>

                    <option value="Lagos_Building_Investment_Company_Plc">
                      Lagos Building Investment Company Plc.
                    </option>

                    <option value=" Mayfair_MFB">Mayfair MFB</option>

                    <option value="Mint_MFB">Mint MFB</option>

                    <option value="One_Finance">One Finance</option>

                    <option value="PalmPay">PalmPay</option>

                    <option value="Parallex">Parallex Bank</option>

                    <option value="Parkway">Parkway - ReadyCash</option>

                    <option value="Paycom">Paycom</option>

                    <option value="Petra_Mircofinance">
                      Petra Mircofinance Bank Plc
                    </option>

                    <option value="Polaris">Polaris Bank</option>

                    <option value="Providus">Providus Bank</option>

                    <option value="Rand Merchant">Rand Merchant Bank</option>

                    <option value="Rubies_MFB">Rubies MFB</option>

                    <option value="Sparkle_Microfinance">
                      Sparkle Microfinance Bank
                    </option>

                    <option value="Stanbic_IBTC">Stanbic IBTC Bank</option>

                    <option value="Standard_Chartered">
                      Standard Chartered Bank
                    </option>

                    <option value="Sterling">Sterling Bank</option>

                    <option value="Suntrust">Suntrust Bank</option>

                    <option value="TAJ">TAJ Bank</option>

                    <option value="TCF_MFB">TCF MFB</option>

                    <option value="Titan">Titan Bank</option>

                    <option value="Union_Bank">Union Bank of Nigeria</option>

                    <option value="UBA">United Bank For Africa</option>

                    <option value="Unity">Unity Bank</option>

                    <option value="VFD_Microfinance">
                      VFD Microfinance Bank Limited
                    </option>

                    <option value="wema">Wema Bank</option>

                    <option value="Zenith">Zenith Bank</option>
                  </Form.Select>
                </div>
                <div className="form-group col-6 acc-numb-div center mb-4">
                  <input
                    type="text"
                    className=" acc-numb-input input"
                    name="acc-numb"
                    placeholder=" Account Number"
                    value={inputs.acc_numb}
                    onChange={change_handler}
                    required
                  />
                </div>
              </div>
              <div className="form-group address-div center mb-4">
                <textarea
                  className=" address-input"
                  name="address"
                  placeholder=" Address"
                  value={inputs.address}
                  onChange={change_handler}
                  rows="3"
                  required
                ></textarea>
              </div>

              <div className="button-div center mb-2 mt-4">
                <input type="submit" className="btn button " value="Submit" />
              </div>
            </div>
          </form>
        </div>
        <div className="col-sm-3"></div>
      </div>
    </div>
  )
}
export default CompleteSignup
