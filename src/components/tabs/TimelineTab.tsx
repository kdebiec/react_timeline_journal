import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import useLocalStorage from '../../hooks/useLocalStorage';
import { defaultPostValues, Post } from '../../types/Post';
import { PostTypes, defaultPostTypesValues, PostType, defaultPostTypeValues } from '../../types/PostType';
import { Box, Button, Card, CardActions, CardContent, Chip, Dialog, DialogActions, DialogContent, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';

export default function TimelineTab() {
  const [posts, setPosts] = useLocalStorage<Post[]>("posts", []);
  const [posttypes] = useLocalStorage<PostTypes>("posttypes", defaultPostTypesValues);
  const [open, setOpen] = useState(false);
  const [modalPost, setModalPost] = useState<Post>(defaultPostValues);
  const [modalPostType, setModalPostType] = useState<PostType>(defaultPostTypeValues);

  const handleClickOpen = (post: Post, posttype: PostType) => {
    console.log(post);
    setModalPost(post);
    setModalPostType(posttype)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Timeline position="alternate">
      {posts.map((post: Post, index: number) => {
        let posttype = posttypes.posttypes.filter((obj: PostType) => obj.id == post.post_type_id)[0];
        return (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot sx={{ backgroundColor: posttype.color, color: posttype.color }} />
              {index + 1 != posts.length && (<TimelineConnector sx={{ backgroundColor: posttype.color, color: posttype.color }} />)}
            </TimelineSeparator >
            <TimelineContent>
              <Card variant="outlined" sx={{ textAlign: "left" }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {post.event_name}
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <Chip sx={{ mt: 1, mb: 1, borderColor: posttype.color, color: posttype.color }} label={posttype.name} variant="outlined" />
                    <Box sx={{ mt: 'auto' }}>
                      <Typography sx={{ float: 'left' }} variant="body2">
                        {dayjs(post.start_date).format('DD-MM-YYYY')}
                      </Typography>
                      {post.event_type == "process" && (
                        <Typography sx={{ float: 'left', ml: 1, mr: 1 }} variant="body2">
                          -
                        </Typography>
                      )}
                      <Typography sx={{ float: 'left' }} variant="body2">
                        {post.event_type == "process" ? dayjs(post.end_date).format('DD-MM-YYYY') : ""}
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography variant="body2" gutterBottom>
                    {post.short_desc}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={()=>{handleClickOpen(post, posttype)}}>More</Button>
                </CardActions>
              </Card>
            </TimelineContent>
          </TimelineItem>
        )
      })}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent dividers>
          <Typography variant="h5" component="div">
            {modalPost.event_name}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Chip sx={{ mt: 1, mb: 1, borderColor: modalPostType.color, color: modalPostType.color }} label={modalPostType.name} variant="outlined" />
            <Box sx={{ mt: 'auto' }}>
              <Typography sx={{ float: 'left' }} variant="body2">
                {dayjs(modalPost.start_date).format('DD-MM-YYYY')}
              </Typography>
              {modalPost.event_type == "process" && (
                <Typography sx={{ float: 'left', ml: 1, mr: 1 }} variant="body2">
                  -
                </Typography>
              )}
              <Typography sx={{ float: 'left' }} variant="body2">
                {modalPost.event_type == "process" ? dayjs(modalPost.end_date).format('DD-MM-YYYY') : ""}
              </Typography>
            </Box>
          </Stack>
          <Typography variant="body2" gutterBottom>
            {modalPost.short_desc}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {modalPost.long_desc}
          </Typography>
          <Box  sx={{ width: '100%', margin: 'auto' }} component="img" src={modalPost.img_url}/>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Timeline>
  );
}