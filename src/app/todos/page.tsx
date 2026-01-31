import TodoList from "@/components/TodoList";
import AddTodo from "@/components/AddTodo";

export default async function TodosPage() {
  const url = process.env.API_URL;
  const todos = await fetch(`${url}/todos`);
  const todosData = await todos.json();

  return (
    <>
      <div className="w-1/2 mx-auto mt-12">
        <div className="text-2xl font-bold text-center mt-4">
          Your Todos List
        </div>
        <div className="text-lg text-center">Add your todos here</div>
        <div className="flex justify-center mt-4">
          <AddTodo />
        </div>

        <div className="text-center mt-4 text-lg font-bold">
          your todos will be listed here
        </div>
        <TodoList todos={todosData} />
      </div>
    </>
  );
}
