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
  //  方法一：await
  // const [feweekly, toolingtips] = await Promise.all([
  //   getZhihuColumn('feweekly'),
  //   getZhihuColumn('toolingtips'),
  // ]);

  // console.log(`NAME: ${feweekly.title}`);
  // console.log(`INTRO: ${feweekly.intro}`);

  // console.log(`NAME: ${toolingtips.title}`);
  // console.log(`INTRO: ${toolingtips.intro}`);
  // console.timeEnd('showColumnInfo');

  // 方法二：then
  Promise.all([getZhihuColumn('feweekly'), getZhihuColumn('toolingtips')]).then(
    ([feweekly, toolingtips]) => {
      console.log(`NAME: ${feweekly.title}`);
      console.log(`INTRO: ${feweekly.intro}`);
      console.log(`NAME: ${toolingtips.title}`);
      console.log(`INTRO: ${toolingtips.intro}`);
      console.timeEnd('showColumnInfo');
    },
  );
};
showColumnInfo();
