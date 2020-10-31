// Simple example of creating a Promise and then calling and using the then() to handle it.
// with a promise the pending promise is returned immediately and then the actions will start
// if condition or action is satisfied the resolve function is called, and the value passed is sent to the then() method.


// EXAMPLE ONE ///////////
const testAPromise = (x) => {
    return new Promise(function(resolve, reject){
        if(x===1){                        // here you can complete an action and if it works call the resolve method
            resolve("The value was 1");
        } else {
            reject("the value was not 1");   // if the action fails we call the reject method.
        }
    });
}

testAPromise(1).then(value => {
    console.log(value);
}).catch(err => {
    console.log(err);
})


testAPromise(2).then(value => {
    console.log(value);
}).catch(err => {
    console.log(err);
})


// EXAMPLE TWO /////    using arrow function

const promiseExampleTwo = (x) => {
    return new Promise((res, rej) => {
        if(x ===1){
            res("the promise worked!");
        } else {
            rej("went wrong");
        }
    })
}

promiseExampleTwo(1).then(val => {
    console.log(val);
}).catch(err => {
    console.log(err);
})