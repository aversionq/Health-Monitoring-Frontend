import DataTableBody from './DataTableBody';
import DataTableHeader from './DataTableHeader';

function DataTableComponent() {
  return (
    <div class="maininfo__fulldata flex flex-col">
      <DataTableHeader />
      <DataTableBody />
    </div>
  );
}

export default DataTableComponent;
