import React, { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="input-wrapper">
      <label className="input-label">
        {label}
        <input className="input-field" {...props} />
      </label>
    </div>
  );
};

export default Input;