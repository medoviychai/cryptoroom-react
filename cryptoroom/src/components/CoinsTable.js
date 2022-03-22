import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { Container, createTheme, LinearProgress, TableHead, Table, TableCell, TableContainer, TableRow, TextField, ThemeProvider, Typography, TableBody } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import { makeStyles } from "@material-ui/styles";
import { numberWithCommas } from "./Banner/Carousel";
import { Pagination } from "@material-ui/lab";

export default function CoinsTable() {

   const [coins, setCoins] = useState([]);
   const [loading, setLoading] = useState(false);
   const [search, setSearch] = useState();
   const [page, setPage] = useState(1);

   const navigate = useNavigate();

   const {currency, symbol} = CryptoState();

   const fetchCoins = async () => {

      setLoading(true);

      const {data} = await axios.get(CoinList(currency));
      
      setCoins(data);
      setLoading(false);
   }

   // console.log(coins);

   useEffect(() => {
      fetchCoins()
   }, [currency])

   const darkTheme = createTheme({
      palette: {
         primary: {
            main: '#fff',
         },
         type: 'dark',
      }
   })

   const handleSearch = () => {
      console.log(search);
      if(!search) {
         return coins
      } else {
         console.log(search);
         return coins.filter((coin) => {
                  return coin.name.toLowerCase().includes(search)
                        || coin.symbol.toLowerCase().includes(search)
         });
      }
   };

   const handleInput = (e) => {
      setSearch(e.target.value);
   }

   const useStyles = makeStyles(()=> ({
      row: {
         backgroundColor: '#16171a',
         cursor: 'pointer',
         '&:hover': {
            backgroundColor: '#131111',
         },
         fontFamily: 'Mulish',
      },
      pagination: {
         '& .MuiPaginationItem-root': {
            color: '#36E6FC',
         },
      },
   }))

   const classes = useStyles();

   return(
      <ThemeProvider theme={darkTheme}>
         <Container stye={{textAlign: 'center'}}>
            <Typography
               variant="h4"
               style={{margin: 18, fontFamily: 'Mulish', textAlign: 'center'}}
            >
               Криптовалюта по рыночной капитализации
            </Typography>
            <TextField 
               label='Найти криптовалюту' 
               variant="outlined"
               style={{marginBottom: 20, width: '100%'}}
               // onChange={(e) => setSearch(e.target.value)}
               onChange={handleInput}
               />
            <TableContainer>
               {
                  loading ? (
                     <LinearProgress style={{background: '#36E6FC'}}></LinearProgress>
                  ) : (
                     <Table>
                        <TableHead style={{background: '#36E6FC'}}>
                           <TableRow>
                              {['Криптовалюта', 'Цена', 'Изменение за 24ч', 'Рыночная капитализация'].map((head) => (
                                 <TableCell
                                    style={{
                                       color: 'black',
                                       fontWeight: '700',
                                       fontFamily: 'Mulish',
                                    }}
                                    key={head}
                                    align={head === 'Криптовалюта' ? '' : 'right'}
                                    >
                                       {head}
                                 </TableCell>
                              ))}
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {handleSearch()
                           .slice((page - 1 ) * 10, (page -1) * 10 + 10)
                           .map((row) => {
                              const profit = row.price_change_percentage_24h > 0;

                              return (
                                 <TableRow
                                    onClick={() => navigate(`/coins/${row.id}`)}
                                    key={row.name}
                                    className={classes.row}
                                 >
                                    <TableCell 
                                       component='th' 
                                       scope='row'
                                       style={{
                                          display: 'flex',
                                          gap: 15,
                                       }}   
                                    >
                                       <img 
                                          src={row?.image}
                                          alt={row.name}
                                          height='50'
                                          style={{marginBottom: 10}}
                                       ></img>
                                       <div
                                          style={{
                                             display: 'flex',
                                             flexDirection: 'column',
                                          }}
                                       >
                                          <span
                                             style={{
                                                textTransforn: 'uppercase',
                                                fontSize: 22,
                                             }}
                                          >
                                             {row.symbol}
                                          </span>
                                          <span style={{color: 'darkgrey'}}>{row.name}</span>
                                       </div>
                                    </TableCell>
                                    <TableCell align="right">
                                       {symbol}{""}
                                       {numberWithCommas(row.current_price.toFixed(2))}
                                    </TableCell>
                                    <TableCell
                                       align="right"
                                       style={{
                                          color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                                          fontWeight: 500,
                                       }}
                                    >
                                       {profit && '+'}
                                       {row.price_change_percentage_24h.toFixed(2)}%
                                    </TableCell>
                                    <TableCell align="right">
                                       {symbol}{""}
                                       {numberWithCommas(row.market_cap.toString().slice(0, -6))}
                                       M
                                    </TableCell>
                                 </TableRow>
                              );
                           })}
                        </TableBody>
                     </Table>
                  )
               }
            </TableContainer>
            <Pagination
               style={{
                  padding: 20,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
               }}
               classes={{ul: classes.pagination}}
               count={(handleSearch()?.length / 10).toFixed(0)}   
               onChange={(_, value) => {
                  setPage(value);
                  window.scroll(0, 450);
               }}
            >
               
            </Pagination>
         </Container>
      </ThemeProvider>
   )
}