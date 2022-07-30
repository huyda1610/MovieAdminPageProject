import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';

export default function BoxId(props) {

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
                    (Array.isArray(options)) && options.map(
                        item => (<MenuItem key={item.maRap} value={item.maRap}>{item.tenRap}</MenuItem>)
                    )             
                }
            </MuiSelect>
            {touched && <FormHelperText error={touched && Boolean(error)}>{error}</FormHelperText>}
        </FormControl>
    )
}
