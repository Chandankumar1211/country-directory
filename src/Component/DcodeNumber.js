import React, { memo, useState } from "react";
import { TextField, Button, Grid } from "@material-ui/core";

const checkDecodeNumber = (num) => {
    let c = 2;
    let isDecodeNumber = true;
    while (num > 1) {
        if (num % c == 0) {
            num /= c;
            if (!(c === 2 || c === 3 || c === 5)) {
                isDecodeNumber = false
                break;
            }
        }
        else {
            c++
        }
    }
    return isDecodeNumber;
}


const DecodeNumebr = () => {
    const [number, setNumber] = React.useState('');
    const [msg, setMsg] = useState('')

    const onCheckNumberClick = (num) => {
        if (num >= 1) {
            let decodeNumber = checkDecodeNumber(num);
            decodeNumber ? setMsg("It's a decode number.") : setMsg("It's not a decode number.")
        } else {
            setMsg("Number should be greater than zero.")
        }
    }

    return (<Grid container>
        <Grid item sm={12} md={12} lg={12}>
            <TextField id="standard-basic" label="Number" type="number" placeholder="Enter Number"
                onKeyDown={(event) => { if (event.key === '.') { event.preventDefault() } }}
                InputProps={{ inputProps: { min: 1 } }} onChange={(e) => {
                    setNumber(e.target.value);
                    setMsg('');
                }} />
            <Button variant="contained" color="primary" onClick={() => onCheckNumberClick(number)} className="ml-4">
                Check
            </Button>
        </Grid>
        <Grid item sm={12} md={12} lg={12} className="pt-4">
            {msg && <span style={{ fontWeight: 'bold' }}>{msg}</span>}
        </Grid>
    </Grid >
    )
}

export default memo(DecodeNumebr);