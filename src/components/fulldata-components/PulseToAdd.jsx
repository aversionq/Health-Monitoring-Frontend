import { useDispatch } from 'react-redux';
import { fetchUserNewPulse } from '../../redux/slices/newdata';
import { fetchUserPulse, fetchUserSortedPagedPulse } from '../../redux/slices/heartrate';
import { useForm } from 'react-hook-form';

function PulseToAdd(props) {
  const disptach = useDispatch();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      pulse: '',
      date: '',
    },
  });

  const onAddPulseSubmit = async (values) => {
    const response = await disptach(fetchUserNewPulse(values));
    disptach(fetchUserSortedPagedPulse({ page: 1, sortType: 'DateDesc' }));
    reset();
  };

  return (
    <div class="maininfo__add-cells-sugar">
      <div class="maininfo__currdata__bloodsugar__header sm:flex-col flex items-center">
        <div
          class="maininfo__currdata__bloodsugar__header-logo p-6 sm:p-2 2xl:p-4 rounded-xl bg-[#F8DEBD]"
          style={{ backgroundColor: props.entityColor }}>
          <img
            class="object-contain h-14 w-10 sm:h-9 sm:w-7 2xl:h-9 2xl:w-7"
            src={props.entityImage}
            alt="blood sugar icon"
          />
        </div>
        <div class="maininfo__currdata__bloodsugar__header-title sm:pl-0 sm:pt-4 pl-4 font-semibold text-2xl 2xl:text-lg">
          {props.title}
        </div>
      </div>
      <div class="maininfo__currdata__bloodsugar__data flex flex-col">
        <form className="flex flex-col" onSubmit={handleSubmit(onAddPulseSubmit)}>
          <div class="maininfo__currdata__bloodsugar__data-number flex flex-col text-xl 2xl:text-base pt-6 2xl:pt-3 pb-3">
            <input
              className="inline-block border-black border basis-1/2"
              type="number"
              {...register('pulse')}
              required></input>
            <input className="pt-2" type="datetime-local" {...register('date')} required></input>
          </div>
          <div
            class="maininfo__currdata__bloodsugar__data-state rounded-lg self-center text-xl 2xl:text-base p-2 2xl:p-2 bg-[#F8DEBD]"
            style={{ backgroundColor: props.entityColor }}>
            <input type="submit" value="Отправить"></input>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PulseToAdd;
