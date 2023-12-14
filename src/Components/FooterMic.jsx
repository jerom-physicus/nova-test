import React from 'react'

const FooterMic = ({listen}) => {
  return (
    <div className='footer' onClick={listen}>
        <img src="https://cdn-icons-png.flaticon.com/128/3293/3293623.png" alt="" />
        <div className="circle"></div>
    </div>
  )
}

export default FooterMic