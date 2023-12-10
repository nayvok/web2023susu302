import {Box, Card, CardActionArea, CardContent, CardMedia, Divider, Grid, Stack, Typography} from "@mui/material";


const MovieItem = (props) => {

    return (
        <Grid item xs={12} sm={4} md={3} lg={2.4} sx={{display:"flex", justifyContent:"center"}}>
            <Card sx={{width: 200}}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        sx={{height: 300, width: 200, objectFit: "cover", objectPosition: "50% 50%"}}
                        image={props.post.posterUrl}
                    />
                    <CardContent>
                        <Typography variant="h6">
                            {props.post.title}
                        </Typography>
                        <Stack
                            direction="row"
                            divider={<Divider orientation="vertical" flexItem/>}
                            spacing={2}
                        >
                            <Typography variant="subtitle1" color="text.secondary">
                                {props.post.year}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {props.post.genres}
                            </Typography>
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>

    )

};

export default MovieItem;