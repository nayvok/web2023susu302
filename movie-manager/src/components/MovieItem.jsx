import {
    Card,
    CardActionArea,
    CardContent, CardMedia,
    Divider, Grid,
    Stack,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";

const MovieItem = (props) => {
    const router = useNavigate();

    return (
        <Grid item xs={6} sm={4} md={3} lg={2.4} sx={{justifyContent:"center", display: "flex"}}>
            <Card sx={{width: {xs: "180px"}}} onClick={() => router(`/movies/${props.movie.id}`)}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        sx={{height: 280, width: 1, objectFit: "cover", objectPosition: "50% 50%"}}
                        image={props.movie.posterUrl}
                    />
                    <CardContent sx={{height: "100%"}}>
                        <Typography variant="h6" sx={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                            {props.movie.title}
                        </Typography>
                        <Stack
                            direction="column"
                            divider={<Divider orientation="vertical" flexItem/>}
                        >
                            <Typography variant="subtitle1" color="text.secondary">
                                {props.movie.year}
                            </Typography>
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )

};

export default MovieItem;