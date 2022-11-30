import dayjs, {Dayjs} from 'dayjs';

export const defaultPostValues = {
    event_name: "",
    short_desc: "",
    long_desc: "",
    event_type: "event",
    start_date: dayjs(),
    end_date: dayjs(),
    post_type_id: 0,
    img_url: "",
};

export type Post = {
    event_name: string;
    short_desc: string;
    long_desc: string;
    event_type: string;
    start_date: Dayjs;
    end_date: Dayjs;
    post_type_id: number;
    img_url: string;
};