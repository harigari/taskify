export interface CardProps {
  cardList: CardTaskProps[];
  columnName: string;
}

export interface CardTaskProps {
  id?: number;
  imageUrl: string | null;
  title: string;
  tags: string[];
  dueDate: string;
  assignee: {
    nickname: string;
    id: number;
  };
  // profileImageUrl: string;g
}
