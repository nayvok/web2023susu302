import {
    Card,
    CardActionArea,
    CardContent, CardMedia,
    Divider, Grid,
    Stack,
    Typography
} from "@mui/material";

const MovieItem = (props) => {
    return (
        <Grid item xs={6} sm={4} md={3} lg={2.4} sx={{justifyContent:"center", display: "flex"}}>
            <Card sx={{width: {xs: "180px"}}}>
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
                            {/*<Typography variant="subtitle1" color="text.secondary">*/}
                            {/*    {props.movie.genres.join(', ')}*/}
                            {/*</Typography>*/}
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )

};

export default MovieItem;