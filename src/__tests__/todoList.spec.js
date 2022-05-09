import TodoItem from "../vo/TodoItem";
import TodoList from "../vo/TodoList";

let todoItem1, todoItem2, todoItem3, todoItem4, todoItem5;
let todoList;

beforeEach(() => {
  todoItem1 = new TodoItem(1, "할 일 1", new Date());
  todoItem2 = new TodoItem(2, "할 일 2", new Date());
  todoItem3 = new TodoItem(3, "할 일 3", new Date());
  todoItem4 = new TodoItem(4, "할 일 4", new Date());
  todoItem5 = new TodoItem(5, "할 일 5", new Date());
  todoList = new TodoList([todoItem1, todoItem2, todoItem3, todoItem4, todoItem5], new Date());
});

describe("할 일 목록을 가지고 있다.", () => {
  test("5개를 만들면, 5개가 있다", () => {
    /*
    const todoItem1 = new TodoItem(1, "할 일 1", new Date());
    const todoItem2 = new TodoItem(2, "할 일 2", new Date());
    const todoItem3 = new TodoItem(3, "할 일 3", new Date());
    const todoItem4 = new TodoItem(4, "할 일 4", new Date());
    const todoItem5 = new TodoItem(5, "할 일 5", new Date());
    const todoItemList = [todoItem1, todoItem2, todoItem3, todoItem4, todoItem5];
    const todoList = new TodoList(todoItemList);
    */
    expect(todoList.items).toHaveLength(5);
  });
});

describe("할 일 목록에서 삭제를 할 수 있다.", () => {
  test("5개의 할 일이 있는데, id가 3인 할 일을 삭제할 수 있다", () => {
    todoList.removeTodoItem(3);
    expect(todoList.items).toHaveLength(4);
    expect(todoList.items.some((todoItem) => todoItem.id === 3)).toBeFalsy();
  });
});

describe("할 일 목록에서 추가를 할 수 있다.", () => {
  test("5개의 할 일이 있는데, id가 3인 할 일을 삭제할 수 있다", () => {
    const todoItem6 = new TodoItem(6, "할 일 6", new Date());

    todoList.pushTodoItem(todoItem6);
    expect(todoList.items).toHaveLength(6);
    expect(todoList.items.some((todoItem) => todoItem.id === 6)).toBeTruthy();
  });
});

describe("생성한 할 일들 중에서 오늘 할 일, 지난 할 일 구분할 수 있다.", () => {
  test("5개의 할 일이 있는데, id 2번을 제외하고 모두 오늘 할 일이다", () => {
    jest.spyOn(todoItem2, "equalsDayOfCreatedAt").mockImplementation(() => false); // 아예 모킹으로 오늘 만든 게 아니라고 알려줌

    expect(todoList.equalsDayItems).toHaveLength(4);
    expect(todoList.equalsDayItems.some((todoItem) => todoItem.id === 2)).toBeFalsy();
  });
  test("5개의 할 일이 있는데, id 2번만 지난 할 일이다", () => {
    jest.spyOn(todoItem2, "equalsDayOfCreatedAt").mockImplementation(() => false); // 아예 모킹으로 오늘 만든 게 아니라고 알려줌

    expect(todoList.notEqualsDayItems).toHaveLength(1);
    expect(todoList.notEqualsDayItems.some((todoItem) => todoItem.id === 2)).toBeTruthy();
  });
});

describe("오늘 할 일 중에서 완료/미완료 구분할 수 있다.", () => {
  test("5개의 할 일이 있는데, id 2번, 3번만 완료다", () => {
    jest.spyOn(todoItem2, "completed", "get").mockReturnValue(() => false);
    expect(todoList.equalsDayAndCompletedItems).toHaveLength(2);
  });
  test("5개의 할 일이 있는데, id 2번, 4번만 미완료다", () => {
    expect(todoList.equalsDayAndNotCompletedItems).toHaveLength(2);
  });
});

describe("지난 할 일 중에서 완료/미완료 구분할 수 있다.", () => {
  test("5개의 지난 할 일이 있는데, id 2번, 3번만 완료다", () => {
    expect(todoList.notEqualsDayAndCompletedItems).toHaveLength(2);
  });
  test("5개의 지난할 일이 있는데, id 2번, 4번만 미완료다", () => {
    expect(todoList.notEqualsDayAndNotCompletedItems).toHaveLength(2);
  });
});
