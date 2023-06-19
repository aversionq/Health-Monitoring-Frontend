import bloodSugarImage from '../../images/blood_sugar_icon.png';
import heartRateImage from '../../images/heart_rate_icon.png';
import pressureImage from '../../images/blood_pressure_icon.png';
import SugarToAdd from './SugarToAdd';
import PulseToAdd from './PulseToAdd';
import PressureToAdd from './PressureToAdd';

function AddEntityBody() {
  return (
    <div class="maininfo__add-cells flex justify-evenly pt-8">
      <SugarToAdd title="Сахар в крови" entityImage={bloodSugarImage} entityColor="#F8DEBD" />
      <PulseToAdd title="Пульс" entityImage={heartRateImage} entityColor="#FBF0F3" />
      <PressureToAdd title="Давление" entityImage={pressureImage} entityColor="#D0FBFF" />
    </div>
  );
}

export default AddEntityBody;
