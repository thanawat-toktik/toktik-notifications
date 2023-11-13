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
  io.emit(
    `video-comment-${payload.video_id}`,
    payload, // didnt even bother removing video_id B)
  );
}

module.exports = {
  handleNotif,
  handleComment,
};
