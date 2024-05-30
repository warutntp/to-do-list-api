export interface TodoModel extends TodoCreateBody {
  id: number;
  completed: boolean;
}

export interface TodoCreateBody {
  title: string;
  description?: string;
}

export interface TodoUpdateBody {
  title?: string;
  description?: string;
  completed?: boolean;
}
