import {Button, Modal, ModalBody, ModalHeader, Spinner} from "flowbite-react";
import {useEffect, useState} from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {useDispatch, useSelector} from "react-redux";
import {setIsOpenDeleteCake, setIsOpenEditCake} from "../redux/feature/cake/cakeSlice.js";
import {useDeleteCakeMutation} from "../redux/feature/cake/cakeApiSlice.js";
import {Slide, toast} from "react-toastify";

export function DeleteConfirmComponent() {
    const dispatch = useDispatch();
    const openModal = useSelector((state) => state.cake.isOpenDeleteCake);
    const id = useSelector((state) => state.cake.idCakeToDelete);
    console.log(id)
    const [deleteCake, {isSuccess, isLoading}] = useDeleteCakeMutation();

    useEffect(() => {
        if (isSuccess){
            dispatch(setIsOpenDeleteCake(false));
            toast.success('ការលុបជោគជ័យ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
    }, [isSuccess]);

    const handleDelete = async () => {
        await deleteCake({
            id
        })
    }

    return (
        <>
            <Modal show={openModal} size="md" onClose={() => dispatch(setIsOpenDeleteCake(false))} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            តើអ្នកចង់លុបនំនេះឬ?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDelete} className="text-red-600">
                                {isLoading && <Spinner size="sm" aria-label="Info spinner example" className="me-3" light />}
                                បាទ ខ្ញុំចង់
                            </Button>
                            <Button color="gray" onClick={() => dispatch(setIsOpenDeleteCake(false))}>
                                ទេ បោះបង់
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}
