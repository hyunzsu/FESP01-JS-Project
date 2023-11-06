// 인터페이스&타입을 기술하여 공통사용을 위한 description 폴더
// Axios 통신으로 받아온 서버의 응답 타입을 정의

interface TodoItem {
  _id: number;
  title: string;
  content: string;
  done: true;
  createdAt: string;
  updatedAt: string;
}

interface TodoListResponse {
  ok: number;
  items: TodoItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface TodoResponse {
  ok: number;
  item: TodoItem;
}

interface PageElements {
  detailContainer: HTMLDivElement;
  title: HTMLInputElement;
  createTime: HTMLDivElement;
  content: HTMLTextAreaElement;
  editButton: HTMLButtonElement;
  deleteButton: HTMLButtonElement;
}