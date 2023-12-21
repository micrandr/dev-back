import Breadcrumb from '../../components/Breadcrumb';
import DataViewUserSkill from '../../components/DataViewSkill';

const ViewUserSkill = () => {
    return (
        <>
            <Breadcrumb pageName="Fiche compétence" />

            <div className="flex flex-col gap-10">        
                <DataViewUserSkill />
            </div>
        </>

    )
}

export default ViewUserSkill;