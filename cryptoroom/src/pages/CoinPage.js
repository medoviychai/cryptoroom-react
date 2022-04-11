import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import CoinInfo from "../components/CoinInfo";
import ReactHtmlParser from 'react-html-parser';
import { numberWithCommas } from "../components/Banner/Carousel";

export default function CoinPage() {

   const {id} = useParams();
   const [coin, setCoin] = useState();

   const {currency, symbol} = CryptoState();

   const fetchCoin = async () => {
      const {data} = await axios.get(SingleCoin(id));

      setCoin(data);
   }

   useEffect(() => {
      fetchCoin();
   }, []);

   const useStyles = makeStyles((theme) => ({
      container: {
         display: 'flex',
         [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
         },
      },
      sidebar: {
         width: '30%',
         [theme.breakpoints.down('sm')]: {
            width: '100%',
         },
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         marginTop: 25,
         borderRight: '2px solid grey',
      },
      heading: {
         fontWeight: 'bold',
         marginBottom: 15,
         fontFamily: 'Mulish',
         [theme.breakpoints.down('xs')]: {
            marginBottom: 5,
            fontSize: 15,
         },
      },
      headingCoinName: {
         fontWeight: 'bold',
         marginBottom: 15,
         fontFamily: 'Mulish',
         [theme.breakpoints.down('xs')]: {
            marginBottom: 5,
            fontSize: 30,
         },
      },
      value: {
         [theme.breakpoints.down('xs')]: {
            fontSize: 15,
         },
      },
      description: {
         width: '100%',
         fontFamily: 'Mulish',
         padding: 25,
         paddingBottom: 15,
         paddingTop: 0,
         textAlign: 'justify',
      },
      marketData: {
         alignSelf: 'start',
         padding: 25,
         paddingTop: 10,
         width: '100%',
         [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'center',
         },
         [theme.breakpoints.down('xs')]: {
            alignItems: 'start',
         },
      }
   }))

   const classes = useStyles();

   if (!coin) return <LinearProgress style={{backgroundColor: '#36E6FC'}}></LinearProgress>

   return (
      <div className={classes.container}>
         <div className={classes.sidebar}>
            <img 
               src={coin?.image.large}
               alt={coin?.name}
               height='180'
               style={{marginBottom: 20}}
            />
            <Typography
               variant='h3'
               className={classes.headingCoinName}
            >
               {coin?.name}
            </Typography>
            <Typography
               variant='subtitle1'
               className={classes.description}
            >
               {ReactHtmlParser(coin?.description.en.split('. ')[0])}.
            </Typography>
            <div className={classes.marketData}>
               <span style={{display: 'flex'}}>
                  <Typography variant="h6" className={classes.heading}>
                     Rank:
                  </Typography>
                  &nbsp; &nbsp;
                  <Typography variant="h6" className={classes.value} style={{fontFamily: 'Mulish'}}>
                     {coin?.market_cap_rank}
                  </Typography>
               </span>
               <span style={{display: 'flex'}}>
                  <Typography variant="h6" className={classes.heading}>
                     Current Price:
                  </Typography>
                  &nbsp; &nbsp;
                  <Typography variant="h5" className={classes.value} style={{fontFamily: 'Mulish'}}>
                     {symbol}{" "}
                     {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
                  </Typography>
               </span>
               <span style={{display: 'flex'}}>
                  <Typography variant="h6" className={classes.heading}>
                     Market Cap:
                  </Typography>
                  &nbsp; &nbsp;
                  <Typography variant="h6" className={classes.value} style={{fontFamily: 'Mulish'}}>
                  {symbol}{" "}
                  {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()]
                     .toString()
                     .slice(0, -6)
                  )}M
                  </Typography>
               </span>
            </div>
         </div>
         <CoinInfo coin={coin} />
      </div>
   )
}