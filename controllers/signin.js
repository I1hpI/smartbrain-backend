const handleSignin=(db,bcrypt)=>(req,res)=> {
  const{email,password}=req.body;
  if(!email ||  !password){
    return res.status(400).json('incorect form submission');
  }
  
    db.select('email','hash').from('login')
    .where('email','=', email)
    .then(data=>{
      // compare if the above received data matches with the hashed password created by bycrypt
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid)
      {
       return db.select('*').from('users')
        .where('email','=',email)
        .then(user=>{
          res.json(user[0])
        })
        .catch(err=>res.status(400).json('unable to get user'))
      }
      else{
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err=>res.status(400).json('wrong credentials'))
}
module.exports={
    handleSignin:handleSignin}