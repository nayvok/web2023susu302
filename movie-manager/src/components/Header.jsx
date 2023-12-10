import {AppBar, Toolbar, Typography} from "@mui/material";


const Header = () => {
    return (
        <AppBar component="div">
            <Toolbar sx={{alignItems: "center"}}>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 2}}
                >
                    Movie Manager
                </Typography>
                <Typography
                    variant="subtitle1"
                >
                    by Ян Юшков
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;