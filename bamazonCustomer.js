const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sammy@7917",
    database: 'bamazon'
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    start();
  });


  function start (){
      con.query('SELECT * FROM products', function(err, result){
          console.table(result);
          inquirer.prompt([
              {
                  type: 'input',
                  name: 'id',
                  message: 'What is the id of the item you would like to purchase'
              },
              {
                type: 'input',
                name: 'qty',
                message: 'How many would you like?'
            }
          ]).then(function(answer){
              console.log(answer);
              con.query('SELECT * FROM products WHERE id=' + answer.id, function(err, response){
                  console.log(response[0], "this should be the item that we picked")
                  const quantity = response[0].stock_qty;
                  if(answer.qty <= quantity){
                      const newQuantity = parseInt(quantity) - parseInt(answer.qty)
                      con.query('UPDATE products SET stock_qty=' + newQuantity + ' WHERE id =' + answer.id , function(err, r){
                        console.log(answer, "Order succesful");
                        console.log(response[0], "this should be the object");
                        console.log(`You purchased ${answer.qty} of product: ${response[0].product_name} for ${response[0].price} per item.`)
                    });
                  }else {
                      console.log("unable to fulfill");
                  }

              })

            })
      })
  }