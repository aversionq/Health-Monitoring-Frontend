function MedicalEntity(props) {
  return (
    <div class="maininfo__currdata__bloodsugar flex flex-col rounded-xl p-4 bg-white shadow-lg flex-1">
      <div class="maininfo__currdata__bloodsugar__header sm:flex-col flex items-center">
        <div
          class="maininfo__currdata__bloodsugar__header-logo p-6 sm:p-2 2xl:p-4 rounded-xl bg-[#F8DEBD]"
          style={{ backgroundColor: props.entityColor }}>
          <img
            class="object-contain h-14 w-10 sm:h-9 sm:w-7 2xl:h-9 2xl:w-7"
            src={props.entityImage}
            alt="blood sugar icon"></img>
        </div>
        <div class="maininfo__currdata__bloodsugar__header-title sm:pl-0 sm:pt-4 pl-4 font-semibold text-2xl 2xl:text-lg">
          {props.title}
        </div>
      </div>
      <div class="maininfo__currdata__bloodsugar__data flex flex-col">
        <div class="maininfo__currdata__bloodsugar__data-number text-xl 2xl:text-base pt-6 2xl:pt-3">
          80 mg/dl
        </div>
        <div class="maininfo__currdata__bloodsugar__data-time text-xl 2xl:text-base pb-4 2xl:pb-2">
          {props.latestValue.date}
        </div>
        <div
          class="maininfo__currdata__bloodsugar__data-state rounded-lg self-center text-xl 2xl:text-base p-4 2xl:p-2 bg-[#F8DEBD]"
          style={{ backgroundColor: props.entityColor }}>
          Normal
        </div>
      </div>
    </div>
  );
}

export default MedicalEntity;
