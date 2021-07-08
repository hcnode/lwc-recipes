import { createElement } from 'lwc';
import TodoList from 'c/todoList';

let TODOS = [
    { id: 1, description: 'Explore recipes', priority: false },
    { id: 2, description: 'Install Ebikes sample app', priority: false }
];

describe('c-todo-list', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders without any list items as default', () => {
        // Create initial element
        const element = createElement('c-todo-list', {
            is: TodoList
        });
        document.body.appendChild(element);

        expect(element).toMatchSnapshot();
    });

    it('renders multiple list items', () => {
        // Create initial element
        const element = createElement('c-todo-list', {
            is: TodoList
        });
        // Set public properties
        element.todos = TODOS;
        document.body.appendChild(element);

        expect(element).toMatchSnapshot();
    });

    it('is accessible when todo items added', () => {
        // Create initial element
        const element = createElement('c-todo-list', {
            is: TodoList
        });
        // Set public properties
        element.todos = TODOS;
        document.body.appendChild(element);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
