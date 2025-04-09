import {NavbarComponent} from "../components/NavbarComponent.jsx";
import {useGetCakeQuery} from "../redux/feature/cake/cakeApiSlice.js";
import {CardCakeComponent} from "../components/CardCakeComponent.jsx";
import {SkeletonCardComponent} from "../components/SkeletonCardComponent.jsx";
import {EditCakeModalComponent} from "../components/EditCakeModalComponent.jsx";
import {useSelector} from "react-redux";
import {DeleteConfirmComponent} from "../components/DeleteConfirmComponent.jsx";

function Home() {
    const openModalEdit = useSelector((state) => state.cake.isOpenEditCake);
    const openModalDelete = useSelector((state) => state.cake.isOpenDeleteCake);
    const {data: cakeData, isSuccess, isLoading} = useGetCakeQuery("cakeList", {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    console.log("isFetching",isFetching)

    let content;

    if (isLoading) {
        content = (
            <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 px-4">
                <SkeletonCardComponent/>
                <SkeletonCardComponent/>
                <SkeletonCardComponent/>
                <SkeletonCardComponent/>
                <SkeletonCardComponent/>
                <SkeletonCardComponent/>
                <SkeletonCardComponent/>
                <SkeletonCardComponent/>
                <SkeletonCardComponent/>
                <SkeletonCardComponent/>
                <SkeletonCardComponent/>
                <SkeletonCardComponent/>
            </div>
        );
    }

    if (isSuccess) {
        const {ids} = cakeData;

        const card = ids.length
            ? ids.map(id => <CardCakeComponent key={id} cakeId={id}/>)
            : null;

        content = (
            <div
                className="dark:bg-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 px-4">
                {card}
                {openModalEdit && <EditCakeModalComponent/>}
                {openModalDelete && <DeleteConfirmComponent/>}
            </div>
        );
    }

    return content;
}

export default Home;