const createError = require("http-errors");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const { Server } = require("socket.io");

const channelRepository = require("./repositories/ChannelRepository");

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
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", function (socket) {
  socket.on("joinRoom", ({ userId, roomId }, callback) => {
    try {
      console.log("[socket]", "join room :", roomId);
      socket.join(roomId);
      socket.to(roomId).emit("user joined", userId);
    } catch (err) {
      console.log("[error] join room ", err);
      socket.emit("error", "couldnt perform requested action");
    }
  });

  socket.on("leaveRoom", ({ userId, roomId }, callback) => {
    try {
      console.log("[socket]", "leave room :", roomId);
      socket.leave(roomId);
      socket.to(roomId).emit("user left", userId);
    } catch (err) {
      console.log("[error] leave room ", err);
      socket.emit("error", "couldnt perform requested action");
    }
  });

  socket.on("send-message", ({ message, userId, username, roomId }) => {
    const newMessage = { message, userId, username };

    channelRepository.setMessage(newMessage, roomId);
    socket.to(roomId).emit("receive-message", newMessage);
  });

  socket.on("disconnect", () => {
    console.log(`user ${socket.id} disconnected`);
  });
});

module.exports = app;
