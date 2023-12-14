import Breadcrumb from '../../components/Breadcrumb';
import DataTypeList from '../../components/DataTypeList';

const TypeList = () => {
    return (
        <>

        <Breadcrumb pageName="Type d'entreprise" />

        <div className="flex flex-col gap-10">        
            <DataTypeList />
        </div>
        </>

    )
}
export default TypeList;