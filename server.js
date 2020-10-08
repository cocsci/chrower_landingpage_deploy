const express = require("express");
var request = require("request");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.get("/", function (req, res) {
  res.render("index");
});

app.post("/", function (req, res) {
  const params = {
    url: "https://60xnvroedk.execute-api.eu-central-1.amazonaws.com/dev/emails",
    headers: { "Content-Type": "application/json" },
    json: req.body,
  };
  console.log(req.body);
  request.post(params, function (awserr, awsres, awsbody) {
    if (awserr) {
      console.log("------error------", awserr);
      let errorText = "Ein Fehler ist bei der Anmeldung passiert!";
      res.render("index", { signup: null, error: errorText });
    } else {
      console.log("------success--------", awsbody);
      let signupText = "Herzlichen Dank für anmelden!";
      res.render("index", { signup: signupText, error: null });
    }
  });
});

app.post("/unsubscription", function (req, res) {
  let unsubscriptionText = "Deine Daten wurden erfolgreich gelöscht.";
  res.render("unsubscription", {
    unsubscription: unsubscriptionText,
    error: null,
  });
  // const params = {
  //   url: "https://60xnvroedk.execute-api.eu-central-1.amazonaws.com/dev/emails",
  //   headers: { "Content-Type": "application/json" },
  //   json: req.body,
  // };
  // console.log(req.body);
  // request.post(params, function (awserr, awsres, awsbody) {
  //   if (awserr) {
  //     console.log("------error------", awserr);
  //     let errorText = "Ein Fehler ist bei der Abmeldung passiert!";
  //     res.render("index", { unsubscription: null, error: errorText });
  //   } else {
  //     console.log("------success--------", awsbody);
  //     let unsubscriptionText = "Deine Daten wurden erfolgreich gelöscht.";
  //     res.render("index", { unsubscription: unsubscriptionText, error: null });
  //   }
  // });
});

app.get("/impressum", function (req, res) {
  res.render("impressum");
});

app.get("/unsubscription", function (req, res) {
  res.render("unsubscription");
});

app.get("/datenschutz", function (req, res) {
  res.render("datenschutz");
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
