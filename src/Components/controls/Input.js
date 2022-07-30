import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const { name, label, value,error=null, onChange, disabled=false, onBlur=null, touched=null } = props;
    return (
        <TextField
            variant="standard"
            multiline
            disabled={disabled}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            error={touched && Boolean(error)}
            helperText={touched && (error)}
        />
    )
}
