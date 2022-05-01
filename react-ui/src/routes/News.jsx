import React, {useEffect} from 'react';
import {Card, CardContent, CardMedia} from '@material-ui/core';
import axios from 'axios';
import {CircularProgress, Grid, Typography} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function Article({article}) {
    return (
        <div>
            {article && (
                <Card>
                    <CardMedia
                        component={'img'}
                        src={article.multimedia?.[0]?.url ? `https://nytimes.com/${article.multimedia[0].url}` : 'https://upload.wikimedia.org/wikipedia/commons/4/40/New_York_Times_logo_variation.jpg'}
                    />
                    <CardContent>
                        <Typography variant="h6">
                            <a href={article.web_url}>
                                {article.headline.main}
                            </a>
                        </Typography>
                        <Typography variant="subtitle2">
                            {article.byline.original}
                        </Typography>
                        <Typography variant="p">
                            {article.snippet}
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

function News() {
    const [errored, setErrored] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [articles, setArticles] = React.useState([]);

    useEffect(() => {
        const getArticles = async () => {
            const response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name:("us")&sort=newest&api-key=${process.env.REACT_APP_NYTIMES_API_KEY}`);
            setArticles(response.data.response.docs);
            setIsLoading(false);
        };
        getArticles()
            .catch(() => setErrored(true));
    }, []);

    if (errored) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                flexDirection: 'column',
                textAlign: 'center'
            }}>
                <ErrorOutlineIcon style={{fontSize: '150px'}}/>
                <h2>There was an error trying to fetch data from the server. Please try again later.</h2>
            </div>
        )
    } else if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                flexDirection: 'column',
                textAlign: 'center'
            }}>
                <CircularProgress/>
            </div>
        )
    } else {
        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    {articles.map(article => (
                        <Grid item xs={12} sm={4} key={article._id}>
                            <Article article={article}/>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}

export default News;