import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { abi } from "../constants/abi";
import {p2eabi} from "../constants/p2eabi";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useToasts } from 'react-toast-notifications'
import Infopanel from "../components/Infopanel";




// const {} = dynamic(import("tw-elements"), { ssr: false });

export const injected = new InjectedConnector({ supportedChainIds: [25,338]});

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
  const [playerActive, setPlayerActive] = useState(false);
  const [coachActive, setCoachActive] = useState(false);
  const [managerActive, setManagerActive] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [contractOwner, setContractOwner] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const Web3 = require('web3');
  const web3 = new Web3('https://evm-t3.cronos.org');

  const { addToast } = useToasts()
//cronos testnet p2e contract address
const p2e = "0x9d310c0dfa531efe7c357353b88ad9bc7355a6cc";
const R1 = new web3.eth.Contract(p2eabi, p2e);

  //cronos testnetwork cbz contract address
  const tokencontractAddress='0xe871e7874d5d50db39955b728c6a74be3701163a';
 //initialize new contract for test cbz
 const CBZTOKENContract = new web3.eth.Contract(abi, tokencontractAddress);



  var stats = [];
  var userstats = [];

  var Eth = require('web3-eth');

// "Eth.providers.givenProvider" will be set if in an Ethereum supported browser. set to cronos testnet
var eth = new Eth(Eth.givenProvider || 'https://evm-t3.cronos.org');

const gasPrice = eth.getGasPrice()

var o = 0;
    var z  = 0;
    var p = 0;
    var q = '';
    var i = false;
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

    if (playerActive && !coachActive && !managerActive){
      handlePlayerActive();
    }
    if (!playerActive && coachActive && !managerActive){
      handleCoachActive();
    }
   
    if(!playerActive && !coachActive && managerActive){
      handleManagerActive();
    }
    if(!playerActive && !coachActive && !managerActive && isNewUser){
      handleIsNewUser();
    }
    const addListeners = async () => {
      if(localStorage?.getItem('isWalletConnected') === 'true'){}
    }
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
    if(isConnected){
      handleGetRole();
    }
    if(contractOwner==userAccounts[0]){
      setManagerActive(true);
      console.log(managerActive,contractOwner,userAccounts[0]);
    }
  }, [playerActive,coachActive,managerActive,contractOwner,isNewUser,isConnected]);

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
  
        await R1.methods.checkPendingRewards.call((err, result) => {
          z = result;
        });
        await R1.methods.isCoach(accounts[0]).call((err, result) => {
          i = result;
        });
        setCoachActive(i);
        await R1.methods.playerProfile(accounts[0]).call((err, result) => {
          p = result[0];
        });
        setPlayerActive(p);
  
        // Update the contractOwner with the result
        await R1.methods.owner.call((err, result) => {
          q = result;
          setContractOwner(result); // Update contractOwner here
          console.log(result);
          if (q === accounts[0]) {
            setManagerActive(true);
            console.log(result);

          }
        });
  
        if (!i && !p && !managerActive) {
          setIsNewUser(true);
        }
  
        await CBZTOKENContract.methods.balanceOf(accounts[0]).call((err, result) => {
          o = result / 1000000000000000000;
        });
        setTokenBalance(o);
  
        myPromise
          .then(setUserValuesLoading(false))
          .then(document.getElementById("playerRewardsDue").innerHTML = z)
          .then(document.getElementById("playerTokenBalance").innerHTML = o)
          .then(console.log(i, p, q, isNewUser, managerActive,accounts[0],contractOwner))
          .then(document.getElementById("playerAddress").innerHTML = accounts[0]);
      } catch (e) {
        console.log(e);
        if (e) {
          try {
            initValues();
          } catch (e) {
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

async function handleGetRole(){
  if (active){
    try{
      await R1.methods.checkPendingRewards.call((err, result)=>{z = result });
      await R1.methods.isCoach(userAccounts[0]).call((err, result)=>{i = result });
      setCoachActive(i);
      await R1.methods.playerProfile(userAccounts[0]).call((err, result)=>{p = result[0] });
      setPlayerActive(p);
      await R1.methods.owner.call((err, result)=>{q = result;if(q = userAccounts[0]){
        setManagerActive(true);
      } });
      setContractOwner(q);
      if(!i&&!p&&!managerActive){
        setIsNewUser(true);
      }
      await CBZTOKENContract.methods.balanceOf(userAccounts[0]).call((err, result)=>{o = result / 1000000000000000000});
      setTokenBalance(o);
      myPromise
      .then(document.getElementById("playerRewardsDue").innerHTML = z)
      .then(document.getElementById("playerTokenBalance").innerHTML = o)
      .then(console.log(i, p, managerActive, isNewUser))
    }catch(e){
      console.log(e);
    }
  }
}
async function handleIsNewUser(){
  if(active && isNewUser){
    setCoachActive(false);
    setManagerActive(false);
    setPlayerActive(false);
  }
}
async function handlePlayerActive(){
  if(playerActive){
    setCoachActive(false);
    setManagerActive(false);
  }
}
async function handleCoachActive(){
  if(coachActive){
    setPlayerActive(false);
    setManagerActive(false);
  }
}
async function handleManagerActive(){
  if(!managerActive){
    setCoachActive(false);
    setPlayerActive(false);
    setManagerActive(true);
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

   //claim rewards on 30 day contract
   async function claimRewards() {
    if (active) {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(p2e, p2eabi, signer);
      setUserValuesLoading(true);
      try {
       const claimHash = await contract.redeem();
       await claimHash.wait();
       myPromise
       .then(addToast('TX: '+ claimHash.hash, {
        appearance: 'success'
       }))
       
        setUserValuesLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Rewards claim no works.");
      alert(error.message);
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
        <title>Practice to Earn</title>
        <meta name="description" content="Cronoballz Regulators Practice to Earn" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"
          rel="stylesheet"
        />
        <meta property="og:title" content="Regulators Practice to Earn" />
		<meta property="og:description" content="Regulators Practice to Earn Claim Dapp" />
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
                  <p className={styles.playerBalInfo}>REWARDS DUE :</p>
                  <p className={styles.playerBalInfo} id="playerRewardsDue">NA</p>
                </div>
                <div id="infoRightContainer">
                  <p className={styles.playerBalInfo}>CBZ BALANCE :</p>
                  <p className={styles.playerBalInfo} id="playerTokenBalance">0</p>
                </div>
              </div>
              <div className={styles.containerPadding}></div>
              </div> 
             <div className={styles.p2esection} style={{height:'10%'}}>
              <div id="newsInfo">
               {active? <p id="playerAddress">address</p>:<p>PLEASE LOG IN</p>}
              </div>
              </div> 
             <div className={styles.p2esection}style={{height:'40%'}}>
              <img src="regulators.png" id="playerHolder" />
              </div> 
           
             <div className={styles.p2esection}>
              <div id="redeemContainer">
              <button id="redeembutton" onClick={claimRewards}> REDEEM</button></div>
              <div id="contactContainer">
              <p id="emailAddress">regulators@cronoballz.com
                <a id="phoneNumber">(904) 894 - 7276</a>
              </p>
              </div>
              </div> 
              <div className={styles.p2esection} style={{height:'10%'}}>
              <div id="messageOfDayContainer">
                <p id="messageOfDay">THIS IS THE MESSAGE OF THE DAY</p>
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
