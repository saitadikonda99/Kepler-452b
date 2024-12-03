import React from 'react'
import "./page.css";

const page = ({ data, setData }) => {

    const handleChange = (e) => {
        setData({ ...data, agree: e.target.checked });
    };

  return (
        <div className="UnderTakingComponent">
            <div className="UnderTakingComponent-in">

                <div className="ut-one">
                    <h1>Under Taking</h1>
                    <p>Please read the following information carefully and agree to the under taking form.</p>
                </div>

                <div className="ut-two">
                    <p>
                        I hereby declare that I have read, understood, and agreed to abide by all the rules and regulations mentioned above regarding the registration process for the Student Activity Center. I am fully aware of the policies concerning domain and club selection, program participation, attendance requirements, and the consequences of non-compliance.
                    </p>
                    <p>
                        By proceeding with the registration, I accept full responsibility for my choices and actions during the registration and participation phases. I understand that once registered, no changes to the selected domain or club will be allowed, and I commit to adhering to the guidelines set forth by the Student Activity Center.
                    </p>
                    <p>
                        I acknowledge that it is my duty to actively participate in all programs assigned by the chosen club and maintain the required attendance. Failure to comply with these requirements may lead to penalties, including being barred from further participation in the Student Activity Center.
                    </p>
                </div>

                <div className="ut-four">
                    <input type="checkbox" checked={data.agree} onChange={handleChange} />
                    <p>By clicking "Proceed," I confirm my acceptance of this undertaking.</p>
                </div>
            </div>
        </div>
  )
}

export default page