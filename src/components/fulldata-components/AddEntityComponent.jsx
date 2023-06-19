import AddEntityBody from './AddEntityBody';
import AddEntityHeader from './AddEntityHeader';

function AddEntityComponent() {
  return (
    <div class="maininfo__add flex flex-col">
      <AddEntityHeader />
      <AddEntityBody />
    </div>
  );
}

export default AddEntityComponent;
