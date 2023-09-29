const forwardNeedSchema = new Schema({
    name:{
      userName: {type: String},
      password: {type: String},
      email: {type: String},
    },
    location : {
      type: String,
    },
    savingAmount: {
      type: Number,
    },
    image: {
      type: String,
    },
  });
  
  const ForwardNeed = mongoose.model('ForwardNeed', forwardNeedSchema);
  
  module.exports = {
    User: User,
    ForwardNeed: ForwardNeed,
  };
  
  