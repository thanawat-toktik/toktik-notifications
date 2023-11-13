function handleNotif(io, payload) {
  console.log('Got notification')
  const receivers = payload.receivers
  for (let userId of receivers){
    // craft the payload
    const data = {
      message: payload.message,
      video_id: payload.video_id,
      timestamp: payload.timestamp,
    }
    
    io.emit(
      `user-${userId}`, // emit to the channel of that userId
      data
    );
  }
  
}

function handleComment(io, payload) {
  console.log('Got comment')
}

module.exports = {
  handleNotif,
  handleComment,
};
