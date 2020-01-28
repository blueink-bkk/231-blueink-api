
module.exports = function(req,res) {
  console.log(`ping => device-type:${req.device.type} dev:`,req.device)
  res.status(200)
  .end('pong');
};
