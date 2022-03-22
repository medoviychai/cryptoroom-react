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

export default function CoinInfo({coin}) {

   const [historicalData, setHistoricalData] = useState();
   const [days, setDays] = useState(1);

   const { currency } = CryptoState();

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
         [theme.breakpoints.down('md')]: {
            width: '100%',
            marginTop: 0,
            padding: 20,
            paddingTop: 0,
         },
      },
      containerChart: {
         width: '100%',
      }
   }))

   const classes = useStyles();

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
                           
                              return days === 1 ? time: date.toLocaleDateString()                           
                           }),

                           datasets:[{
                              data: historicalData.map((coin) => coin[1]),
                              label: `Цена (Последние ${days} Дней в ${currency})`,
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
                        style={{
                           display: 'flex',
                           marginTop: 20,
                           justifyContent: 'space-around',
                           width: '100%',
                        }}
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
                  </div>)
            }

         </div>
      </ThemeProvider>
   )
}