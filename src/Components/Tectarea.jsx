import React from 'react'

const Tectarea = ({question, answer, close}) => {
  return (
    <div className='textarea'>
      <div className="head">
        <h3 style={{color:'black',textAlign:'start', position:'relative', bottom:'2vh'}}>NOVA AI</h3>
        <img src="https://cdn-icons-png.flaticon.com/128/992/992660.png" alt='' className='closer' onClick={close}/>
      </div>

        <p style={{color:'black', textAlign:'start'}}>{question}</p>
        <h1 style={{color:'black', fontSize:'17px'}}>{answer}</h1>
    </div>
  )
}

export default Tectarea