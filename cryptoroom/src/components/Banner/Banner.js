import React, { useState } from "react";
import {capitalize, Container, FormHelperText, makeStyles, Typography} from '@material-ui/core';
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
   banner: {
      backgroundImage: 'url(https://xakep.ru/wp-content/uploads/2017/08/135083/mesh-networks_0.jpg)',
      // backgroundImage: 'url(https://psv4.userapi.com/c532036/u136200800/docs/d19/b7a9b9f07512/e35h9b4.png?extra=Y6Z5ngHfQbr8eQnQrUfQBZEveDrUWF4D05bWJvSz8zFR0rrcUo6BKkpxUTSyR7SELMJIW6y8ZJ62Jpy53K3Iw03ENtIKgEYP8aYKCz5OYH33WJzvqkbCmj6DYZ7JDDJy9-BQRSlOoc23mdHdaMeri5fcZA)',
      // backgroundImage: 'url(https://oir.mobi/uploads/posts/2021-03/1616525615_5-p-temno-sinii-fon-5.jpg)',
      // backgroundImage: 'url(https://oir.mobi/uploads/posts/2021-03/1616564085_5-p-fon-dlya-yutub-kanala-6.jpg)',

      backgroundSize: 'cover',
      backgroundPosition: 'center',
   },
   bannerContent: {
      height: 400,
      display: 'flex',
      flexDirection: "column",
      paddingTop: 25,
      justifyContent: "space-around",
   },
   tagLine: {
      display: "flex",
      height: '40%',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
   }
}));



export default function Banner() {
   const classes = useStyles();
   return(
      <div className={classes.banner}>
         <Container className={classes.bannerContent}>
            <div className={classes.tagLine}>
               <Typography
                  variant='h2'
                  style={{
                     fontWeight: 'bold',
                     marginBottom: 15,
                     fontFamily: 'Nova Mono'
                  }}>
                     CRYPTOROOM
               </Typography>
               <Typography
                  variant='subtitle2'
                  style={{
                     color: 'dark-grey',
                     fontWeight: 'bold',
                     textTransform: "capitalize",
                     fontFamily: 'Mulish',
                  }}>
                     Найдите всю интересующую вас информацию о предпочитаемой криптовалюте
               </Typography>
            </div>
            <Carousel/>
         </Container>
      </div>
   )
}