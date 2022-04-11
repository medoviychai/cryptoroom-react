import React, { useState } from "react";
import {capitalize, Container, FormHelperText, makeStyles, Typography} from '@material-ui/core';
import Carousel from "./Carousel";

const useStyles = makeStyles((theme) => ({
   banner: {
      backgroundImage: 'url(https://xakep.ru/wp-content/uploads/2017/08/135083/mesh-networks_0.jpg)',
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
   },
   bannerTitle: {
      [theme.breakpoints.down('sm')]: {
         fontSize: 50,
      },
   }
}));

export default function Banner() {
   const classes = useStyles();
   return(
      <div className={classes.banner}>
         <Container className={classes.bannerContent}>
            <div className={classes.tagLine}>
               <Typography
                  className={classes.bannerTitle}
                  variant='h2'
                  style={{
                     fontWeight: 'bold',
                     marginBottom: 15,
                     fontFamily: 'Nova Mono',
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
                     Get All The Info Regarding Your Favorite Crypto Currency
               </Typography>
            </div>
            <Carousel/>
         </Container>
      </div>
   )
}