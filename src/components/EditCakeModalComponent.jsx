import {
    Button,
    FileInput,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    TextInput
} from "flowbite-react";
import {useDispatch, useSelector} from "react-redux";
import {setIsOpenAddNew, setIsOpenEditCake} from "../redux/feature/cake/cakeSlice.js";
import {Form, Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import {useEditCakeMutation, useGetCakeQuery} from "../redux/feature/cake/cakeApiSlice.js";
import {Slide, toast} from "react-toastify";

export function EditCakeModalComponent() {
    const openModal = useSelector((state) => state.cake.isOpenEditCake);
    const dispatch = useDispatch();

    const cakeId = useSelector((state) => state.cake.idCakeToEdit);

    const { cake } = useGetCakeQuery("cakeList", {
        selectFromResult: ({ data }) => ({
            cake: data?.entities[cakeId]
        }),
    })

    const [base64Image, setBase64Image] = useState(null);

    useEffect(() => {
        if (cake?.picture) {
            setBase64Image(cake.picture);
        }
    }, [cake]);


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64Image(reader.result); // base64 string
        };
        reader.readAsDataURL(selectedFile);
    };

    const [editCake, {isSuccess, isLoading, isError, error}] = useEditCakeMutation()

    useEffect(() => {
        if (isSuccess){
            dispatch(setIsOpenEditCake(false));
            toast.success('កែប្រែជោគជ័យ', {
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
        dispatch(setIsOpenEditCake(false));
    }

    const initialValues = {
        cakeName: cake?.name,
        description: cake?.other,
    };

    const validationSchema = Yup.object({
        cakeName: Yup.string().required("ឈ្មោះនំ ត្រូវការបញ្ចូល"),
        description: Yup.string().required("ផ្សេងៗ ត្រូវការបញ្ចូល"),
    });

    const handleSubmit = async (values, {resetForm}) => {
        const formData = new FormData();
        formData.append("cakeName", values.cakeName);
        formData.append("description", values.description);

        await editCake({
            id: cake.id,
            name: values.cakeName,
            other: values.description,
            picture: base64Image
        })
        resetForm();
        setBase64Image(null);
        dispatch(setIsOpenAddNew(false));
    };

    return (
        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
            <ModalHeader/>
            <ModalBody>
                <div className="space-y-6">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">កែប្រែព័ត៌មាន</h3>
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
                                <Button type="submit">ផ្លាស់ប្ដូរ</Button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </ModalBody>
        </Modal>
    );
}
