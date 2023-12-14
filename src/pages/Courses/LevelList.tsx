import Breadcrumb from '../../components/Breadcrumb';
import DataLevelList from '../../components/DataLevelList';

const LevelList = () => {
    return (
        <>

        <Breadcrumb pageName="Niveau" />

        <div className="flex flex-col gap-10">        
            <DataLevelList />
        </div>
        </>

    )
}
export default LevelList;