import Head from "next/head";
import Image from "next/image";
import Nav from "../components/Nav";
import styles from "../styles/Home.module.css";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { abi } from "../constants/abi";
import { sabi } from "../constants/stakingabi";
import { kabi } from "../constants/kabi";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Web3Provider } from '@ethersproject/providers';
import dynamic from "next/dynamic";
import Link from "next/link";
import { useToasts } from 'react-toast-notifications'
import { ToastContainer, toast } from 'react-toastify';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Circles from "../components/Circles";
import Infopanel from "../components/Infopanel";
import p2eInterface from "../components/P2eInterface";
import regulators from '../public/regulators.png';



// const {} = dynamic(import("tw-elements"), { ssr: false });

export const injected = new InjectedConnector({ supportedChainIds: [25]});

export default function Home() {
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("foo");
    }, 28000);
  });

  const [hasMetamask, setHasMetamask] = useState(false);
  const [amountToStake, setAmountToStake] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [isNFTApproved, setNFTIsApproved] = useState(false);
  const [userAccounts, setUserAccounts] = useState([]);
  const [userNFTtokenIds, setuserNFTtokenIds] = useState([]);
  const [userValuesLoading, setUserValuesLoading] = useState(false);
  const [raffleIsLive, setRaffleIsLive] = useState(true);
  const [toolTip, setOpenToolTip] = useState(false);
  const [welcome, setWelcome] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [about, setAbout] = useState(false);
  const [demoFantasy, setDemoFantasy] = useState(false);
  const [appFantasy, setAppDemo] = useState(false);
  const [signup, setSignup] = useState(false);

  const Web3 = require('web3');
  const web3 = new Web3('https://evm.cronos.org');

  const { addToast } = useToasts()




  var stats = [];
  var userstats = [];

  var Eth = require('web3-eth');

// "Eth.providers.givenProvider" will be set if in an Ethereum supported browser. set to cronos testnet
var eth = new Eth(Eth.givenProvider || 'https://evm.cronos.org');

const gasPrice = eth.getGasPrice()

var o = 0;
    var z  = 0;
    var p = 0;
    var q = 0;
    var r = 0;
    var s = 0;
    var profile = '';
    var se = 0;
    
  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if(localStorage?.getItem('isWalletConnected') === 'true'){
        try {
          await activate(injected)
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          localStorage.setItem('isWalletConnected', true)
        .then(document.getElementById("walletAddy").innerHTML = (accounts[0]).slice(-6))
        } catch (ex) {
          console.log(ex)
        }
      }
    }
    connectWalletOnPageLoad();
    const addListeners = async () => {
      if(localStorage?.getItem('isWalletConnected') === 'true'){}
    }
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  }, []);

  const {
    active,
    activate,
    chainId,
    account,
    deactivate, 
    library: provider,
  } = useWeb3React();

 

  async function connect() {
 
    
    if (typeof window.ethereum !== "undefined") {
      try {
        setUserValuesLoading(true);
       const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
       await activate(injected);
       setHasMetamask(true);
       setUserAccounts(accounts);
     
       myPromise
       .then(setUserValuesLoading(false))
       .then(document.getElementById("playerAddress").innerHTML = (accounts[0]))
       
        
      } catch (e) {
        console.log(e);
        if(e){
          try{initValues()}
          catch (e){
            console.log(e);
          }
        }
      }
    }
  }

  async function loadValues() {
 
    
    if (typeof window.ethereum !== "undefined") {
      try {
        setUserValuesLoading(true);
       const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
       setHasMetamask(true);
       setUserAccounts(accounts)
     
       myPromise
       .then(setUserValuesLoading(false))


        
      } catch (e) {
        console.log(e);
        initValues();
      }
    }
  }


  async function openToolTip(){
    if(!toolTip)
    {
        setOpenToolTip(true);
    }else{setOpenToolTip(false)}
}

  async function initValues(){
    try {
      loadValues();
    } catch (error) {
      console.log(error);
    }
    
  }
  async function disconnect() 
  {
      try {
        deactivate();
        localStorage.setItem('isWalletConnected', false)
      } catch (error) {
        console.log(error);
      }
  }
async function viewAbout(){
  if(!about){
    setWelcome(false);
    setDemoFantasy(false);
    setAbout(true);
  }
}
async function viewDemo(){
  if(!demoFantasy){
    setWelcome(false);
    setDemoFantasy(true);
    setAbout(false);
  }
}
async function viewWelcome(){
  if(!welcome){
    setWelcome(true);
    setDemoFantasy(false);
    setAbout(false);
  }
}
  return (
    <div>
     
      <Head>
        <title>E Warrior</title>
        <meta name="description" content="E Warrior" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"
          rel="stylesheet"
        />
        <meta property="og:title" content="E Warrior" />
		<meta property="og:description" content="E Warrior" />
		<meta property="og:image" content="https://cronoballz.com/wp-content/uploads/2022/12/cbzd.png" />
      </Head>
      <nav className={styles.nav_grid}>
        <img id="logoImage" src="https://nflregulators.com/wp-content/uploads/2023/05/RegulatorsTextFinalTransparent.png" />
     <a
            className={styles.connect_button} 
          >
 
        {active?  <button className={styles.button} id="connectbutton" onClick={()=> disconnect()}>LOG OUT</button>:<button className={styles.button} id="connectbutton" onClick={()=> connect()}>LOGIN</button>} 
      </a>
          <div id="navInfo">
            <Infopanel />
          </div>
      </nav>
      {active ? (
        userValuesLoading ? (<div id="loadingSequence" className={styles.loading}></div>
        ) : (''
        )
      ) : (
        ""
      )}
      <div id="screen4"></div>
      <div style={{width:'500px',height:'900px',display:'block',margin:'auto',display:'flex',backgroundColor:'#282828'}}>
        <div style={{width:'100%', height:'auto',marginTop:'25%',backgroundImage:'url(https://nflregulators.com/wp-content/uploads/2023/05/RegulatorsFinalTranparent-1.png)',backgroundPosition:'center',backgroundSize:'contain',backgroundRepeat:'no-repeat'}}>
          <div id="interface">
            {active ?<>
             <div className={styles.p2esection} id="upperSection">
              <div className={styles.containerPadding}></div>
              <div id="infoContainer">
                <div id="infoLeftContainer">
                  <p className={styles.playerBalInfo}>NEXT CLAIM :<a> DATE</a></p>
                </div>
                <div id="infoRightContainer">
                  <p className={styles.playerBalInfo}>CBZ BALANCE : <a>0</a></p>
                </div>
              </div>
              <div className={styles.containerPadding}></div>
              </div> 
             <div className={styles.p2esection}>
              <div id="newsInfo">
               {active? <p id="playerAddress">address</p>:<p>PLEASE LOG IN</p>}
              </div>
              </div> 
             <div className={styles.p2esection}><button id="rewardsbutton" style={{backgroundImage:'url(https://nflregulators.com/wp-content/uploads/2023/06/base.png)'}}>REWARDS</button></div> 
             <div className={styles.p2esection}>
              <div id="messageOfDayContainer">
                <p id="messageOfDay">THIS IS THE MESSAGE OF THE DAY</p>
              </div>
              </div> 
             <div className={styles.p2esection}>
              <div id="redeemContainer">
              <button id="redeembutton">REDEEM</button></div>
              <div id="contactContainer">
              <p id="emailAddress">regulators@cronoballz.com
                <a id="phoneNumber">(904) 894 - 7276</a>
              </p>
              </div>
              </div> 
            </>:<><p id="welcomeTitle" >PRACTICE TO EARN</p>
          
            <div id="mediaSection">
              <div id="video">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/NXrM7sTxJvk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
            
            </div>
            
            <p id="aboutp2e">Earn $CBZ token by showing up to practice, competitions, and by volunteering at community events.</p>
            <div id="contactContainerNonActive">
              <p id="emailAddress">regulators@cronoballz.com
                <a id="phoneNumber">(904) 894 - 7276</a>
              </p>
              </div></>}
          </div>
        </div>
      </div>
      

        <footer></footer>
    </div>

  );
}
