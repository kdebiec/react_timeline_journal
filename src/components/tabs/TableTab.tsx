import dayjs from 'dayjs';
import { Box, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Post } from "../../types/Post";
import { PostTypes, defaultPostTypesValues, PostType } from '../../types/PostType';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TableTab() {
    const [posts, setPosts] = useLocalStorage<Post[]>("posts", []);
    const [posttypes] = useLocalStorage<PostTypes>("posttypes", defaultPostTypesValues);

    const removePost = (idx: number) => {
        setPosts(posts.filter((_, index: number) => index !== idx));
    }

    return (
        <Box sx={{ width: '100%' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Event name</TableCell>
                            <TableCell align="right">Short Description</TableCell>
                            <TableCell align="right">Long Description</TableCell>
                            <TableCell align="right">Event Type</TableCell>
                            <TableCell align="right">Start Date</TableCell>
                            <TableCell align="right">End Date</TableCell>
                            <TableCell align="right">Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.map((post: Post, index: number) => {
                            let posttype = posttypes.posttypes.filter((obj: PostType) => obj.id == post.post_type_id)[0];
                            return (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {post.event_name}
                                </TableCell>
                                <TableCell align="right">{post.short_desc}</TableCell>
                                <TableCell align="right">{post.long_desc}</TableCell>
                                <TableCell align="right">
                                    <Chip sx={{ borderColor: posttype.color, color: posttype.color }} label={posttype.name} variant="outlined"/>
                                </TableCell>
                                <TableCell align="right">{dayjs(post.start_date).format('DD-MM-YYYY')}</TableCell>
                                <TableCell align="right"> {post.event_type == "process" ? dayjs(post.end_date).format('DD-MM-YYYY') : "N/A"}</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="delete" onClick={() => { removePost(index) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )})}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}