import React, { useEffect, useState } from "react";
import { CircularProgress, makeStyles, ThemeProvider } from "@material-ui/core";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import { createTheme } from "@material-ui/core";
import {Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart }            from 'react-chartjs-2';
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";
import { numberWithCommas } from "../components/Banner/Carousel";

export default function CoinInfo({coin}) {

   const [historicalData, setHistoricalData] = useState();
   const [days, setDays] = useState(1);

   const { currency, symbol } = CryptoState();

   const fetchHistoricalData = async () => {
      const {data} = await axios.get(HistoricalChart(coin.id, days, currency));

      setHistoricalData(data.prices);
   }

   const useStyles = makeStyles((theme) => ({
      container: {
         width: '75%',
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center',
         marginTop: 25,
         padding: 40,
         [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginTop: 0,
            padding: 10,
            paddingTop: 0,
         },
      },
      containerChart: {
         width: '100%',
      },
      buttonWrap: {
         display: 'flex',
         marginTop: 20,
         marginBottom: 30,
         justifyContent: 'space-around',
         width: '100%',
         [theme.breakpoints.down('xs')]: {
            marginBottom: 20,
         },
      },
      forecast: {
         border: '1px solid #36E6FC',
         borderRadius: 5,
         padding: 10,
         width: 'fit-content',
         margin: 'auto',
         [theme.breakpoints.down('xs')]: {
            padding: '5px 10px',
            fontSize: 13,
            width: '100%',
            textAlign: 'center',
            margin: 0,
         },
      }
   }))

   const classes = useStyles();

   const getLastPrices = () => {
      let arrPrices = [];
      
      historicalData.map((coin) => {
         arrPrices.push(coin[1]);
      })
      let last = arrPrices.pop();
      let preLast = arrPrices.pop();

      let y = (last - preLast) + preLast + (last - preLast);

      if (y > last) {
         return `${numberWithCommas(y.toFixed(2))} ↗`
      } else if (y < last) {
         return `${numberWithCommas(y.toFixed(2))} ↘`
      } else {
         return `${numberWithCommas(y.toFixed(2))}`
      }
   }

   useEffect(() => {
      fetchHistoricalData();
   }, [currency, days])

   const darkTheme = createTheme({
      palette: {
         primary: {
            main: '#fff',
         },
         type: 'dark',
      }
   })

   return (
      <ThemeProvider theme={darkTheme}>
         <div className={classes.container}>
            {
               !historicalData ? (
                  <CircularProgress
                     style={{color: '#36E6FC'}}
                     size={250}
                     thickness={1}
                  />
               ) : (
                  <div className={classes.containerChart}>
                     <Line
                        data={{
                           labels: historicalData.map((coin) => {
                              let date = new Date(coin[0]);
                              let time = `${date.getHours()}:${date.getMinutes()}`;
                           
                              return days === 1 ? time : date.toLocaleDateString()                           
                           }),

                           datasets:[{
                              data: historicalData.map((coin) => coin[1]),
                              label: `Price (Past ${days} Days in ${currency})`,
                              borderColor: '#36E6FC'
                           }],
                        }}
                        options={{
                           elements: {
                              point: {
                                 radius: 1,
                              },
                           }
                        }}
                     />
                     <div
                        className={classes.buttonWrap}
                     >
                        {chartDays.map((day) => (
                           <SelectButton
                              key={day.value}
                              onClick={()=> setDays(day.value)}
                              selected={day.value === days}
                           >
                              {day.label}
                           </SelectButton>
                        ))}
                     </div>
                     <p 
                        className={classes.forecast}
                     >{`Projected Price: ${symbol} ${getLastPrices()}`} 
                     </p>
               </div>)
            }
         </div>
      </ThemeProvider>
   )
}