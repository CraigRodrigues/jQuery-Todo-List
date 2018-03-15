$(document).ready(function() {
    // holds all todo data
    todoList = {
        todos: [],
        addTodo: function(text) {
            var todo = {
                text: text,
                completed: false,
                important: false
            }

            this.todos.push(todo);

            view.render();
        },
        removeTodo: function(index) {
            this.todos.splice(index, 1);

            view.render();
        },
        toggleCompleted: function(index) {
            this.todos[index].completed = !this.todos[index].completed;

            view.render();
        },
        toggleAll: function() {
            if (this.todos.length) {
                var incompleteTodos = this.todos.filter(function(todo) {
                    return !todo.completed;
                });
    
                // mark all as completed
                if (incompleteTodos.length) {
                    this.todos.forEach(function(todo) {
                        todo.completed = true;
                    });
                } else {
                    this.todos.forEach(function(todo) {
                        todo.completed = false;
                    });
                }
    
                view.render();
            }
        },
        clear: function() {
            this.todos = this.todos.filter(function(todo) {
                return !todo.completed;
            });

            view.render();
        }
    };

    // controls how the todos are displayed on the page
    view = {
        render: function() {
            $('#todos').empty();

            todoList.todos.forEach(function(todo, index) {
                // create li element
                var $li = $('<li>');

                // add id
                $li.attr('id', index);

                // append span with todo text and class of todo
                $li.append('<span class="todo">' + todo.text + '</span>');

                // add strikethrough css if todo is completed
                if (todo.completed === true) {
                    $li.css('text-decoration', 'line-through');
                }

                // append delete button with class of deleteBtn
                $li.append('<button class="deleteBtn">Delete</button>');

                $('#todos').append($li);
            });

            return this;
        },
        initListeners: function() {
            $('#addBtn').click(handlers.addTodo);
            $('#todos').click(handlers.deleteOrToggleTodo);
            $('#clearBtn').click(handlers.clearTodos);
            $('#toggleBtn').click(handlers.toggleAll);
    
            $(document).keypress(function(event) {
                if (event.which === 13) {
                    handlers.addTodo();
                }
            });

            return this;
        }
    };

    // event listeners
    handlers = {
        addTodo: function() {
            var todoText = $('#todoInput').val();

            if (todoText) {
                todoList.addTodo(todoText);
                $('#todoInput').val('');
            }
        },
        deleteOrToggleTodo: function(event) {
            event.stopPropagation();

            var id;
            var $target = $(event.target);
            var targetClass = $target.attr('class');
            var id = $target.parent().attr('id');

            if (targetClass === 'deleteBtn') {
                todoList.removeTodo(id);
            } else if (targetClass === 'todo') {
                todoList.toggleCompleted(id);
            }
        },
        clearTodos: function(event) {
            todoList.clear();
        },
        toggleAll: function(event) {
            todoList.toggleAll();
        }
    }

    view.render().initListeners();
});