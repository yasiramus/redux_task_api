const express = require("express");

const cors = require("cors");

// using the uuid to generate random string
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended:true }));

// port number
const port = 5000;

// setting the custmTasks to empty array 
let customTasks = [];

// fetching all todo 
// app.get("/todoApi", function (req, res) {
   
//     try {
        
//         setTimeout(() => {
            
//             res.status(200).json(customTasks)

//         }, 8000);

//     } catch (error) {
        
//         console.log(error)
//     }

// });

// fetching all todo 
app.get("/todo", function (req, res) {
   
    try {
        
            
            res.status(200).json(customTasks)

       

    } catch (error) {
        
        console.log(error)
    }

});

// posting data using raw js fxn
app.post("/todoApi", function (req, res) {

   try {
       
       const text = req.body.text;
       
       const addNewtodo = {

           id: uuidv4(),
           
           text,
        
           isCompleted: false
        
    }
    console.log(addNewtodo)
    
    if (!text) {

        res.status(404).json("text field can't be empty")

    } else {

        customTasks.push(addNewtodo);
        
        // this return the one(object) which has just been added within the array 
        res.status(201).json(addNewtodo)
    }
       
   } catch (error) {

       console.log(error);

   }
    
});

// updating the todo to true or false 
app.put("/todoApi/:todoId", function (req, res) {

    try {
        
        const todoId = req.params.todoId;

        // this is what is actually doing the update 
        // maping through the customTask to perform the update 
        customTasks = customTasks.map(todos => {

                if (todos.id === todoId) {
                    
                    return { ...todos, isCompleted: !todos.isCompleted }
                    
                } else { 

                    return { ...todos }

                }
            
        })

        // this returning a single object of the todo based on the id
        const taskMatches = customTasks.find(todo => todo.id === todoId);

        res.status(200).json(taskMatches);

    } catch (error) {
        
        console.log(error)

    }
});

// deleting a todo using the id
app.delete("/todoApi/:deleteTodoId", function (req, res) {
    
    try {
       
        const deleteTodoId = req.params.deleteTodoId;

        if (!customTasks) {
            
            res.status(404).json("no data available")

        } else {

            const TodoMatches = customTasks.find(todo => todo.id === deleteTodoId);

            customTasks = customTasks.filter(todo => todo.id !== deleteTodoId);
            
            console.log(TodoMatches)

            // this returning a single object of the todo based on the id
            res.status(202).json(TodoMatches )
        }

    } catch (error) {
        
        console.log(error)

    }

});

app.listen(port, () => console.log(`server listening on ${port}`));