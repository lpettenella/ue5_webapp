import React, { useEffect } from 'react'
import { useState } from 'react';

type PolicyModalProps = {
  authenticate: Function
  modalOpen: any
  setModalOpen: any
}

function PolicyModal({ authenticate, modalOpen, setModalOpen }: PolicyModalProps) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(false);
  }, [modalOpen])
  
  return (
    <div className={`modal-overlay ${modalOpen ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
        <h2>Privacy Policy</h2>
        <p>
          We take your privacy seriously and will only use your personal information to administer your account and to provide the products and services you have requested from us.
        </p>
        <p>
          We will not share your information with any third party outside of our organization, other than as necessary to fulfill your request (for example to ship an order to you).
        </p>
        <p>
          If you have any questions, please contact us at privacy@example.com
        </p>
        <div>
          <input 
            type="checkbox" 
            id="privacy-checkbox" 
            onChange={() => { setIsChecked(!isChecked) }} 
            checked={isChecked}>
          </input>
          <label className="privacy-label" htmlFor="privacy-checkbox">I accept the privacy policy</label>
        </div>
        <button className="authenticate-btn" onClick={() => authenticate()} disabled={!isChecked}>Authenticate with Internet Identity</button>
      </div>
    </div>
  )
}

export default PolicyModal