import Breadcrumb from '../../components/Breadcrumb';
import DataCreateUserSkills from '../../components/DataCreateUserSkills';

const createUserSkills = () => {
    return (
        <>
            <Breadcrumb pageName="Création nouveau formateur" />

            <div className="flex flex-col gap-10">        
                <DataCreateUserSkills />
            </div>
        </>

    )
}

export default createUserSkills;