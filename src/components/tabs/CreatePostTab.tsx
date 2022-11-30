import { useForm, SubmitHandler, Controller, FormProvider, set } from "react-hook-form";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Button, Chip, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { defaultPostValues, Post } from '../../types/Post';
import useLocalStorage from "../../hooks/useLocalStorage";
import { PostTypes, defaultPostTypesValues, PostType } from "../../types/PostType";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import React from "react";

const schema = yup.object().shape({
    event_name: yup.string().required(),
    short_desc: yup.string().required(),
    long_desc: yup.string().required(),
    post_type_id: yup.number().required()
}).required();

export default function CreatePostTab() {
    const formMethods = useForm<Post>({ defaultValues: defaultPostValues, resolver: yupResolver(schema) });
    const watchEventType = formMethods.watch("event_type");
    const [posts, setPosts] = useLocalStorage<Post[]>("posts", []);
    const [posttypes] = useLocalStorage<PostTypes>("posttypes", defaultPostTypesValues);
    const [imageUrl, setImageUrl] = React.useState<string>("");

    const onSubmit: SubmitHandler<Post> = async (data) => {
        setPosts(posts.concat(data));
        formMethods.reset();
        setImageUrl("");
    };

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImageUrl(event.target.value);
    }

    return (
        <Box sx={{ width: '60%', margin: 'auto' }}>
            <FormProvider  {...formMethods}>
                <Stack spacing={2}>
                    <TextField {...formMethods.register("event_name")} name="event_name" label="Event name" variant="outlined" />
                    <FormControl fullWidth>
                        <InputLabel>Post Type</InputLabel>
                        <Select
                            labelId="post-type-select-label"
                            label="Post Type"
                            {...formMethods.register("post_type_id")}
                        >
                            {posttypes["posttypes"].map((posttype: PostType) => (
                                <MenuItem key={posttype.id} value={posttype.id}>
                                    <Box sx={{ flex: "auto" }}>
                                        {posttype.name}
                                    </Box>
                                    <Chip sx={{ bgcolor: posttype.color }} label={posttype.color} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField {...formMethods.register("short_desc")} name="short_desc" label="Short Description" variant="outlined" multiline />
                    <TextField {...formMethods.register("long_desc")} name="long_desc" label="Long Description" variant="outlined" multiline />
                    <FormControl>
                        <Controller
                            name="event_type"
                            control={formMethods.control}
                            render={({ field: { onChange, value } }) => (
                                <RadioGroup
                                    aria-labelledby="event-type-radio-buttons-group-label"
                                    defaultValue="event"
                                    name="radio-buttons-group"
                                    value={value ?? "event"}
                                    onChange={onChange}
                                    row
                                >
                                    <FormControlLabel value="event" control={<Radio />} label="Event" />
                                    <FormControlLabel value="process" control={<Radio />} label="Process" />
                                </RadioGroup>
                            )}
                        />
                    </FormControl>
                    <Controller
                        name="start_date"
                        control={formMethods.control}
                        render={({ field: { onChange, value } }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Start Date"
                                    onChange={onChange}
                                    value={value}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        )}
                    />
                    {watchEventType == "process" && (
                        <Controller
                            name="end_date"
                            control={formMethods.control}
                            render={({ field: { onChange, value } }) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="End Date"
                                        onChange={onChange}
                                        value={value}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                    )}
                    <TextField {...formMethods.register("img_url")} name="img_url" label="Provide image URL" variant="outlined" onChange={onImageChange}/>
                    <Box component="img" src={imageUrl}/>
                    <Button variant="contained" onClick={formMethods.handleSubmit(onSubmit)}>Create Post</Button>
                </Stack>
            </FormProvider>
        </Box>
    )
}