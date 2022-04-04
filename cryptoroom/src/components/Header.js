import React from "react";
import { AppBar, Container, Toolbar, Typography, Select, MenuItem, makeStyles, createTheme, ThemeProvider } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles(() => ({
   title: {
      flex: 1,
      color: '#36E6FC',
      fontFamily: 'Nova Mono',
      fontWeight: 'bold',
      cursor: 'pointer',
   }
}))

export default function Header() {
   const classes = useStyles();
   const navigate = useNavigate();

   const {currency, setCurrency} = CryptoState()

   const darkTheme = createTheme({
      palette: {
         primary: {
            main: '#fff',
         },
         type: 'dark',
      }
   })

   return(
      <ThemeProvider theme={darkTheme}>
         <AppBar color='transparent' position='static'>
            <Container>
               <Toolbar>
                  <Typography onClick={() => navigate('/')} className={classes.title} variant='h6'>
                     CRYPTOROOM
                  </Typography>
                  <Select variant='outlined' style={{
                     width: 100,
                     height: 40,
                     marginRight: 15,
                  }}
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  >
                     <MenuItem value={'USD'}>USD</MenuItem>
                     <MenuItem value={'RUB'}>RUB</MenuItem>
                  </Select>
               </Toolbar>
            </Container>
         </AppBar>
      </ThemeProvider>
   )
}