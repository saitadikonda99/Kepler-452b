import React from 'react'
import './page.css'


const page = () => {

  return (
        <div className='MailComponent'>
            <div className='MailComponent-inner'>
                <div className="mail-one">
                    <div className="mail-one-in">
                        <div className="m-one">
                            <h1>Steps to Compose a Mail</h1>
                        </div>
                        <div className="m-two">
                            <div className="m-two-in">
                                <div className="m-two-one">
                                    <p>1</p>
                                </div>
                                <div className="m-two-two">
                                    <h1>Enter the mail</h1>
                                    <p>Enter the sender outlook mail Ex: 2200031234@kluniversity.in</p>
                                </div>
                            </div>
                        </div>
                        <div className="m-three">
                            <div className="m-two-in">
                                <div className="m-two-one">
                                    <p>2</p>
                                </div>
                                <div className="m-two-two">
                                    <h1>Enter the password</h1>
                                    <p>Note: we wont't save any of your passwords it is completely safe to use</p>
                                </div>
                            </div>
                            
                        </div>
                        <div className="m-four">
                            
                        </div>
                    </div>
                </div>
                <div className="mail-two">

                </div>
            </div>
        </div>
  )
}

export default page