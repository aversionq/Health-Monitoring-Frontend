import MedicalHeader from '../medical-components/MedicalHeader';
import MedicalParameters from '../medical-components/MedicalParameters';
import MedicalChart from '../medical-components/MedicalChart';
import userApi from '../user-api';
import { useEffect, useState } from 'react';

function MedicalInfo() {
  return (
    <div class="maininfo flex sm:basis-full basis-7/12 flex-col pt-16 pl-14 2xl:pt-10 2xl:pl-8">
      <MedicalHeader />
      <MedicalParameters />
      <MedicalChart />
    </div>
  );
}
export default MedicalInfo;
