const bodyParser = require('body-parser');
const express = require('express');

let app = express();
const PORT = 3000;

let blogList = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// API to write blogs
app.post('/blogs', (req, res) => {
    blogList.push({
        id : req.body.id,
        title : req.body.title,
        content : req.body.content
    });
    return res.status(200).json({
        success : true
    });
});


// API to read all the blogs
app.get('/blogs', (req, res) => {
    return res.status(201).send(blogList);
});


// API tp get specific blog from specific ID
app.get('/blogs/:id', (req, res) => {
    for(let i=0; i<blogList.length; i++){
        if(blogList[i].id == req.params.id){
            return res.status(200).send(blogList[i])
        }
    }
});


// API to delete a blog but not all with specific ID
app.delete('/blogs/:id', (req, res) => {

    // Delete the blog of that ID
    for(let i=0; i<blogList.length; i++){
        if(blogList[i].id == req.params.id){
            for(let j=i; j<blogList.length; j++){
                blogList[j] = blogList[j+1];
            }
            break;
        }
    }

    // Check if that ID exist or not
    let count = 0;
    for(let x=0; x<(blogList.length-1); x++){
        if(blogList[x].id == req.params.id){
            count = count + 1;
        }
    }
    if(count == 0){
        return res.status(200).json({
            succes : true
        });
    }
    else{
        return res.status(400).json({
            succes : false
        });
    }
});

// API to upate a full blog using ID
app.put('/blogs/:id', (req, res) => {
    let i;
    for(i=0; i<blogList.length; i++){
        if(blogList[i].id == req.params.id){
            break;
        }
    }
    blogList[i].title = req.body.title;
    blogList[i].content = req.body.content;
    return res.status(200).json({
        success : true
    });
});

// API for partial update of blog using ID
app.patch('/blogs/:id', (req, res) => {
    let i;
    for(i=0; i<blogList.length; i++){
        if(blogList[i].id == req.params.id){
            break;
        }
    }
    if(req.body.title){
        blogList[i].title = req.body.title;
    }
    else{
        blogList[i].content = req.body.content;
    }
    return res.status(200).json({
        success : true
    });
});

// To start serve on port 3000
app.listen( PORT , (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("Server is running at port", PORT)
    }
});