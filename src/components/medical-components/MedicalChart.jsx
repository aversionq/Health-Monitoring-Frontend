import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  fetchUserPressure,
  fetchUserTimeIntervalPressure,
  selectAllUserPressure,
  selectUserTimeIntervalPressure,
} from '../../redux/slices/pressure';
import {
  fetchUserTimeIntervalPulse,
  selectUserTimeIntervalPulse,
} from '../../redux/slices/heartrate';
import { fetchUserTimeIntervalSugar, selectUserTimeIntervalSugar } from '../../redux/slices/sugar';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function MedicalChart() {
  const defaulBeginDate = new Date();
  const offset = defaulBeginDate.getTimezoneOffset();
  defaulBeginDate.setHours(defaulBeginDate.getHours() - offset / 60);
  defaulBeginDate.setMonth(defaulBeginDate.getMonth() - 1);

  const defaultEndDate = new Date();
  defaultEndDate.setHours(defaultEndDate.getHours() - offset / 60);
  const [category, setCategory] = useState('pressure');
  const [beginDate, setBeginDate] = useState(defaulBeginDate.toISOString());
  const [endDate, setEndDate] = useState(defaultEndDate.toISOString());

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      if (category === 'pressure') {
        dispatch(fetchUserTimeIntervalPressure({ beginDate, endDate }));
      } else if (category === 'pulse') {
        dispatch(fetchUserTimeIntervalPulse({ beginDate, endDate }));
      } else {
        dispatch(fetchUserTimeIntervalSugar({ beginDate, endDate }));
      }
    }
    fetchData();
  }, [category, beginDate, endDate, dispatch]);

  const medicalData = useSelector(
    category === 'pressure'
      ? selectUserTimeIntervalPressure
      : category === 'pulse'
      ? selectUserTimeIntervalPulse
      : selectUserTimeIntervalSugar,
  );

  const handleCategoryChange = async (e) => {
    setCategory(e.target.value);
  };

  const handleBeginDateChange = async (e) => {
    setBeginDate(e.target.value);
  };

  const handleEndDateChange = async (e) => {
    setEndDate(e.target.value);
  };

  const buildChartData = () => {
    if (category === 'pressure') {
      const pressureChartData = {
        labels: medicalData.map((data) => new Date(data?.date).toLocaleDateString()),
        datasets: [
          {
            label: 'Верхнее',
            data: medicalData.map((data) => data.systolic),
            borderColor: 'rgb(0, 230, 0)',
            backgroundColor: 'rgba(26, 255, 26, 0.5)',
          },
          {
            label: 'Нижнее',
            data: medicalData.map((data) => data.diastolic),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
      return pressureChartData;
    } else if (category === 'pulse') {
      const pulseChartData = {
        labels: medicalData.map((data) => new Date(data?.date).toLocaleDateString()),
        datasets: [
          {
            label: 'Пульс',
            data: medicalData.map((data) => data.pulse),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
      return pulseChartData;
    } else {
      const sugarChartData = {
        labels: medicalData.map((data) => new Date(data?.date).toLocaleDateString()),
        datasets: [
          {
            label: 'Сахар в крови',
            data: medicalData.map((data) => data.sugarValue),
            borderColor: 'rgb(230, 138, 0)',
            backgroundColor: 'rgba(255, 194, 102, 0.5)',
          },
        ],
      };
      return sugarChartData;
    }
  };

  const chartData = buildChartData();

  return (
    <div class="maininfo__chart flex flex-col bg-white p-7 2xl:p-4 rounded-lg">
      <div class="maininfo__chart__title flex justify-between items-center">
        <div class="maininfo__chart__title-datatitle font-bold text-3xl 2xl:text-xl">
          График измерений
        </div>
        <div className="maininfo__chart__title-choose flex items-center gap-4">
          <div className="maininfo__chart__title-metrics">
            <select className="border border-black" onChange={handleCategoryChange}>
              <option value="pressure">Давление</option>
              <option value="sugar">Сахар</option>
              <option value="pulse">Пульс</option>
            </select>
          </div>
          <div class="maininfo__chart__title-timeinterval">
            <div class="maininfo__chart__title-timeinterval-start pb-2">
              <label class="font-semibold text-xl 2xl:text-base">От:</label>
              <input
                class="border-black border rounded-lg"
                type="date"
                name="interval-start"
                id="calendar-start"
                min="2020-01-01"
                onChange={handleBeginDateChange}
                defaultValue={beginDate.split('T')[0]}></input>
            </div>
            <div class="maininfo__chart__title-timeinterval-end">
              <label class="font-semibold text-xl 2xl:text-base">До:</label>
              <input
                class="border-black border rounded-lg"
                type="date"
                name="interval-end"
                id="calendar-end"
                onChange={handleEndDateChange}
                defaultValue={endDate.split('T')[0]}></input>
            </div>
          </div>
        </div>
      </div>
      <div class="maininfo__chart__datachart flex-1 pt-2">
        <div class="maininfo__chart__datachart-chart h-72 2xl:h-60">
          <Line options={{ maintainAspectRatio: false }} data={chartData} />
        </div>
      </div>
    </div>
  );
}

export default MedicalChart;
