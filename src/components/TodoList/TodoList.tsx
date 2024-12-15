import React, {useEffect, useState} from 'react';
import styles from './TodoList.module.css'
import classNames from "classnames";
import {TodoItemProps, TodoListProps} from "./TodoList.types";


const TodoList = () => {

    const defaultTodos: TodoListProps = [
        {
            id: 0,
            text: 'Тестовое задание',
            done: false
        },
        {
            id: 1,
            text: 'Прекрасный код',
            done: true
        },
        {
            id: 2,
            text: 'Покрытие тестами',
            done: false
        },
    ]

    const [todos, setTodos] = useState<TodoListProps>(defaultTodos)
    const [todoInput, setTodoInput] = React.useState('');
    const [filter, setFilter] = useState<'All' | 'Completed' | 'Active'>('All');
    const [filteredTodos, setFilteredTodos] = useState<TodoListProps>([]);


    const toggleCompleted = (id: number) => {
        setTodos(
            todos.map((item: TodoItemProps) => {
                if (item.id === id) {
                    return {...item, 'done': !item.done}
                } else {
                    return item
                }
            })
        )
    }

    const clearCompleted = () => {
        setTodos(
            todos.map((item: TodoItemProps) => {
                return {...item, 'done': false}
            })
        )
    }

    const addTodo = (todo: TodoItemProps) => {
        setTodos([...todos, todo])
    }


    useEffect(() => {
        let tempFilteredTodos: TodoListProps


        if (filter === 'Completed') {
            tempFilteredTodos = todos.filter(todo => todo.done);
        } else if (filter === 'Active') {
            tempFilteredTodos = todos.filter(todo => !todo.done);
        } else {
            tempFilteredTodos = todos;
        }
        setFilteredTodos(tempFilteredTodos);
    }, [filter, todos])

    const getLeftTodos = () => {
        return todos.filter(item => !item.done).length
    }

    return (
        <div className={styles.todo}>
            <div className={styles.pageCenter}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Todos</h1>
                    <div className={styles.todoContainer}>
                        <div className={styles.inputWrapper}>
                            <svg width="10"
                                 height="6"
                                 viewBox="0 0 10 6"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.546875 1.26562L1.39063 0.406249L4.96875 3.98437L8.54688 0.40625L9.39063 1.26562L4.96875 5.6875L0.546875 1.26562Z"
                                    fill="#ccc"/>
                            </svg>
                            <input className={styles.todoInput}
                                   id='todo-input'
                                   name="todo"
                                   placeholder="What needs to be done?"
                                   value={todoInput}
                                   onChange={(e) => setTodoInput(e.target.value)}
                                   onKeyDown={(e) => {
                                       if (e.key === 'Enter' && todoInput.trim() !== '') {
                                           addTodo({id: Date.now(), text: todoInput, done: false})
                                           setTodoInput('')
                                       }
                                   }}

                            />
                        </div>
                        <ul className={styles.list}>
                            {filteredTodos.map((todo) => (
                                <li key={todo.id}
                                    className={classNames(styles.listItem, {[styles.done]: todo.done})}
                                    onClick={() => toggleCompleted(todo.id)}
                                >
                                    {todo.text}
                                </li>
                            ))}
                        </ul>
                        <div className={styles.controls}>
                            <p className={styles.left}>{getLeftTodos()} items left</p>
                            <div className={styles.filters}>
                                <button className={classNames(styles.filter, {[styles.active]: filter === 'All'})}
                                        onClick={() => setFilter('All')}>
                                    All
                                </button>
                                <button
                                    className={classNames(styles.filter, {[styles.active]: filter === 'Active'})}
                                    onClick={() => setFilter('Active')}>
                                    Active
                                </button>
                                <button
                                    className={classNames(styles.filter, {[styles.active]: filter === 'Completed'})}
                                    onClick={() => setFilter('Completed')}>
                                    Completed
                                </button>
                            </div>
                            <button className={styles.clear} onClick={clearCompleted}>Clear Completed</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoList;