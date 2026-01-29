import React,{useEffect} from 'react'
import {useLocation,useNavigate} from 'react-router-dom';
import Header from '../../Components/Header/Header.jsx';
import HowItWorks from '../../Components/howItWorks/howItWorks.jsx';
import WhyCodeFolio from '../../Components/WhyCodeFolio/WhyCodeFolio.jsx';
import LeaderBoardPreview from '../../Components/LeaderBoardPreview/LeaderBoardPreview.jsx';
import { toast } from 'react-toastify';
function HomePage({login}) {
  const location=useLocation();
  const navigate=useNavigate();
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
  useEffect(()=>{
    if(location.state?.toastMessage){
      toast.success(location.state.toastMessage);
      navigate(location.pathname,{replace:true,state:{}})
    }
  },[location,navigate]);
  return (
    <div>
      <Header login={login}/>
      <HowItWorks/>
      <WhyCodeFolio/>
      <LeaderBoardPreview login={login}/>
    </div>
  )
}

export default HomePage
