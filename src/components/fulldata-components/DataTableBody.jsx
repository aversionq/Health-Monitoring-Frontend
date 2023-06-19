import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserSortedPagedSugar,
  fetchUserSugar,
  selectAllUserSugar,
  selectUserSortedPagedSugar,
} from '../../redux/slices/sugar';
import {
  fetchUserPulse,
  fetchUserSortedPagedPulse,
  selectAllUserPulse,
  selectUserSortedPagedPulse,
} from '../../redux/slices/heartrate';
import {
  fetchUserPressure,
  fetchUserSortedPagedPressure,
  selectAllUserPressure,
  selectUserSortedPagedPressure,
} from '../../redux/slices/pressure';

function DataTableBody() {
  const [category, setCategory] = useState('sugar');
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState('DateDesc');
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    setCategory(e.target.value);
    setPage(1);
    setSortType('DateDesc');
  };

  const onPreviousPage = () => {
    setPage(page - 1);
  };

  const onNextPage = () => {
    setPage(page + 1);
  };

  const onChangeSugarSort = () => {
    sortType === 'SugarDesc'
      ? setSortType('SugarAsc')
      : sortType === 'SugarAsc'
      ? setSortType('SugarDesc')
      : setSortType('SugarDesc');
  };

  const onChangePulseSort = () => {
    sortType === 'PulseDesc'
      ? setSortType('PulseAsc')
      : sortType === 'PulseAsc'
      ? setSortType('PulseDesc')
      : setSortType('PulseDesc');
  };

  const onChangeDateSort = () => {
    sortType === 'DateDesc'
      ? setSortType('DateAsc')
      : sortType === 'DateDesc'
      ? setSortType('DateAsc')
      : setSortType('DateDesc');
  };

  const onChangeSystolicSort = () => {
    sortType === 'SystolicDesc'
      ? setSortType('SystolicAsc')
      : sortType === 'SystolicAsc'
      ? setSortType('SystolicDesc')
      : setSortType('SystolicDesc');
  };

  const onChangeDiastolicSort = () => {
    sortType === 'DiastolicDesc'
      ? setSortType('DiastolicAsc')
      : sortType === 'DiastolicAsc'
      ? setSortType('DiastolicDesc')
      : setSortType('DiastolicDesc');
  };

  useEffect(() => {
    async function fetchData() {
      if (category === 'sugar') {
        await dispatch(fetchUserSortedPagedSugar({ page, sortType }));
      } else if (category === 'pulse') {
        await dispatch(fetchUserSortedPagedPulse({ page, sortType }));
      } else {
        await dispatch(fetchUserSortedPagedPressure({ page, sortType }));
      }
    }
    fetchData();
  }, [category, page, sortType, dispatch]);

  const tableData = useSelector(
    category === 'sugar'
      ? selectUserSortedPagedSugar
      : category === 'pulse'
      ? selectUserSortedPagedPulse
      : selectUserSortedPagedPressure,
  );

  const tableRows =
    category === 'sugar'
      ? tableData.map((data) => {
          return (
            <tr>
              <td>{data.sugarValue}</td>
              <td>{new Date(data.date)?.toLocaleString()}</td>
            </tr>
          );
        })
      : category === 'pulse'
      ? tableData.map((data) => {
          return (
            <tr>
              <td>{data.pulse}</td>
              <td>{new Date(data.date)?.toLocaleString()}</td>
            </tr>
          );
        })
      : tableData.map((data) => {
          return (
            <tr>
              <td>{data.systolic}</td>
              <td>{data.diastolic}</td>
              <td>{new Date(data.date)?.toLocaleString()}</td>
            </tr>
          );
        });

  return (
    <div class="maininfo__fulldata__data flex flex-col">
      <div class="maininfo__fulldata__data-select self-center pb-4">
        <select value={category} onChange={handleChange} className="border border-black">
          <option value="sugar">Сахар в крови</option>
          <option value="pulse">Пульс</option>
          <option value="pressure">Давление</option>
        </select>
      </div>
      <div class="maininfo__fulldata__data-table self-center p-4 mb-2">
        <table class="border-separate border border-slate-500 border-spacing-2">
          <thead>
            {category === 'sugar' ? (
              <tr>
                <th class="border border-slate-600" onClick={() => onChangeSugarSort()}>
                  Сахар в крови
                </th>
                <th class="border border-slate-600" onClick={() => onChangeDateSort()}>
                  Дата
                </th>
              </tr>
            ) : category === 'pulse' ? (
              <tr>
                <th class="border border-slate-600" onClick={() => onChangePulseSort()}>
                  Пульс
                </th>
                <th class="border border-slate-600" onClick={() => onChangeDateSort()}>
                  Дата
                </th>
              </tr>
            ) : (
              <tr>
                <th class="border border-slate-600" onClick={() => onChangeSystolicSort()}>
                  Верхнее
                </th>
                <th class="border border-slate-600" onClick={() => onChangeDiastolicSort()}>
                  Нижнее
                </th>
                <th class="border border-slate-600" onClick={() => onChangeDateSort()}>
                  Дата
                </th>
              </tr>
            )}
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
      <div class="maininfo__fulldata__data-pagination self-center pb-4">
        <a
          href="#"
          onClick={() => onPreviousPage()}
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Назад
        </a>

        <a
          href="#"
          onClick={() => onNextPage()}
          class="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Вперёд
        </a>
      </div>
    </div>
  );
}

export default DataTableBody;
