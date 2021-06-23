import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RestaurantCard from "./RestaurantCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function DefaultList(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.defaultList &&
      (<Grid container
             direction="row"
             justify="space-evenly"
             alignItems="center"
        spacing={2}>
          {props.defaultList.map(restaurant =>
            (<Grid item xs={3}>
              <RestaurantCard restaurantCard={restaurant} width={"12rem"}/>
            </Grid>)
          )}
        </Grid>
      )}
    </div>
  );
}