const fetch = require('node-fetch');

async function getZhihuColumn(id) {
  const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

// 用法一： catch 捕捉 err
// getZhihuColumn('feweekly123')
//   .then(column => {
//     console.log(`NAME: ${column.title}`);
//     console.log(`INTRO: ${column.intro}`);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// 用法二： try catch
const showColumnInfo = async id => {
  try {
    const column = await getZhihuColumn(id);
    console.log(`NAME: ${column.title}`);
    console.log(`INTRO: ${column.intro}`);
  } catch (err) {
    console.error(err);
  }
};

showColumnInfo('feweekly123');
