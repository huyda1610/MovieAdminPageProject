import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDateTimePicker  } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DateTimePicker(props) {

    const { name, label, value, onChange } = props


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker  disableToolbar variant="inline" inputVariant="standard"
                label={label}
                format="hh:mm:ss dd/MM/yyyy"
                name={name}
                value={value}
                onChange={date =>onChange(convertToDefEventPara(name,date))}

            />
        </MuiPickersUtilsProvider>
    )
}
