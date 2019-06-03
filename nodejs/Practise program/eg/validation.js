const express = require("express");
const Joi = require("joi");
const schema ={
    name:Joi.string().min(3).required(),
    password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
}
const result = Joi.validate(login,schema);
if(result.error){
console.log("the validation error");
return;
};
const res =login("ajith","ajith");
function login(name,password)  {
    console.log(name);
    console.log(password);
};