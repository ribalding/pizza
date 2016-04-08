//Business Logic

//Pizza Object Constructor
function Pizza(passSize, passToppings) {
  this['pizzaSize'] = passSize;
  this['toppings'] = passToppings;
  this['price'] = 0;
}

Pizza.prototype.calculatePrice = function(){
  if (this.pizzaSize === "small"){
    this.price += 10;
  } else if (this.pizzaSize === "medium"){
    this.price += 12;
  } else if (this.pizzaSize === "large"){
    this.price += 15;
  }

  for(var i = 0; i < 2; i += 1){
    if (this.toppings[i] === "pepperoni"){
      this.price += 2;
    } else if (this.toppings[i] === "peppers"){
      this.price += 1;
    } else if(this.toppings[i] === "onions"){
      this.price += 1;
    } else if (this.toppings[i] === "chicken"){
      this.price += 3;
    }
  }
  return this.price;
}

//Customer Object Constructor
function Customer(passedName, passedAddress, passedPhone) {
  this['customerName'] = passedName;
  this['address'] = passedAddress;
  this['phone'] = passedPhone;
}

//UI Logic

$(document).ready(function() {
  $("form#pizzaForm").submit(function(event){
    event.preventDefault();

    //Hide Input Form and Show Receipt
    $('#formDiv').hide();
    $('#receiptDiv').show();

    //Creates new Pizza Object
    var inputPizzaSize = $("#pizzaSize").val();
    var inputToppings = [];
    inputToppings.push($("#toppingOne").val());
    inputToppings.push($("#toppingTwo").val());
    var newPizza = new Pizza(inputPizzaSize, inputToppings);

    //Create New Customer Object
    var inputName = $("#name").val();
    var inputPhone = $("#phone").val();
    var inputAddress = [];
    inputAddress.push($("#street").val());
    inputAddress.push($("#city").val());
    inputAddress.push($("#state").val());
    inputAddress.push($("#zip").val());
    newCustomer = new Customer(inputName, inputAddress, inputPhone);

    //Creates Receipt
    $(".outputName").text(newCustomer.customerName);
    $(".outputSize").text(newPizza.pizzaSize);
    if (newPizza.toppings[0] !== "none" && newPizza.toppings[1] !== "none"){
      $(".outputToppings").text(" with " + newPizza.toppings[0] + " and " + newPizza.toppings[1]);
    } else if (newPizza.toppings[0] !== "none" && newPizza.toppings[1] === "none" ){
      $(".outputToppings").text(" with " + newPizza.toppings[0]);
    }
    $(".outputPrice").text("$" + newPizza.calculatePrice());
    $(".outputStreet").text(newCustomer.address[0]);
    $(".outputCity").text(newCustomer.address[1]);
    $(".outputState").text(newCustomer.address[2]);
    $(".outputZip").text(newCustomer.address[3]);


  });
});
