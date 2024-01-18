import Breadcrumb from '../../components/Breadcrumb';
import DataEditUserSkills from '../../components/DataEditUserSkills';

const EditUserSkills = () => {
    return (
        <>
            <Breadcrumb pageName="Editer une compétence" />

            <div className="flex flex-col gap-10">        
                <DataEditUserSkills />
            </div>
        </>

    )
}

export default EditUserSkills;