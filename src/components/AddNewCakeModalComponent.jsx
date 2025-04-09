import {
    Button,
    FileInput,
    Label,
    Modal,
    ModalBody,
    ModalHeader, Spinner,
    TextInput, Toast, ToastToggle
} from "flowbite-react";
import {useDispatch, useSelector} from "react-redux";
import {setIsOpenAddNew} from "../redux/feature/cake/cakeSlice.js";
import {Form, Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import {useAddNewCakeMutation} from "../redux/feature/cake/cakeApiSlice.js";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import {Slide, toast} from "react-toastify";

export function AddNewCakeModalComponent() {
    const openModal = useSelector((state) => state.cake.isOpenAddNew);
    const dispatch = useDispatch();
    const [base64Image, setBase64Image] = useState(null);

// Convert file to base64
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64Image(reader.result); // base64 string
        };
        reader.readAsDataURL(selectedFile);
    };

    const [addNewCake, {isSuccess, isLoading, isError, error}] = useAddNewCakeMutation()

    useEffect(() => {
        if (isSuccess){
            dispatch(setIsOpenAddNew(false));
            toast.success('ការបន្ថែមជោគជ័យ', {
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

    function onCloseModal() {
        dispatch(setIsOpenAddNew(false));
    }

    const initialValues = {
        cakeName: "",
        description: "",
    };

    const validationSchema = Yup.object({
        cakeName: Yup.string().required("ឈ្មោះនំ ត្រូវការបញ្ចូល"),
        description: Yup.string().required("ផ្សេងៗ ត្រូវការបញ្ចូល"),
    });

    const handleSubmit = async (values, {resetForm}) => {
        const formData = new FormData();
        formData.append("cakeName", values.cakeName);
        formData.append("description", values.description);

        await addNewCake({
            name: values.cakeName,
            other: values.description,
            picture: base64Image
        })
        resetForm();
        dispatch(setIsOpenAddNew(false));
    };

    return (
        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
            <ModalHeader/>
            <ModalBody>
                <div className="space-y-6">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">បំពេញព័ត៌មាន</h3>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className="space-y-4">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="cakeName">ឈ្មោះនំ</Label>
                                </div>
                                <Field
                                    as={TextInput}
                                    id="cakeName"
                                    name="cakeName"
                                    required
                                />
                                <ErrorMessage name="cakeName" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="description">ផ្សេងៗ</Label>
                                </div>
                                <Field
                                    as={TextInput}
                                    id="description"
                                    name="description"
                                    required
                                />
                                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>

                            <div>
                                <Label htmlFor="file-upload">រូបភាព</Label>
                                <FileInput
                                    id="file-upload"
                                    onChange={handleFileChange}
                                />
                            </div>

                            <div className="w-full flex justify-end">
                                <Button type="submit">
                                    {isLoading && <Spinner size="sm" aria-label="Info spinner example" className="me-3" light />}
                                    បន្ថែម</Button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </ModalBody>
        </Modal>
    );
}
