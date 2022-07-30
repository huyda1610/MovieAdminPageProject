import React from 'react'
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import FormHelperText from '@mui/material/FormHelperText';
export default function RadioGroup(props) {

    const { name, label, value, onChange, items, touched=null, error=null } = props;

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup row
                name={name}
                value={value}
                onChange={onChange}>
                {
                    items.map(
                        item => (
                            <FormControlLabel key={item.id} value={(item.id)} control={<Radio />} label={item.title} />
                        )
                    )
                }
            </MuiRadioGroup>
            <FormHelperText error={touched && Boolean(error)}>{touched && (error)}</FormHelperText>
        </FormControl>
    )
}
