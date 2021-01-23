const {describe,it,afterEach} = require('mocha')
const {expect} = require('chai')
const Todo = require('../src/todo')
const {createSandbox} = require('sinon')



describe('todo',()=>{
  let sandbox
  beforeEach(()=>{
    sandbox = createSandbox()
  })
  afterEach(()=>sandbox.restore())

  describe('#isValid',()=>{

    it('should return invalid when creating an object without text',() =>{
      const data =  {  
          text:'',
          when: new Date("2021-12-10") 
          }
     
      const todo = new Todo(data)
      const result = todo.isValid()
      expect(result).to.be.not.ok
      
      


    })

    it('should return invalid when creating an object using the "when" property invalid',()=>{

      const data =  {  
        text:'Teste',
        when: new Date("20-12-10") 
        }
      const todo = new Todo(data)
      const result = todo.isValid()
      expect(result).to.be.not.ok
    })

    it('should have "id","text", "when" and "status"properties after creating object ',()=>{

      const data =  {  
        text:'Teste',
        when: new Date("2021-12-10") 
        }

        const expectedId = '000001'

      // Como a validação so corresponde a este teste será importado o uuid 
      const uuid = require('uuid')
      const fakeUUID = sandbox.fake.returns(expectedId)
      sandbox.replace(uuid,"v4",fakeUUID)

      const todo = new Todo(data)
      const expectedItem ={
        text:data.text,
        when:data.when,
        status:"",
        id:expectedId
      }
      const result = todo.isValid()
      expect(result).to.be.ok

      expect(uuid.v4.calledOnce).to.be.ok
      expect(todo).to.be.deep.equal(expectedItem)
     

    } )



  })


})