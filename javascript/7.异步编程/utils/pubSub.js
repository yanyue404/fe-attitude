let eventMap = {};
function pub(msg, ...rest) {
  eventMap[msg] &&
    eventMap[msg].forEach(cb => {
      cb(...rest);
    });
}
function sub(msg, cb) {
  eventMap[msg] = eventMap[msg] || [];
  eventMap[msg].push(cb);
}
