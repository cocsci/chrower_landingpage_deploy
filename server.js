const express = require("express");
var request = require("request");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.get("/", function (req, res) {
  res.render("index");
});

const port = 3000;

app.post("/", function (req, res) {
  const params = {
    url: "https://60xnvroedk.execute-api.eu-central-1.amazonaws.com/dev/emails",
    headers: { "Content-Type": "application/json" },
    json: req.body,
  };

  request.post(params, function (awserr, awsres, awsbody) {
    if (awserr) {
      let errorText = "Ein Fehler ist bei der Anmeldung passiert!";
      res.render("index", { signup: null, error: errorText });
    } else {
      let signupText = "Herzlichen Dank für anmelden!";
      res.render("index", { signup: signupText, error: null });
    }
  });
});

app.post("/unsubscription", function (req, res) {
  const params = {
    url: "https://60xnvroedk.execute-api.eu-central-1.amazonaws.com/dev/emails",
    headers: { "Content-Type": "application/json" },
    json: req.body,
  };
  request.delete(params, function (awserr, awsres, awsbody) {
    if (awserr) {
      let errorText = "Ein Fehler ist bei der Abmeldung passiert!";
      res.render("unsubscription", { unsubscription: null, error: errorText });
    } else {
      let unsubscriptionText = "Deine Daten wurden erfolgreich gelöscht.";
      res.render("unsubscription", {
        unsubscription: unsubscriptionText,
        error: null,
      });
    }
  });
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

app.use((req, res,next)=>{
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("Example app listening on port " + port.toString() + "!");
});
