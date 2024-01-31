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

  async findAll(req) {
    const { userId } = req.query;
    const channels = (await this.model.find()).filter(
      (channel) =>
        channel.author === userId || channel.addedUsers.includes(userId)
    );

    return channels;
  }
}

module.exports = new ChannelRepository(Channel);
