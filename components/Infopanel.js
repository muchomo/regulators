
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
    
    //{strTime} {dateString}
 
  return (

 
      <a style={{color:'#fff',height:'50px',display:'block'}}>
        <div id="dc">
        <img id="dscord" src="discord.png" /></div>
        <div id="fbi">
        <img id="fbook" src="fb.png" /></div>
        <div id="tri">
        <img id="trr" src="twitter.png" /></div>
        <div id="insi">
        <img id="instag" src="inst.png" /></div>
        <div id="twi">
        <img id="twic" src="twitch.png" /></div>
      </a>
        
  );
}
