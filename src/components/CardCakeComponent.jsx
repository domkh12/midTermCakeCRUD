import {Button, Card} from "flowbite-react";
import {useGetCakeQuery} from "../redux/feature/cake/cakeApiSlice.js";
import {MdModeEdit} from "react-icons/md";
import {FaTrash} from "react-icons/fa";
import {
    setIdCakeToDelete,
    setIdCakeToEdit,
    setIsOpenDeleteCake,
    setIsOpenEditCake
} from "../redux/feature/cake/cakeSlice.js";
import {useDispatch} from "react-redux";

export function CardCakeComponent({cakeId}) {
    const dispatch = useDispatch();

    const { cake } = useGetCakeQuery("cakeList", {
        selectFromResult: ({ data }) => ({
            cake: data?.entities[cakeId]
        }),
    })

    return (
        <Card
            className="w-full relative group"
        >
            <div className="h-[260px] w-full overflow-hidden">
                <img
                    src={cake?.picture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe9-khZD-6EgeVCr1D9gjtypbQOO9EnrbJrQ&s"}
                    alt={cake?.name}
                    className="h-full w-full object-cover"
                />
            </div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {cake?.name || "Unknown"}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                {cake?.other || "Unknown"}
            </p>

            <div className="group-hover:flex gap-2 absolute bottom-2 right-2 hidden">
                <Button pill onClick={() => {
                    dispatch(setIsOpenEditCake(true))
                    dispatch(setIdCakeToEdit(cakeId))
                }}>
                    <MdModeEdit className="w-5 h-5" />
                </Button>
                <Button pill color="red" onClick={() => {
                    dispatch(setIsOpenDeleteCake(true))
                    dispatch(setIdCakeToDelete(cakeId))
                }}>
                    <FaTrash className="w-5 h-5"/>
                </Button>
            </div>
        </Card>
    );
}