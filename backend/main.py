from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5501"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)


@app.post('/api/task')
async def new_task(request: Request):
    data = await request.json()
    task = data.get('task')

    print(task)
    
    db = sqlite3.connect('tasks.db') 

    curs = db.cursor()

    curs.execute("""CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task TEXT
    )""") 

    db.commit()

    curs.execute(
        "INSERT INTO tasks (task) VALUES (?)", 
        (task,)
    )

    db.commit()

    curs.execute("SELECT * FROM tasks")

    tasksDb = curs.fetchall()
    print(tasksDb)

    db.close() 

    # return {"message": tasksDb}

@app.get('/api/task')
async def task_load(request: Request):
    db = sqlite3.connect('tasks.db') 
    
    curs = db.cursor()

    curs.execute("SELECT * FROM tasks")

    tasksDb = curs.fetchall()
    print(tasksDb)

    db.close() 

    return {"message": tasksDb}