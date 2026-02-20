import React,{useEffect} from 'react'
import {useLocation,useNavigate} from 'react-router-dom';
import Header from '../../Components/Header/Header.jsx';
import HowItWorks from '../../Components/HowItWorks/HowItWorks.jsx';
import WhyCodeFolio from '../../Components/WhyCodeFolio/WhyCodeFolio.jsx';
import LeaderBoardPreview from '../../Components/LeaderBoardPreview/LeaderBoardPreview.jsx';
import { toast } from 'react-toastify';
function HomePage() {
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
      <Header/>
      <HowItWorks/>
      <WhyCodeFolio/>
      <LeaderBoardPreview />
    </div>
  )
}

export default HomePage
