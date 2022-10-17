# Shell 脚本

## 基本使用

```sh
# sh build.sh author by yanyue404
# 变量定义
_param1="Hello";
_param2="World!";
a=10
b=20

# 使用变量
echo $_param1
echo ${_param1}

# echo 传递参数
echo -e "\"Shell 传递参数实例！\"\n"
echo "参数个数为：$#";
echo "执行的文件名: $0"
echo "第一个参数为: $1"
echo "第二个参数为: $2"
echo "第三个参数为: $3"

# 双引号里可以有变量，双引号里可以出现转义字符
# 拼接字符串
echo "$_param1 ${_param2} $3"

# if 语句

if [ $a == $b ]
then
   echo "a 等于 b"
fi
if [ $a != $b ]
then
   echo "a 不等于 b"
fi

# if else 语句

if [[ $_param1 == $_param2 ]]
then
    echo "相等的 command"
else
    echo "不相等的 command"
fi

# if else-if else 语句

if [ $a == $b ]
then
   echo "a 等于 b"
elif [ $a -gt $b ]
then
   echo "a 大于 b"
elif [ $a -lt $b ]
then
   echo "a 小于 b"
else
   echo "没有符合的条件"
fi

# 文件测试

if test -e ./README.md
then
   echo "文件已存在！"
else
   echo "文件不存在！"
fi

if test -d ./docs
then
   echo "文件目录已存在！"
else
   echo "文件目录不存在！"
fi
```

## 示例 Demo

**自动打版本 tag**

```sh
#  git 项目自动标记 tag: 
#  新增 tag： sh deploy-tag v1.0 feat:备注信息
#  删除 tag： sh deploy-tag v1.0 --delete

if test -d .git
then
   git pull
   echo -e "\n# 项目 tag 版本信息：\n"
   git tag
else
   echo "该仓库 不是一个 git Repo !"
   exit
fi

if [[ $1 && $# == 1 ]]

then 
    echo -e "\n# 新建 tag $1 并提交到远端:\n"

    git tag $1
    git push origin $1

elif [[ $1 && $2 != "--delete" ]]
then 
    echo -e "\n# 新建 tag $1 （附备注）并提交到远端:\n"

    git tag -a $1 -m $2
    git push origin $1

elif [[ $1 && $2 == "--delete" ]]
then
    echo -e "\n# 删除本地及远程 tag $1: \n"

    git tag -d $1
    git push origin :refs/tags/$1

     echo -e "\n# 更新后的项目 tag 版本信息：\n"
    git tag

elif [[ $2 != "--delete" ]]
then
    echo "输入的命令暂不支持。"
else 
    echo "请输入新建 tag 的版本号。"
fi
```

**测试与生产环境打包**

```sh

echo "node -v"

node -v

_param=$1@second=$2@third@$3

cd TODO && dir

echo "build.sh 参数来了："
echo -e "\n${_param}\n"

if [[ $1 == "dev" ]]; then
    echo '开始编译测试环境'
    cross-env PATH_TYPE=trial nuxt generate
#   执行测试打包命令
    echo "{\"code\": 0, \"message\": \"编译成功\"}" >> ./build.log.json
    exit
fi

if [[ $1 == "generate" ]]; then
    echo '开始编译生产环境'
#   执行生产打包命令
    npm -v
    cross-env PATH_TYPE=production  nuxt generate
    exit
fi

echo '请指定编译模式 dev 或 generate'
```

**build.js 传参编译**

```sh
# sh build.sh @tkProductId=S202006334@pd=@env=dev tkProperty/nprd/S202006334 1634021630771

echo "npm install"
npm install

# sh build.sh $customParam $desUrl $timeStamp
_param=$1@BASE_URL=$2@JENKINS_TIME=$3

# buiuld.js params
echo "node build.js "${_param}
node build.js ${_param}
```

**复制文件夹**

```sh
# sh build.sh

echo "克隆仓库..."
git clone -b dev http://gitlab.it.taikang.com/tk-online/tf/common/tk-common.git .stash

echo "cp -rvf .stash/common/. .test"
cp -rvf .stash/common/. .test

echo "移除 .stash"
rm -rf .stash
```
