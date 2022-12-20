import React, { useState } from "react";

const Signup = () => {
  const[email,setEmail]=useState("")
  const[password, setPassword]=useState("")
let handleSubmit=(e)=>{
e.preventDefault()
fetch("https://3001-4geeksacade-reactflaskh-357abplvep3.ws-us79.gitpod.io/api/signup", {
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({
    email:email,
    password:password

  })
}).then(response=>response.json()).then(result=>console.log(result))
}
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" class="btn btn-primary">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
