import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
      <div className="DashboardComponent">
          <div className="DashboardComponent-in">
            <div className="Dashboard-one">
                <h1>SAC</h1>
                <Link href="events">Upload Events</Link>
                <Link href="news">news</Link>
            </div>
          </div>
      </div>
  )
}

export default page