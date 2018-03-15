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
            // clear out the html
            $('#todos').empty();

            // ideally you would create the ul and then append li elements inside of that
            // rather than having a ul that is already in your html
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

            // return this to allow for chaining (function returns the object its in, so you can use another method/property on it)
            return this;
        },
        // you want listeners here to be attached to HTML elements that will not disappear or change
        initListeners: function() {
            $('#addBtn').click(handlers.addTodo);

            // using event delegation you can have one listener than can hear when anything
            // inside of it is clicked - rather than having 1 function PER todo
            $('#todos').click(handlers.deleteOrToggleTodo);

            $('#clearBtn').click(handlers.clearTodos);
            $('#toggleBtn').click(handlers.toggleAll);
            $(document).keypress(handlers.onEnter);

            // to allow for chaining
            return this;
        }
    };

    // event listeners
    // by convention you would add the event parameter to handlers even
    // if you do not use the event object in your function
    handlers = {
        addTodo: function(event) {
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
        },
        onEnter: function(event) {
            // 13 is the key number for ENTER            
            if (event.which === 13) {
                handlers.addTodo();
            }
        }
    }

    // render the html THEN attach the event listeners
    view.render().initListeners();
});