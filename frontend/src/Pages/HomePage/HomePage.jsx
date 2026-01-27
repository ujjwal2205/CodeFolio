import React,{useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import Header from '../../Components/Header/Header.jsx';
import HowItWorks from '../../Components/howItWorks/howItWorks.jsx';
import WhyCodeFolio from '../../Components/WhyCodeFolio/WhyCodeFolio.jsx';
import LeaderBoardPreview from '../../Components/LeaderBoardPreview/LeaderBoardPreview.jsx';
function HomePage({login,setLogin}) {
  const location=useLocation();
  useEffect(()=>{
    if(location.hash){
      const id=location.hash.replace('#','');
      const el=document.getElementById(id);
      if(el){
        setTimeout(()=>{
          el.scrollIntoView({behavior:'smooth'});
        },100);
      }
    }
  },[location]);
  return (
    <div>
      <Header/>
      <HowItWorks/>
      <WhyCodeFolio/>
      <LeaderBoardPreview/>
    </div>
  )
}

export default HomePage
