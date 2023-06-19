import { useForm } from 'react-hook-form';
import axios from 'axios';

function AnalysisBody() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      highBp: '',
      highChol: '',
      bmi: '',
      stroke: '',
      heartDiseaseAttack: '',
      genHlth: '',
      physHlth: '',
      diffWalk: '',
      age: '',
    },
  });

  const onAnalysisSubmit = async (values) => {
    const response = await axios.post(
      `http://localhost:8000/diabeticsPrediction?highBp=${values.highBp}&highChol=${values.highChol}&bmi=${values.bmi}&stroke=${values.stroke}&heartDiseaseAttack=${values.heartDiseaseAttack}&genHlth=${values.genHlth}&physHlth=${values.physHlth}&diffWalk=${values.diffWalk}&age=${values.age}`,
    );
    if (response.data === 0) {
      alert(
        'Вероятнее всего, у вас сейчас нет сахарного диабета.\n\nТочность модели предсказания равна 84%.\n\nДля более детального анализа обратитесь за консультацией с доктором, это, кстати, можно сделать на этом сайте.',
      );
    } else {
      alert(
        'Вероятнее всего, вам сейчас угрожает сахарный диабет.\n\nТочность модели предсказания равна 84%.\n\nДля более детального анализа обратитесь за консультацией с доктором, это, кстати, можно сделать на этом сайте.',
      );
    }
  };

  return (
    <div class="stngs flex sm:basis-full flex-1 flex-col pt-16 pl-14 2xl:pt-10 2xl:pl-8">
      <div class="stngs-title self-center text-3xl font-bold p-8 pb-24">Предсказание диабета</div>
      <form class="flex flex-col" onSubmit={handleSubmit(onAnalysisSubmit)}>
        <div class="stngs__inputs flex justify-around">
          <div class="stngs__inputs-personal">
            <div class="stngs__inputs-personal-forms flex flex-col">
              <div class="stngs__inputs-personal-forms-name text-right pb-20">
                <label class="float-left text-xl" for="">
                  Повышенное давление:
                </label>
                <input
                  class="inline-block border border-black ml-2 w-48"
                  type="number"
                  {...register('highBp')}
                  required
                  max={1}
                  min={0}
                  placeholder="0 - нет, 1 - да"></input>
              </div>
              <div class="stngs__inputs-personal-forms-surname text-right pb-20">
                <label class="float-left text-xl" for="">
                  Повышенный холестерин:
                </label>
                <input
                  class="inline-block border border-black ml-2 w-48"
                  type="number"
                  {...register('highChol')}
                  required
                  placeholder="0 - нет, 1 - да"
                  min={0}
                  max={1}></input>
              </div>
              <div class="stngs__inputs-personal-forms-surname text-right">
                <label class="float-right text-xl" for="">
                  BMI:
                </label>
                <input
                  class="inline-block border border-black ml-2"
                  type="number"
                  step={0.1}
                  {...register('bmi')}
                  required
                  placeholder="индекс массы тела"
                  min={0}></input>
              </div>
            </div>
          </div>
          <div class="stngs__inputs-metrics">
            <div class="stngs__inputs-personal-forms flex flex-col">
              <div class="stngs__inputs-personal-forms-name text-right pb-20">
                <label class="float-left text-xl" for="">
                  Был ли инсульт:
                </label>
                <input
                  class="inline-block border border-black ml-2 w-48"
                  type="number"
                  {...register('stroke')}
                  required
                  placeholder="0 - нет, 1 - да"
                  min={0}
                  max={1}></input>
              </div>
              <div class="stngs__inputs-personal-forms-surname text-right pb-20">
                <label class="float-left text-xl" for="">
                  Болезни сердца:
                </label>
                <input
                  class="inline-block border border-black ml-2 w-48"
                  type="number"
                  {...register('heartDiseaseAttack')}
                  required
                  placeholder="0 - нет, 1 - да"
                  min={0}
                  max={1}></input>
              </div>
              <div class="stngs__inputs-personal-forms-surname text-right pb-20">
                <label class="float-left text-xl" for="">
                  Состояние здоровья:
                </label>
                <input
                  class="inline-block border border-black ml-2 w-48"
                  type="number"
                  {...register('genHlth')}
                  required
                  placeholder="оценка от 1 до 5"
                  min={1}
                  max={5}></input>
              </div>
            </div>
          </div>
          <div class="stngs__inputs-account">
            <div class="stngs__inputs-personal-forms flex flex-col">
              <div class="stngs__inputs-personal-forms-name text-right pb-20">
                <label class="float-left text-xl" for="">
                  Физическое здоровье:
                </label>
                <input
                  class="inline-block border border-black ml-2 w-48"
                  type="number"
                  {...register('physHlth')}
                  required
                  placeholder="от 0 до 30"
                  min={0}
                  max={30}></input>
              </div>
              <div class="stngs__inputs-personal-forms-surname text-right pb-20">
                <label class="float-left text-xl" for="">
                  Сложности при ходьбе:
                </label>
                <input
                  class="inline-block border border-black ml-2 w-48"
                  type="number"
                  {...register('diffWalk')}
                  required
                  placeholder="0 - нет, 1 - да"
                  min={0}
                  max={1}></input>
              </div>
              <div class="stngs__inputs-personal-forms-surname text-right">
                <label class="float-left text-xl" for="">
                  Возраст:
                </label>
                <input
                  class="inline-block border border-black ml-2"
                  type="number"
                  {...register('age')}
                  required
                  placeholder="возраст человека"
                  min={0}></input>
              </div>
            </div>
          </div>
        </div>
        <div class="stngs__inputs-btn self-center">
          <button
            class="inline-block border border-black py-4 px-10 rounded-xl text-xl font-semibold"
            type="submit">
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
}

export default AnalysisBody;
