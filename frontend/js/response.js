const input = document.querySelector('#todoInput')
const addButton = document.querySelector('#todoAddButton')

addButton.addEventListener('click', async () => {

    const task = {
        task: input.value
    }

    input.value = ''
    
    const response = await fetch("http://127.0.0.1:8000/api/task", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })
    
})