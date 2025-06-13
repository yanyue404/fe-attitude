#!/bin/bash
##############################################################################
# 快捷键和历史记录
##############################################################################

CTRL+A  # 移动到行首
CTRL+B  # 向后移动一个字符
CTRL+C  # 停止当前命令
CTRL+D  # 向后删除一个字符或退出当前会话，类似于exit
CTRL+E  # 移动到行尾
CTRL+F  # 向前移动一个字符
CTRL+G  # 中止当前编辑命令并响铃
CTRL+H  # 删除光标下的一个字符（与DELETE相同）
CTRL+J  # 与RETURN相同
CTRL+K  # 删除（kill）从光标到行尾的内容
CTRL+L  # 清屏并重新显示当前行
CTRL+M  # 与RETURN相同
CTRL+N  # 命令历史中的下一行
CTRL+O  # 与RETURN相同，然后显示历史文件中的下一行
CTRL+P  # 命令历史中的上一行
CTRL+Q  # 恢复暂停的shell输出
CTRL+R  # 向后搜索
CTRL+S  # 向前搜索或暂停shell输出
CTRL+T  # 交换两个字符的位置
CTRL+U  # 从光标位置删除到行首
CTRL+V  # 使下一个输入的字符按字面意思输入
CTRL+W  # 删除光标前的单词
CTRL+X  # 列出当前单词可能的文件名补全
CTRL+Y  # 恢复（yank）最后删除的内容
CTRL+Z  # 停止当前命令，可用fg在前台恢复或bg在后台恢复

ALT+B   # 向后移动一个单词
ALT+D   # 删除下一个单词
ALT+F   # 向前移动一个单词
ALT+H   # 向后删除一个字符
ALT+T   # 交换两个单词的位置
ALT+.   # 粘贴上一个命令的最后一个单词。重复按下可遍历命令历史
ALT+U   # 将从当前光标位置到单词末尾的所有字符大写
ALT+L   # 将从当前光标位置到单词末尾的所有字符小写
ALT+C   # 将光标下的字母大写。光标随后移动到单词末尾
ALT+R   # 如果你编辑了从历史记录中获取的命令，则恢复任何更改
ALT+?   # 列出当前输入的可能补全
ALT+^   # 将行扩展为历史记录中最近的匹配

CTRL+X then (   # 开始录制键盘宏
CTRL+X then )   # 结束录制键盘宏
CTRL+X then E   # 回调最后录制的键盘宏
CTRL+X then CTRL+E   # 调用文本编辑器（由$EDITOR指定）编辑当前命令行，然后将结果作为shell命令执行
CTRL+A then D  # 从screen注销但不杀死它，如果有命令存在，它将继续运行

BACKSPACE  # 向后删除一个字符
DELETE     # 删除光标下的字符

history   # 显示命令行历史
!!        # 重复上一个命令
!<n>      # 引用第'n'行命令
!<string> # 引用以'string'开头的命令
esc :wq   # 退出并保存脚本

exit      # 退出当前会话


##############################################################################
# BASH基础
##############################################################################

env                 # 显示所有环境变量

echo $SHELL         # 显示你正在使用的shell
echo $BASH_VERSION  # 显示bash版本

bash                # 如果你想使用bash（输入exit返回之前打开的shell）
whereis bash        # 定位命令的二进制文件、源文件和手册页
which bash          # 找出哪个程序被执行为'bash'（默认：/bin/bash，在不同环境中可能会改变）

clear               # 清除窗口内容（隐藏显示的行）


##############################################################################
# 文件命令
##############################################################################


ls                            # 列出当前目录中的文件，ls <dir>打印特定目录中的文件
ls -l                         # 以'长格式'列出文件，包含文件的确切大小、所有者、权限和最后修改时间
ls -a                         # 以'长格式'列出所有文件，包括隐藏文件（以'.'开头的文件名）
ln -s <filename> <link>       # 创建文件的符号链接
readlink <filename>           # 显示符号链接指向的位置
tree                          # 以易读的文件树形式显示目录和子目录
mc                            # 终端文件浏览器（ncdu的替代品）
touch <filename>              # 创建或更新（编辑）文件
mktemp -t <filename>          # 在/tmp/中创建临时文件，下次启动时删除（-d创建目录）
cat <filename>                # 显示文件原始内容（不会被解释）
cat -n <filename>             # 显示行号
nl <file.sh>                  # 显示文件行号
cat filename1 > filename2     # 复制filename1到filename2
cat filename1 >> filename2    # 合并两个文件的文本
any_command > <filename>      # '>'用于执行重定向，将any_command的stdout设置为文件而不是"真正的stdout"（通常是/dev/stdout）
more <filename>               # 显示文件的第一部分（用空格键移动，输入q退出）
head <filename>               # 输出文件的前几行（默认：10行）
tail <filename>               # 输出文件的后几行（与-f选项一起使用很有用）（默认：10行）
vim <filename>                # 在VIM（VI iMproved）文本编辑器中打开文件，如果不存在则创建
mv <filename1> <dest>         # 将文件移动到目标位置，行为会根据'dest'类型改变（目录：文件放入目录；文件：文件将替换dest（提示：用于重命名很有用））
cp <filename1> <dest>         # 复制文件
rm <filename>                 # 删除文件
find . -name <name> <type>    # 在当前目录及其子目录中按名称搜索文件或目录
diff <filename1> <filename2>  # 比较文件，显示它们的差异
wc <filename>                 # 告诉你文件中有多少行、单词和字符。使用-lwc（行、单词、字符）只输出其中一项信息
sort <filename>               # 按字母顺序逐行排序文本文件内容，使用-n进行数字排序，-r反向排序
sort -t -k <filename>         # 使用字段分隔符t，从第1个字段开始在特定排序关键字段上排序内容
rev                           # 反转字符串字符（hello变成olleh）
chmod -options <filename>     # 让你更改文件的读、写和执行权限（更多信息：SUID、GUID）
gzip <filename>               # 使用gzip算法压缩文件
gunzip <filename>             # 解压缩由gzip压缩的文件
gzcat <filename>              # 让你查看gzip压缩文件而无需实际解压缩
lpr <filename>                # 打印文件
lpq                           # 检查打印机队列
lprm <jobnumber>              # 从打印机队列中删除某项
genscript                     # 将纯文本文件转换为postscript用于打印，并为你提供一些格式选项
dvips <filename>              # 打印.dvi文件（即LaTeX生成的文件）
grep <pattern> <filenames>    # 在文件中查找字符串

grep -nri 自学 docs | cat --number    # 阮一峰周刊搜索
  # - **`grep -nri css docs`**：
  #   - `grep`：文本搜索工具。
  #   - `-n`：显示匹配行的行号。
  #   - `-r`：递归搜索子目录。
  #   - `-i`：忽略大小写。
  #   - `css`：搜索目标关键词。
  #   - `docs`：搜索的目录。
  #   - **作用**：在`docs`目录及子目录中，递归搜索所有包含`css`（不区分大小写）的文本文件，并输出文件名、行号和匹配内容。

  # - **`| cat --number`**：
  #   - `|`：管道符，将前一个命令的输出作为后一个命令的输入。
  #   - `cat --number`：为输入内容添加全局行编号（类似`nl`命令）。
  #   - **作用**：对`grep`的搜索结果逐行编号，形成连续的序号列表。
  
grep -r <pattern> <dir>       # 在目录中递归搜索模式
head -n file_name | tail +n   # 打印文件的第n行
head -y lines.txt | tail +x   # 显示从第x行到第y行的所有行。这包括第x行和第y行

sed 's/<pattern>/<replacement>/g' <filename> # 将文件中的模式替换为替换值并输出到标准输出，s后面的字符(/)是分隔符
sed -i 's/<pattern>/<replacement>/g' <filename> # 就地将文件中的模式替换为替换值
echo "this" | sed 's/is/at/g' # 将输入流中的模式替换为替换值

##############################################################################
# 目录命令
##############################################################################


mkdir <dirname>               # 创建新目录
rmdir <dirname>               # 删除空目录
rmdir -rf <dirname>           # 删除非空目录
mv <dir1> <dir2>              # 将目录从<dir1>重命名为<dir2>
cd                            # 切换到家目录
cd ..                         # 切换到父目录
cd <dirname>                  # 切换目录
cp -r <dir1> <dir2>           # 将<dir1>复制到<dir2>，包括子目录
pwd                           # 告诉你当前所在位置
cd ~                          # 切换到家目录
cd -                          # 切换到上一个工作目录

##############################################################################
# SSH、系统信息和网络命令
##############################################################################


ssh user@host            # 以用户身份连接到主机
ssh -p <port> user@host  # 以用户身份在指定端口连接到主机
ssh-copy-id user@host    # 将你的ssh密钥添加到主机，为用户启用密钥或无密码登录

whoami                   # 返回你的用户名
su <user>                # 切换到不同用户
su -                     # 切换到root，可能需要sudo su -
sudo <command>           # 以root用户身份执行命令
passwd                   # 让你更改密码
quota -v                 # 显示你的磁盘配额
date                     # 显示当前日期和时间
cal                      # 显示月份日历
uptime                   # 显示当前运行时间
w                        # 显示谁在线
finger <user>            # 显示用户信息
uname -a                 # 显示内核信息
man <command>            # 显示指定命令的手册
info <command>           # 显示特定命令的另一个文档系统
help                     # 显示内置命令和函数的文档
df                       # 显示磁盘使用情况
du <filename>            # 显示文件名中文件和目录的磁盘使用情况（du -s只给出总计）
resize2fs                # ext2/ext3/ext4文件系统调整器
last <yourUsername>      # 列出你的最后登录记录
ps -u yourusername       # 列出你的进程
kill <PID>               # 杀死具有你给出ID的进程
killall <processname>    # 杀死具有该名称的所有进程
top                      # 显示你当前活动的进程
lsof                     # 列出打开的文件
bg                       # 列出停止或后台作业；在后台恢复停止的作业
fg                       # 将最近的作业带到前台
fg <job>                 # 将作业带到前台

ping <host>              # ping主机并输出结果
whois <domain>           # 获取域名的whois信息
dig <domain>             # 获取域名的DNS信息
dig -x <host>            # 反向查找主机
wget <file>              # 下载文件
netstat                  # 打印网络连接、路由表、接口统计信息、伪装连接和多播成员资格

time <command>           # 报告命令执行消耗的时间


##############################################################################
# 变量
##############################################################################


varname=value                # 定义变量
varname=value command        # 定义变量以在特定子进程的环境中
echo $varname                # 检查变量的值
echo $$                      # 打印当前shell的进程ID
echo $!                      # 打印最近调用的后台作业的进程ID
echo $?                      # 显示最后一个命令的退出状态
read <varname>               # 从输入读取字符串并将其分配给变量
read -p "prompt" <varname>   # 与上述相同，但输出提示要求用户输入值
column -t <filename>         # 以漂亮的列格式显示信息（通常与管道一起使用）
let <varname> = <equation>   # 使用+、-、*、/、%等运算符执行数学计算
export VARNAME=value         # 定义环境变量（在子进程中可用）
export -f  <funcname>        # 导出函数'funcname'
export var1="var1 value"     # 在同一语句中导出和分配
export <varname>             # 复制Bash变量
declare -x <varname>         # 复制Bash变量

array[0]=valA                # 如何定义数组
array[1]=valB
array[2]=valC
array=([2]=valC [0]=valA [1]=valB)  # 另一种方式
array=(valA valB valC)              # 还有另一种方式

${array[i]}                  # 显示此索引的数组值。如果未提供索引，则假定为数组元素0
${#array[i]}                 # 找出数组中任何元素的长度
${#array[@]}                 # 找出数组中有多少个值

declare -a                   # 变量被视为数组
declare -f                   # 仅使用函数名
declare -F                   # 显示函数名而不显示定义
declare -i                   # 变量被视为整数
declare -r                   # 使变量只读
declare -x                   # 标记变量以通过环境导出
declare -l                   # 变量中的大写值转换为小写
declare -A                   # 使其成为关联数组

${varname:-word}             # 如果varname存在且不为null，返回其值；否则返回word
${varname:word}              # 如果varname存在且不为null，返回其值；否则返回word
${varname:=word}             # 如果varname存在且不为null，返回其值；否则将其设置为word，然后返回其值
${varname:?message}          # 如果varname存在且不为null，返回其值；否则打印varname，然后是message并中止当前命令或脚本
${varname:+word}             # 如果varname存在且不为null，返回word；否则返回null
${varname:offset:length}     # 执行子字符串扩展。返回从offset开始长度为length的$varname子字符串

${variable#pattern}          # 如果模式匹配变量值的开头，删除匹配的最短部分并返回其余部分
${variable##pattern}         # 如果模式匹配变量值的开头，删除匹配的最长部分并返回其余部分
${variable%pattern}          # 如果模式匹配变量值的结尾，删除匹配的最短部分并返回其余部分
${variable%%pattern}         # 如果模式匹配变量值的结尾，删除匹配的最长部分并返回其余部分
${variable/pattern/string}   # 变量中与模式匹配的最长部分被字符串替换。只替换第一个匹配
${variable//pattern/string}  # 变量中与模式匹配的最长部分被字符串替换。替换所有匹配

${#varname}                  # 返回变量值作为字符串的长度

*(patternlist)               # 匹配给定模式的零次或多次出现
+(patternlist)               # 匹配给定模式的一次或多次出现
?(patternlist)               # 匹配给定模式的零次或一次出现
@(patternlist)               # 完全匹配给定模式之一
!(patternlist)               # 匹配除给定模式之一外的任何内容

$(UNIX command)              # 命令替换：运行命令并返回标准输出

typeset -l <x>                 # 使变量本地化 - <x>必须是整数

##############################################################################
# 函数
##############################################################################


# 函数通过位置引用传递的参数（就像它们是位置参数一样），即$1、$2等等。
# $@等于"$1" "$2"... "$N"，其中N是位置参数的数量。$#保存位置参数的数量。


function functname() {
  shell commands
}

unset -f functname  # 删除函数定义
declare -f          # 显示登录会话中定义的所有函数


##############################################################################
# 流程控制
##############################################################################


statement1 && statement2  # 与运算符
statement1 || statement2  # 或运算符

-a                        # 测试条件表达式内的与运算符
-o                        # 测试条件表达式内的或运算符

# 字符串

str1 == str2               # str1匹配str2
str1 != str2               # str1不匹配str2
str1 < str2                # str1小于str2（按字母顺序）
str1 > str2                # str1大于str2（按字母顺序）
str1 \> str2               # str1排在str2之后
str1 \< str2               # str1排在str2之前
-n str1                    # str1不为null（长度大于0）
-z str1                    # str1为null（长度为0）

# 文件

-a file                   # 文件存在或其编译成功
-d file                   # 文件存在且是目录
-e file                   # 文件存在；与-a相同
-f file                   # 文件存在且是常规文件（即不是目录或其他特殊类型的文件）
-r file                   # 你有读权限
-s file                   # 文件存在且不为空
-w file                   # 你有写权限
-x file                   # 你对文件有执行权限，或者如果它是目录则有目录搜索权限
-N file                   # 文件自上次读取以来已修改
-O file                   # 你拥有文件
-G file                   # 文件的组ID与你的匹配（或者如果你在多个组中，与你的其中一个匹配）
file1 -nt file2           # file1比file2新
file1 -ot file2           # file1比file2旧

# 数字

-lt                       # 小于
-le                       # 小于或等于
-eq                       # 等于
-ge                       # 大于或等于
-gt                       # 大于
-ne                       # 不等于

if condition
then
  statements
[elif condition
  then statements...]
[else
  statements]
fi

for x in {1..10}
do
  statements
done

for name [in list]
do
  statements that can use $name
done

for (( initialisation ; ending condition ; update ))
do
  statements...
done

case expression in
  pattern1 )
    statements ;;
  pattern2 )
    statements ;;
esac

select name [in list]
do
  statements that can use $name
done

while condition; do
  statements
done

until condition; do
  statements
done

##############################################################################
# 命令行处理周期
##############################################################################


# 命令查找的默认顺序是函数，然后是内置命令，最后是脚本和可执行文件。
# 有三个内置命令可用于覆盖此顺序：`command`、`builtin`和`enable`。

command  # 删除别名和函数查找。只执行内置命令和在搜索路径中找到的命令
builtin  # 只查找内置命令，忽略函数和在PATH中找到的命令
enable   # 启用和禁用shell内置命令

eval     # 获取参数并让它们再次通过命令行处理步骤


##############################################################################
# 输入/输出重定向
##############################################################################


cmd1|cmd2  # 管道；将cmd1的标准输出作为cmd2的标准输入
< file     # 从文件获取标准输入
> file     # 将标准输出定向到文件
>> file    # 将标准输出定向到文件；如果文件已存在则追加
>|file     # 即使设置了noclobber也强制标准输出到文件
n>|file    # 即使设置了noclobber也强制从文件描述符n输出到文件
<> file    # 将文件用作标准输入和标准输出
n<>file    # 将文件用作文件描述符n的输入和输出
n>file     # 将文件描述符n定向到文件
n<file     # 从文件获取文件描述符n
n>>file    # 将文件描述符n定向到文件；如果文件已存在则追加
n>&        # 将标准输出复制到文件描述符n
n<&        # 从文件描述符n复制标准输入
n>&m       # 文件描述符n成为输出文件描述符的副本
n<&m       # 文件描述符n成为输入文件描述符的副本
&>file     # 将标准输出和标准错误定向到文件
<&-        # 关闭标准输入
>&-        # 关闭标准输出
n>&-       # 关闭来自文件描述符n的输出
n<&-       # 关闭来自文件描述符n的输入

|tee <file># 将命令输出到终端和文件（-a追加到文件）


##############################################################################
# 进程处理
##############################################################################


# 要暂停作业，在运行时按CTRL+Z。你也可以用CTRL+Y暂停作业。
# 这与CTRL+Z略有不同，因为进程只有在尝试从终端读取输入时才会停止。
# 当然，要中断作业，请按CTRL+C。

myCommand &  # 在后台运行作业并提示返回shell

jobs         # 列出所有作业（使用-l查看相关PID）

fg           # 将后台作业带到前台
fg %+        # 带来最近调用的后台作业
fg %-        # 带来第二个最近调用的后台作业
fg %N        # 带来作业号N
fg %string   # 带来命令以string开头的作业
fg %?string  # 带来命令包含string的作业

kill -l               # 返回系统上所有信号的列表，按名称和编号
kill PID              # 终止具有指定PID的进程
kill -s SIGKILL 4500  # 发送信号强制或终止进程
kill -15 913          # 用信号15（TERM）结束PID 913进程
kill %1               # 其中%1是从'jobs'命令读取的作业号

ps           # 打印当前运行的登录shell和在其下运行的任何进程的信息行
ps -a        # 选择所有带有tty的进程，除了会话领导者

trap cmd sig1 sig2  # 当脚本接收到信号时执行命令
trap "" sig1 sig2   # 忽略这些信号
trap - sig1 sig2    # 将接收到信号时采取的动作重置为默认

disown <PID|JID>    # 从作业列表中删除进程

wait                # 等待直到所有后台作业完成
sleep <number>      # 等待#秒后继续

pv                  # 为数据处理命令显示进度条。通常与管道一起使用，如|pv
yes                 # 每当脚本/进程请求输入时给出yes响应


##############################################################################
# 技巧和窍门
##############################################################################


# 设置别名
cd; nano .bash_profile
> alias gentlenode='ssh admin@gentlenode.com -p 3404'  # 在.bash_profile中添加你的别名

# 快速转到特定目录
cd; nano .bashrc
> shopt -s cdable_vars
> export websites="/Users/mac/Documents/websites"

source .bashrc
cd $websites


##############################################################################
# 调试Shell程序
##############################################################################


bash -n scriptname  # 不运行命令；只检查语法错误
set -o noexec       # 替代方案（在脚本中设置选项）

bash -v scriptname  # 在运行命令之前回显命令
set -o verbose      # 替代方案（在脚本中设置选项）

bash -x scriptname  # 在命令行处理后回显命令
set -o xtrace       # 替代方案（在脚本中设置选项）

trap 'echo $varname' EXIT  # 当你想在脚本退出时打印变量值时很有用

function errtrap {
  es=$?
  echo "ERROR line $1: Command exited with status $es."
}

trap 'errtrap $LINENO' ERR  # 当周围脚本或函数中的命令以非零状态退出时运行

function dbgtrap {
  echo "badvar is $badvar"
}

trap dbgtrap DEBUG  # 使trap代码在函数或脚本中的每个语句之前执行
# ...出现问题的代码段...
trap - DEBUG  # 关闭DEBUG trap

function returntrap {
  echo "A return occurred"
}

trap returntrap RETURN  # 每次shell函数或用.或source命令执行的脚本执行完毕时执行

##############################################################################
# 颜色和背景
##############################################################################
# 注意：\e或\x1B也可以代替\033
# 重置
Color_Off='\033[0m' # 文本重置

# 常规颜色
Black='\033[0;30m'  # 黑色
Red='\033[0;31m'    # 红色
Green='\033[0;32m'  # 绿色
Yellow='\033[0;33m' # 黄色
Blue='\033[0;34m'   # 蓝色
Purple='\033[0;35m' # 紫色
Cyan='\033[0;36m'   # 青色
White='\033[0;97m'  # 白色

# 附加颜色
LGrey='\033[0;37m'  # 浅灰色
DGrey='\033[0;90m'  # 深灰色
LRed='\033[0;91m'   # 浅红色
LGreen='\033[0;92m' # 浅绿色
LYellow='\033[0;93m'# 浅黄色
LBlue='\033[0;94m'  # 浅蓝色
LPurple='\033[0;95m'# 浅紫色
LCyan='\033[0;96m'  # 浅青色


# 粗体
BBlack='\033[1;30m' # 黑色
BRed='\033[1;31m'   # 红色
BGreen='\033[1;32m' # 绿色
BYellow='\033[1;33m'# 黄色
BBlue='\033[1;34m'  # 蓝色
BPurple='\033[1;35m'# 紫色
BCyan='\033[1;36m'  # 青色
BWhite='\033[1;37m' # 白色

# 下划线
UBlack='\033[4;30m' # 黑色
URed='\033[4;31m'   # 红色
UGreen='\033[4;32m' # 绿色
UYellow='\033[4;33m'# 黄色
UBlue='\033[4;34m'  # 蓝色
UPurple='\033[4;35m'# 紫色
UCyan='\033[4;36m'  # 青色
UWhite='\033[4;37m' # 白色

# 背景
On_Black='\033[40m' # 黑色
On_Red='\033[41m'   # 红色
On_Green='\033[42m' # 绿色
On_Yellow='\033[43m'# 黄色
On_Blue='\033[44m'  # 蓝色
On_Purple='\033[45m'# 紫色
On_Cyan='\033[46m'  # 青色
On_White='\033[47m' # 白色

# 使用示例
echo -e "${Green}This is GREEN text${Color_Off} and normal text"
echo -e "${Red}${On_White}This is Red test on White background${Color_Off}"
# 选项-e是必须的，它启用反斜杠转义的解释
printf "${Red} This is red \n"
