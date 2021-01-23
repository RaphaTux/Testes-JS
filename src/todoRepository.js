const loki = require('lokijs')

class TodoRepository{
  constructor(){
    const db = new loki('todo',{})
    this.schedule = db.addCollection('schedule')
  }
  list(){
    return this.schedule.find()

  }
  create(data){
    return this.schedule.insert(data)
  }
}
module.exports = TodoRepository

// Testando a instacia do banco de dados 
// const c = new TodoRepository()

// c.create({name:'Raphael',age:38})
// c.create({name:'Euclides',age:90})

// console.log('list',c.list())
