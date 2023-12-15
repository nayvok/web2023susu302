import {FormControl, MenuItem, Select, Stack, TextField} from "@mui/material";
import React from "react";


const MovieFilter = ({filter, setFilter}) => {

    return (
        <Stack direction="row" spacing={2} justifyContent="space-between">
            <TextField
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                label="Введите название фильма"
                variant="outlined"
                sx={{width: 1}}
            />
            <FormControl sx={{m: 1, minWidth: 1 / 7}}>
                <Select
                    value={filter.sort}
                    onChange={selectedSort => setFilter({...filter, sort: selectedSort.target.value})}
                    displayEmpty
                >
                    <MenuItem value="" disabled>Сортировка</MenuItem>
                    <MenuItem key="year" value="year">По дате</MenuItem>
                    <MenuItem key="title" value="title">По названию</MenuItem>
                    <MenuItem key="genres" value="genres">По жанру</MenuItem>
                </Select>
            </FormControl>
        </Stack>
    );
};

export default MovieFilter;