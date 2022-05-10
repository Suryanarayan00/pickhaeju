import React from 'react'
import MakeProfileAge from './age';
import MakeProfileSpec from './spec';
import MakeProfileDown from './down';
import MakeProfileHaving from './having';
import { useRoute } from '@react-navigation/native';

const MakeProfile = () => {
  const [form, setForm] = React.useState({});
  const [step, setStep] = React.useState(0);
  const {params} = useRoute();

  const path = params?.path
  console.log({path})


  const View = () => {
    switch (step) {
      case 0: return <MakeProfileAge setStep={setStep} setForm={setForm} path={path}/>
      case 1: return <MakeProfileSpec setStep={setStep} setForm={setForm} path={path}/>
      case 2: return <MakeProfileDown setStep={setStep} setForm={setForm} path={path}/>
      case 3: return <MakeProfileHaving setStep={setStep} setForm={setForm} form={form} path={path}/>
    }
  }


  return (
    <>
      {View()}
    </>
  )
}

export default MakeProfile;