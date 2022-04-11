import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { Container, createTheme, LinearProgress, TableHead, Table, TableCell, TableContainer, TableRow, TextField, ThemeProvider, Typography, TableBody } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import { makeStyles } from "@material-ui/core";
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
      if(!search) {
         return coins
      } else {
         return coins.filter((coin) => {
               return coin.name.toLowerCase().includes(search)
                     || coin.symbol.toLowerCase().includes(search)
         });
      }
   };

   const handleInput = (e) => {
      setSearch(e.target.value);
   }

   const useStyles = makeStyles((theme)=> ({
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
      tableTitle: {
         [theme.breakpoints.down('sm')]: {
            fontSize: 25,
         },
         [theme.breakpoints.down('xs')]: {
            margin: '10 0',
            fontSize: 17,
         },
      },
      table: {
         padding: '20px 20px',
         [theme.breakpoints.down('xs')]: {
            padding: '5px 10px'
         },
      },
      tableTH: {
         [theme.breakpoints.down('xs')]: {
            padding: 10,
         },
      }
   }))

   const classes = useStyles();

   return(
      <ThemeProvider theme={darkTheme}>
         <Container stye={{textAlign: 'center'}}>
            <Typography
               className={classes.tableTitle}
               variant="h4"
               style={{margin: '18px 0px', fontFamily: 'Mulish', textAlign: 'center'}}
            >
               Cryptocurrency Prices by Market Cap
            </Typography>
            <TextField 
               label='Search For a Crypto Currency' 
               variant="outlined"
               style={{marginBottom: 20, width: '100%'}}
               onChange={handleInput}
               />
            <TableContainer>
               {
                  loading ? (
                     <LinearProgress style={{background: '#36E6FC'}}></LinearProgress>
                  ) : (
                     <Table>
                        <TableHead 
                           style={{background: '#36E6FC'}}
                           >
                           <TableRow>
                              {['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
                                 <TableCell
                                    className={classes.table}
                                    style={{
                                       color: 'black',
                                       fontWeight: '700',
                                       fontFamily: 'Mulish',
                                    }}
                                    key={head}
                                    align={head === 'Coin' ? 'left' : 'right'}
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
                                    className={classes.tableTH}
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