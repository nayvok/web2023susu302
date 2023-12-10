import {Button, FormControl, MenuItem, Select, Stack, TextField} from "@mui/material";
import React from "react";


const MovieFilter = ({options, value, onChange}) => {

    return (
        <Stack direction="row" spacing={2} justifyContent="space-between">
            <TextField label="Введите название фильма" variant="outlined" sx={{width: 1}}/>
            <FormControl sx={{m: 1, minWidth: 1 / 7}}>
                <Select
                    value={value}
                    onChange={event => onChange(event.target.value)}
                >
                    {options.map(option =>
                        <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Stack>
    );
};

export default MovieFilter;