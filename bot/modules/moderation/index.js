function shouldDelete(message) {
   const regexPattern = /badword|anotherbadword/gi;
   return regexPattern.test(message.content);
}

module.exports = {
   shouldDelete
}