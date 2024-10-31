import React from 'react';
import { useRouter } from 'next/navigation';

import './Navbar.css';

const Navbar = () => {
  const router = useRouter();

  return (
    <div className='clubActivitiesComponentNav'>
      <div className="clubActivitiesComponentNav-in">
        <div className="clubActivitiesComponentNav-one">
          <h1>Student Activity Center</h1>
        </div>

        <div className="clubActivitiesComponentNav-two">
          <p onClick={() => router.back()}>
            Go Back
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
