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
  // 串行
  const feweekly = await getZhihuColumn('feweekly');
  const toolingtips = await getZhihuColumn('toolingtips');

  // 并行
  // const feweeklyPromise = getZhihuColumn('feweekly');
  // const toolingtipsPromise = getZhihuColumn('toolingtips');
  // const feweekly = await feweeklyPromise;
  // const toolingtips = await toolingtipsPromise;

  console.log(`NAME: ${feweekly.title}`);
  console.log(`INTRO: ${feweekly.intro}`);

  console.log(`NAME: ${toolingtips.title}`);
  console.log(`INTRO: ${toolingtips.intro}`);

  console.timeEnd('showColumnInfo');
};
showColumnInfo();
