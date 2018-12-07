'use strict'

var express = require('express')
// share the same Router
var todoRoutes = express.Router()

// pull data from todos collection
var todo = require('./todo')

// get all todos in the db
todoRoutes.route('/all').get(function (req, res, next) {
  //  res.send('todoRoutes all');
  todo.find(function (err, todos) {
    if (err) {
        console.log(err)
      return next(new Error(err))
    }
    res.json(todos) // return all todos
  })
})

// create a todo item
todoRoutes.route('/add').post(function (req, res) {
  todo.create(
    {
      name: req.body.name,
      done: false
    },
    function (error, todo) {
      if (error) {
        res.status(400).send('Unable to create todo list')
      }
      res.status(200).json(todo)
    }
  )
})

// delete a todo item

todoRoutes.route('/delete/:id').get(function (req, res, next) {
  var id = req.params.id
  todo.findByIdAndRemove(id, function (err, todo) {
    if (err) {
      return next(new Error('Todo was not found'))
    }
    res.json('Successfully removed')
  })
})

// perform update on todo item

todoRoutes.route('/update/:id').post(function (req, res, next) {
  var id = req.params.id
  todo.findById(id, function (error, todo) {
    if (error) {
      return next(new Error('Todo was not found'))
    } else {
      todo.name = req.body.name
      todo.done = req.body.done
      todo.save(
        function (error, todo) {
          if (error) {
            res.status(400).send('Unable to update todo')
          } else {
            res.status(200).json(todo)
          }
        }
      )
    }
  })
})


// pull data from items collection
var item = require('./item')


// get all items in the db

todoRoutes.route('/allitems').get(function (req, res, next) {
  //  res.send('todoRoutes all');
  item.find(function (err, items) {
    if (err) {
        console.log(err)
      return next(new Error(err))
    }
    res.json(items) // return all items
  })
})

// create an item
todoRoutes.route('/additem').post(function (req, res) {
  item.create(
    {
      name: req.body.name,
      done: false
    },
    function (error, item) {
      if (error) {
        res.status(400).send('Unable to create an item')
      }
      res.status(200).json(item)
    }
  )
})

// delete an item

todoRoutes.route('/deleteitem/:id').get(function (req, res, next) {
  var id = req.params.id
  item.findByIdAndRemove(id, function (err, item) {
    if (err) {
      return next(new Error('Item was not found'))
    }
    res.json('Successfully removed')
  })
})

// perform update on an item

todoRoutes.route('/updateitem/:id').post(function (req, res, next) {
  var id = req.params.id
  item.findById(id, function (error, item) {
    if (error) {
      return next(new Error('Item was not found'))
    } else {
      item.name = req.body.name
      item.done = req.body.done
      item.save(
        function (error, item) {
          if (error) {
            res.status(400).send('Unable to update item')
          } else {
            res.status(200).json(item)
          }
        }
      )
    }
  })
})

// share the same routes for todo and item
module.exports = todoRoutes