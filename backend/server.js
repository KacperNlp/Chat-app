const createError = require("http-errors");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const { Server } = require("socket.io");

const config = require("./config/Config");

//routes
const channelRoutes = require("./routes/ChannelRoutes");
const userRoutes = require("./routes/UserRoutes");

const app = express();

mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/channels", channelRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const server = app.listen(config.APP_PORT, () => {
  console.log(`Apliakcja nasłuchuje na porcie: ${config.APP_PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
  },
});

io.on("connection", function (socket) {
  socket.on("joinRoom", ({ user, roomId }, callback) => {
    console.log(`${user} join to room`);
  });

  socket.on("leaveRoom", ({ user, roomId }, callback) => {
    console.log("User leave the room");
  });

  socket.on("disconnect", () => {
    console.log(`user ${socket.id} disconnected`);
  });
});

module.exports = app;
