import {AppBar, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";


const Header = () => {
    const router = useNavigate();
    return (
        <AppBar component="div" position="static">
            <Toolbar sx={{alignItems: "center"}}>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 2, cursor: "pointer"}}
                    onClick={() => router("/movies")}
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