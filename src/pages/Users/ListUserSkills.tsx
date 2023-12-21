import Breadcrumb from '../../components/Breadcrumb';
import DataListUserSkills from '../../components/DataListUserSkills';

const ListUserSkills = () => {
  return (
    <>
      <Breadcrumb pageName="Compétences" />

      <div className="flex flex-col gap-10">        
        <DataListUserSkills />
      </div>
    </>
  );
};

export default ListUserSkills;
