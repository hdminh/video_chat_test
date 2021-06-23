import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  Row
} from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));
// Age slider 
const AgeSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -6,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

// Distance slider
const DistanceSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -6,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);
function valuetext(value) {
  return `${value}°C`;
}

export default function Filter(props) {
  const classes = useStyles();
  const filterValue = props.matchNowDefaultValue;
  const handleChangeAge = (event, newValue) => {
    console.log("age: ", newValue);
    let changeValue = filterValue;
    changeValue.minage = newValue[0];
    changeValue.maxage = newValue[1];
    props.setMatchNowBodyFromFilter(changeValue);
  };

  const handleChangeDistance = (event, newValue) => {
    let changeValue = filterValue;
    changeValue.distance = newValue;
    console.log(changeValue);
    props.setMatchNowBodyFromFilter(changeValue);
  };

  const handleChangeRelationship = (newValue) => {
    let changeValue = filterValue;
    changeValue.relationship = newValue;
    console.log(changeValue);
    props.setMatchNowBodyFromFilter(changeValue);
  };

  const handleChangeGender = (newValue) => {
    let changeValue = filterValue;
    changeValue.gender = newValue;
    console.log(changeValue);
    props.setMatchNowBodyFromFilter(changeValue);
  };



  return (
    <React.Fragment>
      <Row>
        <div className="heading-filter">
          <h3 className="heading-filter__fs15">Filter</h3>
        </div>
      </Row>
      <Row>
        <div className="address-filter">
          <label className="label__fs20">I'm interested in: Dak Lak</label>
        </div>
      </Row>
      <Row className="mt-1">
        <div className="gender-filter">
          <div className="btn-group" role="group" aria-label="Basic example">
            <label type="button" className={`btn btn-light btn-gender ${filterValue.gender === 1 && "g__active"}`} onClick={() => handleChangeGender(1)}>Male</label>
            <label type="button" className={`btn btn-light btn-gender ${filterValue.gender === 2 && "g__active"}`} onClick={() => handleChangeGender(2)}>Female</label>
            <label type="button" className={`btn btn-light btn-gender ${filterValue.gender === 3 && "g__active"}`} onClick={() => handleChangeGender(3)}>Others</label>
          </div>
        </div>
      </Row>
      <Row className="mt-1">
        <div className="age-filter">
          <Typography id="range-slider" gutterBottom>
            Age range
                    </Typography>
          <AgeSlider style={{ color: '#FFA500', marginTop: '-10px' }}
            min={18}
            value={[filterValue.minage, filterValue.maxage]}
            onChange={handleChangeAge}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
          />
        </div>
      </Row>
      <Row className="mt-1">
        <div className="distance-filter">
          <Typography id="range-slider" gutterBottom>
            Distance (km)
                    </Typography>
          <DistanceSlider style={{ color: '#FFA500', marginTop: '-10px' }}
            valueLabelDisplay="auto" aria-label="pretto slider" value={filterValue.distance}
            onChange={handleChangeDistance}
          />
        </div>
      </Row>
      <Row className="mt-1">
        <div className="rela-filter">
          <div className="btn-group" role="group" aria-label="Basic example">
            <label type="button" className={`btn btn-light btn-gender ${filterValue.relationship === 1 && "g__active"}`} onClick={() => handleChangeRelationship(1)}>In-Rela</label>
            <label type="button" className={`btn btn-light btn-gender ${filterValue.relationship === 2 && "g__active"}`} onClick={() => handleChangeRelationship(2)}>Alone</label>
            <label type="button" className={`btn btn-light btn-gender ${filterValue.relationship === 3 && "g__active"}`} onClick={() => handleChangeRelationship(3)}>Diviorce</label>
          </div>
        </div>
      </Row>
    </React.Fragment>
  )
}