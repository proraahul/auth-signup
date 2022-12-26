const express = require("express");
const app = express();
const port = 5000;

//convert JSON to object
app.use(express.json());

let users_details = [
    {id:1, name: 'john',email: "john@gmail.com", password:"12345678" },
    {id:2, name:'jane', email:"jane@gmail.com", password:"12345678"},
]


// i should get the data from someone who signing up
app.post("/signup/", (req, res)=>{

    let {name, email, password} = req.body;

    if(!name || !email || !password){
         return res.send({error: "please filed all the fill"}) 
    }
    // name should be >= 3 digits
    if(name.length<3){
        return res.send({error: "Name should be >=3 digit"})
    }
    //email should be valid
    if(email.indexOf("@")== -1){
        return res.send ({error: "Email should be valid"})
    }
    //password should be >= 8
    if(password.length < 8){
        return res.send ({error: "Password should be >= 8 digit"})
    }

    //check if email already exits
    for(t of users_details){
        if(t.email == email){
            return res.send ({error: "Email already exists"})

        }
    }

    //create a new user
    let last_id = users_details[users_details.length-1].id

    //before storing the data in database, we should ecrypt the password - by bycrypt

    users_details.push({id: last_id+1, name, email, password})

    console.log(users_details)

    let current_user = users_details[users_details.length-1]

    res.send({massage: "User created Successfully",
    data: {name: current_user.name, email: current_user.email, id: current_user.id}})
       
})






app.listen(port, ()=>{console.log(`Auth app running on port ${port}!`)})