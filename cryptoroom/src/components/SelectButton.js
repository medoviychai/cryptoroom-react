import { makeStyles } from "@material-ui/core";
import React from "react"; 

export default function SelectButton({children, selected, onClick}) {

   const useStyles = makeStyles({
      selectButton: {
         border: '1px solid #36E6FC',
         borderRadius: 5,
         padding: 10,
         paddingLeft: 20,
         paddingRight: 20,
         cursor: 'pointer',
         backgroundColor: selected ? '#36E6FC' : '',
         color: selected ? 'black' : '',
         fontWeight: selected ? 700 : 500,
         '&:hover': {
            backgroundColor: '#36E6FC',
            color: 'black',
         },
      }
   });

   const classes = useStyles();

   return(
      <span
         onClick={onClick}
         className={classes.selectButton}
      >
         {children}
      </span>
   )
}