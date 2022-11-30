import { Box, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import useLocalStorage from "../../hooks/useLocalStorage";
import { PostType, PostTypes, defaultPostTypesValues, defaultPostTypeValues } from "../../types/PostType";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function TypesTab() {
    const [posttypes, setPostTypes] = useLocalStorage<PostTypes>("posttypes", defaultPostTypesValues);
    const { register, handleSubmit, reset } = useForm<PostType>();
    const [edit, setEdit] = useState<boolean>(false);
    const [idxToEdit, setIdxToEdit] = useState<number>(0);

    const removePostType = (postTypeId: number) => {
        let tempPostTypes: PostTypes = {
            ...posttypes,
            posttypes: posttypes["posttypes"].filter((obj: PostType) => obj.id !== postTypeId)
        };
        setPostTypes(tempPostTypes);
    }

    const changeEditState = (idx: number) => {
        setIdxToEdit(idx);
        setEdit(!edit);

        if (!edit) {
            reset();
        }
    }

    const onSubmitName = (keyId: number, postTypeName: string) => {
        let tmpPostTypes = posttypes.posttypes.slice();
        tmpPostTypes.find((obj: PostType, idx: number) => {
            if (obj.id === keyId) {
                tmpPostTypes[idx].name = postTypeName;
                return true; // stop searching
            }
        });

        let newPostTypes: PostTypes = {
            ...posttypes,
            "posttypes": tmpPostTypes
        }
        setPostTypes(newPostTypes);
        setEdit(false);
        reset();
    };

    const onSubmitColor = (keyId: number, postTypeColor: string) => {
        let tmpPostTypes = posttypes.posttypes.slice();
        tmpPostTypes.find((obj: PostType, idx: number) => {
            if (obj.id === keyId) {
                tmpPostTypes[idx].color = postTypeColor;
                return true; // stop searching
            }
        });

        let newPostTypes: PostTypes = {
            ...posttypes,
            "posttypes": tmpPostTypes
        }
        setPostTypes(newPostTypes);
        setEdit(false);
        reset();
    };

    return (
        <Box sx={{ width: '100%' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Post type name</TableCell>
                            <TableCell>Color</TableCell>
                            <TableCell align="right">Edit</TableCell>
                            <TableCell align="right">Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posttypes["posttypes"].map((posttype: PostType, index: number) => (
                            <TableRow
                                key={posttype.id}
                            >
                                <TableCell component="th" scope="row">
                                    {posttype.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {(edit && idxToEdit == index) ? (
                                        <TextField {...register("name", { required: true })} label="Post type name" variant="outlined" defaultValue={posttype.name} onKeyPress={(ev) => {
                                            if (ev.key === 'Enter') {
                                                onSubmitName(posttype.id, ev.target.value);
                                                ev.preventDefault();
                                            }
                                        }} />
                                    ) : posttype.name}
                                </TableCell>
                                <TableCell>
                                    {(edit && idxToEdit == index) ? (
                                        <TextField {...register("color", { required: true })} label="Color" variant="outlined" defaultValue={posttype.color} onKeyPress={(ev) => {
                                            if (ev.key === 'Enter') {
                                                onSubmitColor(posttype.id, ev.target.value);
                                                ev.preventDefault();
                                            }
                                        }} />
                                    ) : (<Chip sx={{ bgcolor: posttype.color }} label={posttype.color} />)
                                    }
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="edit" onClick={() => { changeEditState(index) }}>
                                        {(edit && idxToEdit == index) ? (
                                            <CancelIcon />
                                        ) : (<EditIcon />)
                                        }
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="delete" onClick={() => { removePostType(posttype.id) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}