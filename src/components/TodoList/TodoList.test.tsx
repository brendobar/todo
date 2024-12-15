import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import TodoList  from './TodoList'



describe('TodoList Component', () => {

    test('TodoList Component', () => {
        render(<TodoList />)

        const input = screen.getByPlaceholderText('What needs to be done?')

        fireEvent.change(input, { target: { value: 'New Task' } })
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

        expect(screen.getByText('New Task')).toBeInTheDocument()
        expect(input).toHaveValue('')
    })



    test('Toggles the completion status of a todo', () => {
        render(<TodoList />)

        const todo = screen.getByText('Тестовое задание')

        fireEvent.click(todo)

        expect(todo).toHaveClass('done')
    })



    test('Filters todos by "Active"', () => {
        render(<TodoList />)

        const activeBtn = screen.getByText('Active')
        const activeItem = screen.getByText('Прекрасный код')

        fireEvent.click(activeBtn)

        expect(activeItem).not.toBeInTheDocument()
    })

    test('Filters todos by "Completed"', () => {
        render(<TodoList />)
        const completedBtn = screen.getByText('Completed')
        const completedItem = screen.getByText('Прекрасный код');
        const activeItem = screen.queryByText('Тестовое задание');

        fireEvent.click(completedBtn)

        expect(completedItem).toBeInTheDocument();
        expect(activeItem).not.toBeInTheDocument();
    })



    test('Clears completed todos', () => {
        render(<TodoList />);

        const clearBtn = screen.getByText('Clear Completed')
        const completedItem = screen.getByText('Прекрасный код');

        fireEvent.click(clearBtn)

        expect(completedItem).not.toHaveClass('done')
    })



    test('Displays the correct count of items left', () => {
        render(<TodoList />)

        const leftItems = screen.getByText('2 items left')

        const todoItem1 = screen.getByText('Тестовое задание');
        const todoItem2 = screen.getByText('Покрытие тестами');


        fireEvent.click(todoItem1)
        expect(leftItems).toHaveTextContent('1 items left')

        fireEvent.click(todoItem2)
        expect(leftItems).toHaveTextContent('0 items left')

        fireEvent.click(todoItem2)
        expect(leftItems).toHaveTextContent('1 items left')

    })


})


