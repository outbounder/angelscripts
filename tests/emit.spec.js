describe("angelscripts emit", function(){

  var Angel = require("organic-angel")
  
  it("does emit to Angel's plasma", function(next){
    var instance = new Angel({scripts:[__dirname+"/../src/emit"]})
    instance.plasma.on("ready", function(){
      instance.plasma.on("test", function(c, next){
        expect(c.property).toBe("test")
        next(c)
      })
      instance.do("emit -type test -property test", function(err, result){
        expect(err).toBe(null)
        expect(result.property).toBe("test")
        next()
      })  
    })
  })

})