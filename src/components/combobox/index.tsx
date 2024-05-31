import React, { useState, useEffect } from 'react';
interface TypeOption{
    value: number,
    label: string
}[]
const Combobox = ({options, label, onChange, name} :{options: any, label: any, onChange: any, name: any}) => {
    const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (e: any) => {
    setSelectedValue(e.target.value);
    onChange(e);
  };

  return (
    <div className='flex justify-between items-center mb-2'>
      <label htmlFor="combobox">{label}</label>
      <select id="combobox" value={selectedValue} onChange={handleChange} className='p-1 w-52' name={name} >
        <option value="" disabled>Select an option</option>
        {options.map((option: any, index: any) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
export default Combobox