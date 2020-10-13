const express = require("express");
var request = require("request");

const app = express();
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const port = 3000;

app.locals.signup_success = false;
app.locals.signup_error = false;
app.locals.unsubscribe_success = false;
app.locals.unsubscribe_error = false;
app.locals.signup_restart = false;
app.locals.unsubscribe_restart = false;

app.get("/", function (req, res) {
  //TODO: Log in the server
  if(app.locals.signup_restart)
  {
    app.locals.signup_restart = false;
    app.locals.signup_success = false;
    app.locals.signup_error = false;
    res.render("index");
  }
  else
  {
    if(app.locals.signup_error || app.locals.signup_success)
    {
      app.locals.signup_restart = true;
    }
    res.render("index");
  }
});

app.post("/", function (req, res) {
  const params = {
    url: "https://60xnvroedk.execute-api.eu-central-1.amazonaws.com/dev/emails",
    headers: { "Content-Type": "application/json" },
    json: req.body,
  };

  //TODO: Log in the server
  request.post(params, function (awserr, awsres, awsbody) {
    if (awserr) {
      app.locals.signup_error = true;
      app.locals.signup_success = false;
      res.redirect("/");
    } else {
      app.locals.signup_success = true;
      app.locals.signup_error = false;
      res.redirect("/");
    }
  });
});

app.post("/unsubscription", function (req, res) {
  const params = {
    url: "https://60xnvroedk.execute-api.eu-central-1.amazonaws.com/dev/emails",
    headers: { "Content-Type": "application/json" },
    json: req.body,
  };

  //TODO: Log in the server
  request.delete(params, function (awserr, awsres, awsbody) {
    if (awserr) {
      let errorText = "Ein Fehler ist bei der Abmeldung passiert!";
      app.locals.unsubscribe_success = false;
      app.locals.unsubscribe_error = true;
      res.redirect("unsubscription");
    } else {
      let unsubscriptionText = "Deine Daten wurden erfolgreich gelöscht.";
      app.locals.unsubscribe_success = true;
      app.locals.unsubscribe_error = false;
      res.redirect("unsubscription");
    }
  });
});

app.get("/impressum", function (req, res) {
  res.render("impressum");
});

app.get("/unsubscription", function (req, res) {
  //TODO: Log in the server
  if(app.locals.unsubscribe_restart)
  {
    app.locals.unsubscribe_restart = false;
    app.locals.unsubscribe_success = false;
    app.locals.unsubscribe_error = false;
    res.render("unsubscription");
  }
  else
  {
    if(app.locals.unsubscribe_error || app.locals.unsubscribe_success)
    {
      app.locals.unsubscribe_restart = true;
    }
    res.render("unsubscription");
  }
});

app.get("/datenschutz", function (req, res) {
  res.render("datenschutz");
});

app.use((req, res,next)=>{
  //TODO: Log in the server
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("Chrower webs server listening on port " + port.toString() + "!");
});
