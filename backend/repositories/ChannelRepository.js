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

    const channelsList = channels.map(
      ({ _id, author, addedUsers, name, messages }) => ({
        _id,
        author,
        addedUsers,
        name,
        lastMessage: messages.slice(-1)[0],
      })
    );

    return channelsList;
  }

  async getAllMessagesForChannel(req) {
    const { roomId } = req.query;
    const channel = await this.model.findById(roomId);

    return channel.messages;
  }

  async setMessage(newMessage, roomId) {
    const channel = await this.model.findById(roomId);

    if (channel) {
      channel.messages.push(newMessage);

      await channel.save();
    }
  }
}

module.exports = new ChannelRepository(Channel);
