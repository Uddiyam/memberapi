module.exports = {
  memberList: `select * from members where id=?`,
  idList: `select id from members where id=?`,
  memberInsert: `insert into members set ?`,
  memberUpdate: `update members set ? where id=?`,
  memberDelete: `delete from members where id=?`,
};
