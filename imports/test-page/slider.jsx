import React, {useState, useEffect} from 'react';

import { ChildrenResponsive } from '../packages/children-responsive';

import {Checkbox, Grid} from '@material-ui/core';
import {Brightness1Outlined, Brightness1Rounded} from '@material-ui/icons';
import {makeStyles} from '@material-ui/styles';

const useStyle = makeStyles(() => ({
  animation: {
    transition: 'all 1s ease',
    position: 'absolute',
    height: '100%',
    width: '100%'
  }
}));

export const Slider = ({images, checked}) => {
  const classes = useStyle();
  const [index, setIndex] = useState(0);

  useEffect(() => {setIndex(0)}, [checked]);

  return (
    <>
      <div style={{
        position: 'absolute',
        width: 'calc(100% - 60px)',
        height: 'calc(100% - 60px)',
        left: 30,
        top: 30,
        borderRadius: 15,
        overflow: 'hidden'
      }}>
      {images.map((value) => (
        <div key={value.id}
          className={classes.animation}
          style={{
            opacity: checked == value.id ? 1 : 0
          }}
        >
        {value.imgs.map((image, i) => (
          <div key={i}
            className={classes.animation}
            style={{
              opacity: index == i ? 1 : 0
            }}
          >
            <ChildrenResponsive>
              <img src={image} alt={value.alt} style={{width: '100%'}} />
            </ChildrenResponsive>
          </div>
        ))}
          <Grid
            container
            justify= 'center'
            alignItems='center' style={{
              position: 'absolute',
              bottom: 0
            }}>
            <Grid item>
              {value.imgs.map((image, i) => (
                <Checkbox 
                  key={i} 
                  checked={i == index}
                  icon={<Brightness1Outlined style={{color: '#fff', width: 15}} />} 
                  checkedIcon={<Brightness1Rounded style={{color: '#fff', width: 15}} />}  
                  onClick={() => setIndex(i)}  
                />
              ))} 
            </Grid>
          </Grid>
        </div>
      ))}
      </div>
    </>
  )
}