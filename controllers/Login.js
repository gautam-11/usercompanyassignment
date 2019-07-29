const validateLoginInput = require("../validation/login");
const jwt = require("jsonwebtoken");
handleLogin = (req, res, db, bcrypt) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { username, password } = req.body;
  console.log(username, password);

  db.select("*")
    .from("users")
    .where("username", "=", username)
    .then(data => {
      console.log("1", data);
      const isValid = bcrypt.compareSync(password, data[0].password);

      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("username", "=", username)
          .then(user => {
            //Create payload
            const payload = {
              id: user[0].user_id,
              username: user[0].username
            };
            // Create JWT Payload
            // Sign token
            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({ success: true, token: "Bearer " + token });
              }
            );
          })
          .catch(err => res.status(400).json("unable to fetch user"));
      } else {
        errors.password = "Password incorrect";
        res.status(400).json(errors);
      }
    })
    .catch(err => res.status(400).json("wrong credentials"));
};

module.exports = {
  handleLogin: handleLogin
};
