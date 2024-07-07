import React from 'react'

export default function Input({name,placeholder,handleInput}) {// using destructuring we directly obtain placeholder instead of placeholder:props
    return (
        <div>
        <input
        name={name}
        onChange={handleInput} 
        className="input-field"
         placeholder={placeholder}
         />
         </div>
    )
}


