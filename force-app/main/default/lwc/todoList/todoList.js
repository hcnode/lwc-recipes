import { LightningElement, api } from 'lwc';

export default class TodoList extends LightningElement {
    // Spring 20 Note on tracked properties: this component may seem to
    // mutate an array, but because Array.prototype.filter() always creates
    // a new array, in fact no mutation occurs. Since we always assign
    // a new array to filteredTodos, the track decorator is not required.
    filteredTodos = [];

    _todos = [];

    priorityFilter = false;
    newTodoValue = '';
    @api
    get todos() {
        return this._todos;
    }
    set todos(value) {
        this._todos = value;
        this.filterTodos();
    }
    get label() {
        return 'Priority Only';
    }
    filterTodos() {
        if (this.priorityFilter) {
            this.filteredTodos = this._todos.filter(
                (todo) => todo.priority === true
            );
        } else {
            this.filteredTodos = this._todos;
        }
    }

    handleCheckboxChange(event) {
        this.priorityFilter = event.target.checked;
        this.filterTodos();
    }
    handleAddTodo() {
        this._todos = [
            ...this._todos,
            {
                id: new Date().valueOf(),
                description: this.newTodoValue,
                priority: false
            }
        ]
        this.filterTodos();
    }
    handleNewTodoKeyDown(event){
        if(event.keyCode === 13){
            this.handleAddTodo()
            this.newTodoValue = ''
        }else{
            this.newTodoValue = event.target.value;
        }
    }
    handleSetPriority(event){
        const id = event.target.getAttribute('data-id')
        this._todos = this._todos.map(todo => (todo.id == id ? {
            ...todo,
            priority: !todo.priority
        } : todo))
        this.filterTodos();
    }
}
