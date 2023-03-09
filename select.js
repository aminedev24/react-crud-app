import React from "react";
import Select from "react-select";

const CustomSelect = ({ options, value, onChange }) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      isMulti={true}
      closeMenuOnSelect={false}
    />
  );
};

export default CustomSelect;
