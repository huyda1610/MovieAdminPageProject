import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';

export default function GroupSelect(props) {

  const { name, label, value,error=null, onChange, options, onBlur=null, touched=null, disabled = false } = props;
  return (
      <FormControl variant="standard" error={touched && Boolean(error)}>
          <InputLabel>{label}</InputLabel>
          <MuiSelect
              disabled={disabled}
              label={label}
              name={name}
              value={value}
              onBlur={onBlur}
              onChange={onChange}>
              {
                options.map((options) => {
                  return (
                    <optgroup key={Math.random()} label={options.tenCumRap}>
                      {options.danhSachRap.map((danhSachRap) => {
                        return (
                          <option key={Math.random()} value={danhSachRap.maRap}>{danhSachRap.tenRap}</option>
                        );
                      })}
                    </optgroup>
                  );
                })                
              }
          </MuiSelect>
          {touched && <FormHelperText error={touched && Boolean(error)}>{error}</FormHelperText>}
      </FormControl>
  )
}
