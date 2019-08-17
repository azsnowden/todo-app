// const http = require('http');

const express = require('express')
const Todo = require('./models/Todo');
const User = require(`./models/user`);
const es6Renderer = require('express-es6-template-engine')
const {sanitizeBody} = require('express-validator');



const app = express();
app.engine('html',es6Renderer)
app.set('views', 'views')
app.set('view engine', 'html')
app.use(express.static('public'));


app.use(express.urlencoded({extended: true}))
app.use((req, res, next)=>{
    console.log('i am middleware')
    console.log(req.url)
    next()
})
const port = 3001;

app.get('/', (req,res)=>{
    res.render('index',{
        locals:{
            message: "It is time for lunch"
        },
        partials: {
            navbar: './navbar',
            includes: 'includes'
            // users:'./users'
        }
    })
})


app.get('/profile/todo/create', (req, res) => {
    //render the "create new form" template
    res.render('create-todo',{
        partials: {
            navbar: 'navbar',
            includes: 'includes'
        }
    });

})

app.post('/profile/todo/create', [sanitizeBody('task').escape()], 
    async (req,res) =>{
    //handle the req.body from "create new form"
    console.log(req.body)
    req.body.priority = 1;
    const taskId = await Todo.create(req.body.user_id,req.body)
    res.send(taskId);
    console.log("look at this",taskId)
})


app.get('/profile', (req,res) =>{
    res.render('profile',{
        locals:{},
        partials: {navbar: "/navbar",
                includes: 'includes'
            }
        })
})
app.get('/profile/todo', async (req,res) =>{
    const userID = 1;
    const theUser = await User.getOne(userID);
    console.log("this is the consolelog ",theUser.todos)

    res.render('todo',{
        locals:{
            todos: theUser.todos
        },
        partials: {navbar: "/navbar",
                includes: 'includes'}
        })
})
// const swerver = http.createServer((req,res) => {
    app.get('/todos',(req,res) => {
    console.log("you've got a request!")
     
     const allTodos = Todo.getAll();
     allTodos
     .then((data) => {
         console.log("omgitzdataaacadf")
         console.log(data)
        //  res.end(JSON.stringify(data))
        res.json(data)
     })
    //  res.end(allTodos)
     console.log("24601")
    //  console.log(allTodos)
});

    app.get('/todos/:taskId', (req,res)=> {
        console.log("you asked for a specific task");
        console.log(req.params.taskId);
        const theId = parseInt(req.params.taskId, 10);
        const aTodo = Todo.getOne(theId)
        aTodo.then((data) => {
            res.json(data);
        });
    });

// swerver.listen(4000);

app.get('/users', async(req, res) =>{
   const allUsers = await User.getAll();
    res.json(allUsers);
})

app.get('/users/:userID', (req, res) =>{
    console.log('you asked for a specific user')
    const theID = parseInt(req.params.userID, 10)
    const oneUser = User.getOne(theID);
    oneUser
    .then((data) => {
        res.json(data);
    })
 })

// User.createUser({
//     displayname:"ladkf",
//     username:"akdfkaf"
// })

app.post('/users', [sanitizeBody('username').escape(),
sanitizeBody('displayname').escape()], 
async (req,res) =>{
    console.log("We got a POST request!")
    res.send("good job");

    console.log("here's the body")
    console.log(req.body);
    const newUserInfo = await User.createUser(req.body)
        res.json(newUserInfo)
})
app.post('/users/:userID', async (req,res) =>{
    console.log('something printed')
    console.log(req.query)
    const ian = await Todo.createToDo({priority:req.body.priority, todos:req.body.todos, user_id:req.params.userID})
   console.log(ian)
   res.json(ian)
    // const longUrl = await User
})
    //     {
    //         displayname: req.body.displayname,
    //         username: req.body.username,
    // })


app.listen(port)

