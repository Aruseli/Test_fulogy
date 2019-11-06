import React, {useState, useRef} from 'react';
import {
  Grid,
  Paper,
  makeStyles,
  Checkbox,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  ButtonBase,
  IconButton,
} from '@material-ui/core';
import {PriorityHigh, CheckBox} from '@material-ui/icons';

import {Slider} from './slider';
import {Picture} from '../../../packages/picture/index';

const useStyles = makeStyles(() => ({
  cover: {
    width: '100%',
    maxWidth: 360,
  },
  tableCellStyle: {
    borderBottom: 0
  },
  animation: {
    transition: 'all 1s ease',
  },
  checkboxStyle: {
    backgroundColor: '#fff',
    color: '#00b6ff',
    margin: '0 -4px',
    height: 10
  }
}));

const images=[
  {
    id: 1,
    src: require('../../../../images/warm.jpg?resize&size=300'),
    alt: 'теплое освещение'
  },
  {
    id: 2,
    src: require('../../../../images/day.jpg?resize&size=300'),
    alt: 'дневное освещение'
  },
  {
    id: 3,
    src: require('../../../../images/cold.jpg?resize&size=300'),
    alt: 'холодное освещение'
  }
]

export const MainBlocks = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState(1);

  return (
    <Grid container justify="center" alignItems="stretch">
      <Grid item xs={7} style={{
        position: 'relative'
      }}>
        <Slider images={images} checked={checked} />
      </Grid>
      <Grid item xs={5} style={{
        borderLeft: '1px solid rgba(0, 0, 0, .2)'
      }}>
          <Table style={{
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 20
          }}>
            <TableBody>
              <TableRow>
                <TableCell classes={{root: classes.tableCellStyle}}>Класс:</TableCell>
                <TableCell classes={{root: classes.tableCellStyle}}>
                  <Button variant="contained">Standart</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell classes={{root: classes.tableCellStyle}}>
                  Потребляемая
                  <br />
                  мощность:
                </TableCell>
                <TableCell classes={{root: classes.tableCellStyle}}>59Вт</TableCell>
              </TableRow>
              <TableRow>
                <TableCell classes={{root: classes.tableCellStyle}}>Сила света:</TableCell>
                <TableCell classes={{root: classes.tableCellStyle}}>
                  3459 Люмен = 7,5 ламп
                  <br />
                  накаливание по 40Вт
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell classes={{root: classes.tableCellStyle}}>Монтаж:</TableCell>
                <TableCell classes={{root: classes.tableCellStyle}}>Да</TableCell>
              </TableRow>
              <TableRow>
                <TableCell classes={{root: classes.tableCellStyle}}>Итого сумма:</TableCell>
                <TableCell classes={{root: classes.tableCellStyle}}>2594 рублей</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Grid container justify='center' alignItems='center'>
            <Grid item xs={12} style={{
              height: 64,
            }}>
              <div
                style={{
                position: 'relative',
                }}>
                <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 64,
                  height: 64,
                  backgroundColor: '#00abf1',
                }}
                ><PriorityHigh style={{
                    color: '#fff', 
                    transform: 'rotate(180deg)', 
                    width: 35,
                    height: 35,
                    marginTop: 14,
                    marginLeft: 14
                  }} /></div>
                <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 64,
                  width: '100%',
                  height: 64,
                  backgroundColor: '#00b6ff',
                }}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                justify="center"
                alignItems="center"
                spacing={6} style={{
                  marginTop: 30,
                  marginBottom: 30
                }}
              >
              {images.map((image) => (
                <Grid item xs={3} key={image.id}>
                  <div 
                    className={classes.animation}
                    style={{
                      position: 'relative',
                      transform: checked == image.id ? 'scale(1.2)' : 'scale(1)'
                    }}>
                    <ButtonBase onClick={() => setChecked(image.id)}>
                      <img src={image.src} alt={image.alt} width='100%' />
                    </ButtonBase>
                    { checked == image.id && <IconButton
                      classes={{label: classes.checkboxStyle}}
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                      }}
                    ><CheckBox/></IconButton>}
                  </div>
                </Grid>
              ))}
              </Grid>
            </Grid>
          </Grid>

      </Grid>
    </Grid>
  );
};
