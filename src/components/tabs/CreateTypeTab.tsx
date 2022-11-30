import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { defaultPostTypesValues, defaultPostTypeValues, PostType, PostTypes } from "../../types/PostType";
import useLocalStorage from "../../hooks/useLocalStorage";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required(),
    color: yup.string().required()
}).required();

export default function CreateTypeTab() {
    const formMethods = useForm<PostType>({ defaultValues: defaultPostTypeValues, resolver: yupResolver(schema) });
    const [posttypes, setPostTypes] = useLocalStorage<PostTypes>("posttypes", defaultPostTypesValues);

    const onSubmit: SubmitHandler<PostType> = async (data) => {
        console.log(data)
        data["id"] = posttypes["lastAddedId"] + 1;
        let newPostTypes: PostTypes = {
            "lastAddedId": posttypes["lastAddedId"] + 1,
            "posttypes": posttypes["posttypes"].concat(data)
        }
        setPostTypes(newPostTypes);
        formMethods.reset();
    };
    
    return (
        <Box sx={{ width: '60%', margin: 'auto' }}>
            <FormProvider  {...formMethods}>
                <Stack spacing={2}>
                    <TextField {...formMethods.register("name")} label="Post type name" variant="outlined" />
                    <TextField {...formMethods.register("color")} label="Color" variant="outlined" type="color"/>
                    <Button variant="contained" onClick={formMethods.handleSubmit(onSubmit)}>Create Post Type</Button>
                </Stack>
            </FormProvider>
        </Box>
    )
}