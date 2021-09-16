import React from 'react';
import './errorMessage.css';
import img from './error.jpg';



const ErrorMessage = () => {
  return (
    <>
      {/* чтобы получить доступ к папке public нужно использовать опред.переменную */}
      {/* <img src={process.env.PUBLIC_URL + '/img/error.jpg'} alt="error"></img> */}

      {/* если картинка хранится прямо в этой папке */}
      <img src={img} alt="error"></img>
      <span>Something goes wrong</span>
    </>
  )
}

export default ErrorMessage;