const {describe,it,before,afterEach} = require('mocha')
const {expect} = require('chai')
const TodoRepository = require('../src/todoRepository')
const {createSandbox} = require('sinon')


describe('TodoRepository',()=>{
  let todoRepository
  let sandbox
  before(()=>{
    todoRepository = new TodoRepository()
    sandbox = createSandbox()
  })

  afterEach(()=>{
    sandbox.restore()
  })
  describe('methods signature',()=>{

    it('should call find from lokjs ',()=>{
      const mockDatabase = [
        {
          name: 'Raphael',
          age: 38,
          meta: { revision: 0, created: 1611406669226, version: 0 },
          '$loki': 1
        }
      ]
      const functionName = "find"
      const expectReturn = mockDatabase
      sandbox.stub(
        todoRepository.schedule,
        functionName
      ).returns(expectReturn)

      const result = todoRepository.list()
      expect(result).to.be.deep.equal(expectReturn)
      expect(todoRepository.schedule[functionName].calledOnce).to.be.ok



    })
    it('should call insertOne from lokjs ',()=>{

      const functionName = "insertOne"
      const expectReturn = true
      

      sandbox.stub(
        todoRepository.schedule,
        functionName
      ).returns(expectReturn)

      const data ={
       name:"xuxaDaSilva",
       age:40 
      }

      const result = todoRepository.create(data)

      expect(result).to.be.ok
      expect(todoRepository.schedule[functionName].calledOnceWithExactly(data)).to.be.ok





    })
   


  })





})

