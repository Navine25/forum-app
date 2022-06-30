const user = require("../model/User")

describe('Register', function() {
    describe('#save()', function(){
        it('should save without error', function(done){
            var new_user = new user({user_name: 'luna', password:'luna'})
            new_user.save(done)
        })
    })
})