export type Event = {
  id: string;
  title: string;
  description: string | null;
  date: string;
  start_time: string | null;
  end_time: string | null;
  location: string | null;
  image_url: string | null;
  signup_url: string | null;
};

export type EventsApiResponse = {
  events?: Event[];
  error?: string;
};
