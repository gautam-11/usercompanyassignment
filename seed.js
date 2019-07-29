const bcrypt = require("bcrypt-nodejs");
const options = {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "23571113",
    database: "user_company"
  }
};
const knex = require("knex")(options);

// knex.schema
//   .createTable("activeusers", table => {
//     table.integer("user_id");
//     table.string("company_name");
//   })
//   .then(() => console.log("table created"))
//   .catch(err => {
//     console.log(err);
//     throw err;
//   });
// let pwdarr = ["password123", "password234", "password345", "password456"];
// let hashpwd = [];
// for (let i = 0; i < pwdarr.length; i++) {
//   let salt = bcrypt.genSaltSync(10);
//   console.log(pwdarr[i]);
//   let hash = bcrypt.hashSync(pwdarr[i], salt);
//   hashpwd.push(hash);
// }
// console.log(hashpwd);

// knex.schema
//   .createTable("users", table => {
//     table.increments("user_id");
//     table.string("username");
//     table.string("name");
//     table.string("image");
//     table.string("role");
//     table.string("password");
//     table.string("company_name");
//     table.unique("username");
//   })
//   .then(() => console.log("table created"))
//   .catch(err => {
//     console.log(err);
//     throw err;
//   });

const users = [
  {
    user_id: "1",
    company_name: "Google"
    //status: "active"
  },
  {
    user_id: "2",
    company_name: "Facebook"
    //status: "active"
  },
  {
    user_id: "3",
    company_name: "Google"
    //status: "active"
  }
];

knex("activeusers")
  .insert(users)
  .then(() => console.log("data inserted"))
  .catch(err => {
    console.log(err);
    throw err;
  });

// knex.schema
//   .createTable("companies", table => {
//     table.increments("company_id");
//     table.string("name");
//     table.string("logo");
//     table.string("address");
//     table.integer("total_views");
//     table.unique("name");
//   })
//   .then(() => console.log("table created"))
//   .catch(err => {
//     console.log(err);
//     throw err;
//   });

// const companies = [
//   {
//     name: "Google",
//     logo:
//       "https://cdn.pixabay.com/photo/2017/01/19/09/11/logo-google-1991840__340.png",
//     address: "Mountain View",
//     total_views: 10
//   },
//   {
//     name: "Facebook",
//     logo:
//       "https://cdn.pixabay.com/photo/2013/01/29/09/09/social-network-76532__340.png",
//     address: "California",
//     total_views: 0
//   }
// ];
// knex("companies")
//   .insert(companies)
//   .then(() => console.log("data inserted"))
//   .catch(err => {
//     console.log(err);
//     throw err;
//   });
