import Breadcrumb from '../../components/Breadcrumb';
import DataListLearners from '../../components/DataListLearners';

const ListUsers = () => {
  return (
    <>
      <Breadcrumb pageName="Participants / Inscrits" />

      <div className="flex flex-col gap-10">        
        <DataListLearners />
      </div>
    </>
  );
};

export default ListUsers;
