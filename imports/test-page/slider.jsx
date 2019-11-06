import React, {useState} from 'react';

import { ChildrenResponsive } from '../../../packages/children-responsive';

import {Checkbox} from '@material-ui/core';
import {Brightness1Outlined, Brightness1Rounded} from '@material-ui/icons';
import {makeStyles} from '@material-ui/styles';


const warm = require('../../../../images/warm.jpg?resize&size=300');
const day = require('../../../../images/day.jpg?resize&size=300');
const cold = require('../../../../images/cold.jpg?resize&size=300');

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
          <ChildrenResponsive>
            <img src={value.src} alt={value.alt} style={{width: '100%'}} />
          </ChildrenResponsive>
          {images.map((image) => {
            <Checkbox 
              key={image.id} 
              icon={<Brightness1Outlined/>} 
              checkedIcon={<Brightness1Rounded />} 
              value="image.id" 
              // onChange={}  
            />
          })}
        </div>
      ))}
      </div>
    </>
  )
}