describe('A Validation', function() {

    beforeEach(function() {
      this.addMatchers({
        toBeSuccess: function(expected) {
          return this.actual.isSuccess();
        },
        toBeSuccessWith: function(expected) {
            return this.actual.success() == expected
        },
        toBeFailure: function() {
            return this.actual.isFail()
        },
        toBeFailureWith: function(expected) {
          return this.actual.fail() == expected
        }
      });
    });
    var successString = Validation.success("abcd")
    describe('that is successful', function() {
      it('will be transformed by a map', function() {
         expect(successString.map(function(val){
              return val.length
         })).toBeSuccessWith(4)
      })
      it('will return true when isSuccess is called',function(){
        expect(successString.isSuccess()).toBeTruthy()
      })
      it('will return value when success is called',function(){
        expect(successString.success()).toBe("abcd")
      })
      it('will return false when isFail is called', function(){
        expect(successString.isFail()).toBeFalsy()
      })
      it('will throw error when fail() is called', function() {
        expect(successString.fail).toThrow('Illegal state. Cannot call fail() on a Validation.success')
      })
      it('will be transformed by a bind', function(){
        expect(successString.bind(function(val){
          return Validation.success("efgh")
        })).toBeSuccessWith("efgh")
        expect(successString.bind(function(val){
          return Validation.fail("big fail")
        })).toBeFailureWith("big fail")  
      })
    })

    var failString = Validation.fail("error dude")
    describe('that is a failure',function() {
      it('will not be transformed by a map', function() {
        expect(failString.map(function(val){return "butterfly"})).toBeFailureWith("error dude")
      })
      it('will not be transformed by a bind', function(){
        expect(failString.bind(function(val){return Validation.success("efgh")})).toBeFailureWith("error dude")
        expect(failString.bind(function(val){return Validation.fail("big fail")})).toBeFailureWith("error dude")  
      })
      it('will return false when isSuccess is called',function(){
        expect(failString.isSuccess()).toBeFalsy()
      })
      it('will return error value when fail() is called',function(){
        expect(failString.fail()).toBe("error dude")
      })
      it('will return true when isFail is called', function(){
        expect(failString.isFail()).toBeTruthy()
      })
      it('will throw error when success() is called', function() {
        expect(failString.success).toThrow('Illegal state. Cannot call success() on a Validation.fail')
      })

    })
})