function handleNotif(io, payload) {
  const receivers = payload.receivers
  for (let i in receivers){
    // craft the payload
    const data = {
      message: payload.message,
      video_id: payload.video_id,
      timestamp: payload.timestamp,
      notifId: payload.notification_ids[i],
    }
    
    io.emit(
      `user-${receivers[i]}`, // emit to the channel of that userId
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
