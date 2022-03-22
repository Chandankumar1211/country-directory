import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, InputLabel, Grid } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Favorite, Share, ExpandMore, MoreVert } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    label: {
        color: '#000',
        fontSize: '14px'
    }
}));

const CountryDetail = (props) => {
    const params = useParams();
    const { countryName } = params;
    const [country, setCountry] = useState([]);
    const classes = useStyles();
    const { flag, name = '', nativeName, region, currencies = [], borders = [], population, area, languages = [], capital } = country.length ? country[0] : {};

    useEffect(() => {
        getData();
    }, [])

    const getData = async (query) => {
        try {
            if (countryName) {
                let url = `https://restcountries.com/v2/name/${countryName}?fullText=true`;
                let res = await fetch(url);
                let result = await res.json();
                setCountry(result);
            }
        } catch (error) {
            alert("Something went wrong. Please try again later")
        }
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {name[0]}
                    </Avatar>
                }
                title={`${name} (${region})`}
                subheader={nativeName}
            />
            <CardMedia
                className={classes.media}
                image={flag}
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    <Grid container>
                        <Grid item sm={12}>
                            <span className={classes.label}>Capital: </span>
                            <span >{capital}</span>
                        </Grid>
                    </Grid>
                    <Grid container>
                        {currencies.map(currency => {
                            return (<>
                                <Grid item sm={12}><span className={classes.label} >Currency: </span><span>{currency.name}</span></Grid>
                                <Grid item sm={12}><span className={classes.label} >Symbol: </span><span>{currency.symbol}</span></Grid>
                            </>)
                        })}
                    </Grid>

                    <Grid container>
                        <Grid item sm={12}>
                            <span className={classes.label}>Border Countries: </span> <span>{borders.map(bc => bc).join(', ')}</span>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item sm={12}>
                            <span className={classes.label}>Total Population: </span>
                            <span >{population}</span>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item sm={12}>
                            <span className={classes.label}>Area: </span>
                            <span >{area}</span>
                            <span > km2</span>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item sm={12}>
                            <span className={classes.label}>Languages: </span> <span>{languages.map(lang => lang.nativeName).join(', ')}</span>
                        </Grid>
                    </Grid>
                </Typography>
            </CardContent>
        </Card>
    )
}

export default memo(CountryDetail);