function handleNotif(io, payload) {
  console.log('Got notification')
  const receivers = payload.receivers
  for (let userId in receivers){
    // craft the payload
    const data = {
      message: payload.message,
      video_id: payload.video_id,
      timestamp: payload.timestamp,
    }
    
    io.emit(
      userId, // emit to the channel of that userId
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