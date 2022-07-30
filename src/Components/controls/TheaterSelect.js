import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';

export default function TheaterSelect(props) {

    const { name, label, value,error=null, onChange, options, onBlur=null, touched=null, disabled=false } = props;

    return (
        <FormControl variant="standard" error={touched && Boolean(error)} fullWidth>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                disabled={disabled}
                label={label}
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}>
                {
                    options.map(
                        item => (<MenuItem key={Math.random()} value={item.maHeThongRap}>{item.tenHeThongRap}</MenuItem>)
                    )             
                }
            </MuiSelect>
            {touched && <FormHelperText error={touched && Boolean(error)}>{error}</FormHelperText>}
        </FormControl>
    )
}
