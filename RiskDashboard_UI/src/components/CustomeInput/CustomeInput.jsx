import React, { useState } from "react";
import PropTypes from "prop-types";

const CustomeInput = ({
  constrol,
  name,
  rules = {},
  onBlur,
  onChange,
  value,
  setValue,
  placeholder,
  secureTextEntry,
  onPress,
  right,
  message,
  classChange,
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <>
      <div className="form-group">
        {placeholder && !classChange && (
          <label htmlFor={placeholder}>{placeholder}</label>
        )}
        <input
          data-testid="input" 
          type={secureTextEntry ? "password" : "email"}
          className={`form-control ${classChange ? classChange : ""}`}
          onFocus={() => setFocused(true)}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          label={placeholder}
          placeholder={placeholder}
          mode=""
        />
      </div>
    </>
  );
};

export default CustomeInput;
CustomeInput.propTypes = {
  data: PropTypes.any,
  constrol: PropTypes.any,
  name: PropTypes.any,
  rules: PropTypes.any,
  onBlur: PropTypes.any,
  onChangeText: PropTypes.any,
  onChange: PropTypes.any,
  value: PropTypes.any,
  setValue: PropTypes.any,
  placeholder: PropTypes.any,
  secureTextEntry: PropTypes.any,
  onPress: PropTypes.any,
  right: PropTypes.any,
  message: PropTypes.any,
  classChange: PropTypes.any,
};
