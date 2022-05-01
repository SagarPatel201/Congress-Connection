import React, {useEffect} from 'react';
import {Card, CardContent, CardMedia} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import {CircularProgress, Grid, Typography} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function News() {
    const [errored, setErrored] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [articles, setArticles] = React.useState([]);
    const [page, setPage] = React.useState(0);

    useEffect(() => {
        const getArticles = async () => {
            const response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?page=${page}&fq=headline:(%22Congress%22)&sort=newest&api-key=${process.env.REACT_APP_NYTIMES_API_KEY}`);
            setArticles(articles.concat(response.data.response.docs));
            setIsLoading(false);
        };
        getArticles()
            .catch(() => setErrored(true));
    }, [page]);

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
                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => setPage(page + 1)}
                    hasMore={page < 5}
                    initialLoad={true}
                    loader={<CircularProgress key={0}/>}
                >
                    <Grid
                        className={'news-grid'}
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={4}
                        padding={4}
                    >
                        {articles.map(article => (
                            <Grid className="news-row" item xs={12} sm={2} key={article._id}>
                                <Card
                                    className={"article-card"}
                                    style={{
                                        maxWidth: 300,
                                        maxHeight: 400,
                                    }}
                                >
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
                            </Grid>
                        ))}
                    </Grid>
                </InfiniteScroll>
            </div>
        );
    }
}

export default News;