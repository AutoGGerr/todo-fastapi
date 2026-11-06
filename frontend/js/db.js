const todoBox = document.querySelector('.todo-box')

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://127.0.0.1:8000/api/task') 
    const data = await response.json()
    const tasks = data.message.map(([id, task]) => ({id, task}))

    tasks.forEach(tasked => {
        const itemHtml = `
            <div class="todo-item">
                <div class="todo-item__content">
                    <span class="todo-item__id">${tasked.id}</span>
                    <p class="todo-item__task">${tasked.task}</p>
                </div>
                <div class="todo-action">
                    <button class="todo-action__delete" type="button">
                        <img src="./img/delete.svg" alt="Удалить">
                    </button>
                    <button class="todo-action__done" type="button">
                        <img src="./img/done.svg" alt="Выполнить">
                    </button>
                </div>
            </div>
        `

    todoBox.insertAdjacentHTML('beforeend', itemHtml)
        
        
    })
    console.log(tasks); 

    

})