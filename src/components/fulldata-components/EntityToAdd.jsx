function EntityToAdd(props) {
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
        <div class="maininfo__currdata__bloodsugar__data-number flex text-xl 2xl:text-base pt-6 2xl:pt-3 pb-3">
          <form className="flex flex-col">
            {props.title === 'Pressure' ? (
              <div>
                <input
                  className="inline-block border-black border basis-1/2 w-24"
                  type="text"
                  name=""
                  id=""
                />
                <input
                  className="inline-block border-black border basis-1/2 w-24"
                  type="text"
                  name=""
                  id=""></input>
              </div>
            ) : (
              <input
                className="inline-block border-black border basis-1/2"
                type="text"
                name=""
                id=""></input>
            )}
            <input className="pt-2" type="datetime-local"></input>
          </form>
        </div>
        <div
          class="maininfo__currdata__bloodsugar__data-state rounded-lg self-center text-xl 2xl:text-base p-2 2xl:p-2 bg-[#F8DEBD]"
          style={{ backgroundColor: props.entityColor }}>
          <input type="button" value="Отправить"></input>
        </div>
      </div>
    </div>
  );
}
export default EntityToAdd;
