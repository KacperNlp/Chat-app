const Channel = require("../models/Channel");

class ChannelRepository {
  constructor(model) {
    this.model = model;
  }

  create(newChannel) {
    const channel = { ...newChannel };
    console.log(channel);
    const channelModel = new this.model(channel);

    return channelModel.save();
  }

  findAll() {
    return this.model.find();
  }
}

module.exports = new ChannelRepository(Channel);
