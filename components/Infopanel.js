
import styles from "../styles/Home.module.css";

import { useState, useEffect } from "react";



export default function Infopanel() {

    let date = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let dateString = date.toLocaleDateString('en-US', options);
    
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    
    
 
  return (

 
      <a style={{color:'#fff'}}>{strTime} {dateString}</a>
        
  );
}
