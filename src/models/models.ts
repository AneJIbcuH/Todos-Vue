export type Todo = {
  id: string;
  title: string;
  description: string;
  state: boolean;
};

export enum FilterByState {
  all = "all",
  done = "done",
  queue = "queue",
}
