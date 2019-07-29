queryActive = (db, id, name, io) => {
  data = [{ user_id: id, company_name: name }];
  console.log("iddddddddd", id);
  db.select("*")
    .from("activeusers")
    .where("user_id", "=", id)
    .then(user => {
      if (user.length == 0) {
        db("activeusers")
          .insert(data)
          .then(() => {
            console.log("data inserted");
            idOperation(db, "fetch", name, io);
          })
          .catch(err => console.log(err));
      } else {
        idOperation(db, "fetch", name, io);
      }
    })
    .catch(err => console.log(err));
};

idOperation = (db, event, name, io) => {
  if (event == "decrease") console.log("here!");
  db("activeusers")
    .count("*", { as: "count" })
    .where("company_name", name)
    .then(cnt => {
      io.emit(event, cnt[0].count);
    })
    .catch(err => console.log(err));
};

handleActive = (io, name, id, db) => {
  queryActive(db, id, name, io);
  io.on("connection", socket => {
    console.log("connected");
    socket.on("disconnect", () => {
      db("activeusers")
        .where("user_id", id)
        .del()
        .then(res => {
          // console.log("fgfgfff" + res);
        });
      //console.log("sdadfdafaf" + x);

      idOperation(db, "decrease", name, io);
      console.log("disconnected");
    });
  });
};

updateViews = (db, name) => {
  db("companies")
    .where("name", name)
    .increment("total_views", 1)
    .catch(err => console.log(err));
};

handleCompany = (req, res, db, io) => {
  const { name } = req.params;
  const { id } = req.body;
  handleActive(io, name, id, db);
  console.log("1", name);
  updateViews(db, name);
  db.select("*")
    .from("companies")
    .where("name", name)
    .then(company => {
      if (company.length) res.json(company[0]);
      else res.status(400).json("not found");
    })
    .catch(err => res.status(400).json("error getting company"));
};

module.exports = {
  handleCompany: handleCompany
};
