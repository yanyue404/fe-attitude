# 确保 requests 和 bs4 库已正确安装（pip install requests beautifulsoup4 lxml）。
import requests
from bs4 import BeautifulSoup
import time

def price_tracker(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
    }
    
    try:
        # 更健壮的请求配置
        response = requests.get(url, headers=headers, timeout=10)
        response.encoding = 'utf-8'  # 强制指定编码
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        return f"请求失败: {str(e)}"
    
    soup = BeautifulSoup(response.text, 'lxml')

    # 检查阮一峰博客的标题元素
    # 通过查看网页源代码，我们发现标题元素的选择器是 h2.asset-name
    title_tag = soup.select_one('h2.asset-name')  # 改为更通用的选择器
    if not title_tag:
        return "未找到标题元素"
    
    # 返回实际的标题文本
    return title_tag.get_text(strip=True)

# 模块导入时可调用的测试接口
def test():
    print("当前标题:", price_tracker('https://www.ruanyifeng.com/blog/'), flush=True) # flush=True 参数，可以强制每次打印时立即刷新缓冲区，无需等待脚本结束或中断。

if __name__ == '__main__':
    # 立即执行一次
    test()
    # 每 30 秒循环执行
    while True:
        time.sleep(30)  # 修改为 30 秒
        test()