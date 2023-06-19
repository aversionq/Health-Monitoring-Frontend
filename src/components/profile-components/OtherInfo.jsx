import Bmi from '../other-info-components/Bmi';
import SuggestedOptions from '../other-info-components/SuggestedOptions';
import userApi from '../user-api';
import { useEffect, useState } from 'react';

function OtherInfo() {
  return (
    <div class="analysisinfo flex-col flex-1 pt-10 pl-8">
      <Bmi />
      <SuggestedOptions />
    </div>
  );
}

export default OtherInfo;
