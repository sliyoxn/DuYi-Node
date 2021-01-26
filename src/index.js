const mysql = require("mysql2/promise");
const pool = mysql.createPool({
    host : "localhost",
    user : "snow",
    password: "snow",
    database : "library",
    multipleStatements : true
});
(async () => {
    try {
        let [result] = await pool.execute("select * from book where quantity > ?", ['1']);
        console.log(result);
    }catch (e) {
        console.log(e);
    }
})()



// const pool = mysql.createPool({
//     // 数据库连接的主机，可以是本机也可以是远程的
//     host: "localhost",
//     user: "root",
//     password: "a1b2c3",
//     database: "library",
//     multipleStatements: true,
// });

// 你可以直接使用sql语句查询
// // 也可以使用参数来拼接，这种方式可以防止sql注入
// connection.query('SELECT * FROM `book` WHERE `BookId` > ? and Quantity > ?', [1, 7], (err, result) => {
//     console.log(result);
// });
// // 删除
// // connection.query("delete from user where username = ?", ['Sakura'],(err, result) => {
// //     console.log("删除成功");
// //     console.log(result);
// // })
// // 插入
// connection.query('insert into user(username, phone, authority) value (\'Sakura\', \'13184574124\', 0)', (err, res) => {
//     console.log("插入成功");
//     console.log(res);
// });
// // 使用参数插入
// connection.query('insert into user(username, phone, authority) value (?, ?, ?)', ['Sakura', '13184574124', 0], (err, result) => {
//     console.log("插入成功");
//     console.log(result);
// });

// 更新
// connection.query("update authority = 1 from user where username = ?", ['Sakura'], (err, result) => {
//     console.log("更新成功", result);
// })
//
// connection.query()

// connection.query("insert into")



// async function test(id) {
//   // 创建一个数据库连接
//   const sql = `select * from employee where \`name\` like concat('%', ?, '%') ;`;
//   const [results] = await pool.execute(sql, [id]);
//   console.log(results);
// }
// test("袁");
