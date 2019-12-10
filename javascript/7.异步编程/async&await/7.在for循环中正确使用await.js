const fetch = require('node-fetch');

const sleep = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

async function getZhihuColumn(id) {
  await sleep(2000);
  const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
  const response = await fetch(url);
  return await response.json();
}

const showColumnInfo = async () => {
  console.time('showColumnInfo');
  const names = ['feweekly', 'toolingtips'];
  // 并行操作
  const promises = names.map(x => getZhihuColumn(x));
  for (const promise of promises) {
    // await 等待结果
    const column = await promise;
    console.log(`NAME: ${column.title}`);
    console.log(`INTRO: ${column.intro}`);
  }

  console.timeEnd('showColumnInfo');
};
showColumnInfo();
