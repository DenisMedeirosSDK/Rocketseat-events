import React, { InputHTMLAttributes } from 'react'

import './styles.css'
interface ITextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name:string;
  label: string;
}

const Textarea:React.FC<ITextareaProps> = ({ label, name, ...rest }) => {
  return(
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} {...rest} />
    </div>
  )
}

export default Textarea