import React, {useState} from 'react';

import {Grid} from '@material-ui/core';


const items=[
  {
    id: 1,
    name: <div>Вариант<br/>кухни</div>,
    bg: '#00b6ff'
  },
  {
    id: 2,
    name: <div>Размеры</div>,
    bg: '#00b6ff'
  },
  {
    id: 3,
    name: <div>Сенсор</div>,
    bg: '#00b6ff'
  },
  {
    id: 4,
    name: <div>Питающий<br/>кабель</div>,
    bg: '#00b6ff'
  },
  {
    id: 5,
    name: <div>Блок<br/>питания</div>,
    bg: '#00b6ff'
  },
  {
    id: 6,
    name: <div>Цвет<br/>свечения</div>,
    bg: '#00b6ff'
  },
  {
    id: 7,
    name: <div>Монтаж</div>,
    bg: '#f9548c'
  },
  {
    id: 8,
    name: <div>Корзина</div>,
    bg: '#f9548c'
  }
]

export const TabsNav = () => {
  const [value, setValue] = useState(2);

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{
        borderTop: '1px solid rgba(0, 0, 0, .2)'
      }}
    >
      <Grid item xs={11}>
        <Grid 
          container
          justify='center'
          alignItems='stretch'
        >
        {items.map((item) => (
          <Grid item xs key={item.id} style={{
            border: '1px solid rgba(0, 0, 0, .2)',
            textAlign: 'center',
            paddingTop: 10,
            paddingBottom: 10,
            position: 'relative'
          }} onClick={() => setValue(item.id)}>
            <div style={{
              position: 'absolute',
              width: '100%',
              height: value == item.id ? '100%' : 5,
              backgroundColor: item.bg,
              transition: 'all 0.35s ease',
              bottom: 0,
              left: 0
            }} />
            <div style={{
              position: 'relative',
              zIndex: 2,
              color: value == item.id ? '#fff' : '#000',
              transition: 'all 0.35s ease'
            }}>
              {item.name}
            </div>
          </Grid>
        ))}
        </Grid>
      </Grid>
    </Grid>
  )
}