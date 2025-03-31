import requests

headers={ 'User-Agent':'Mozilla/5.0 (Windows NT 6.1;WOW64) AppleWebKit/537.36 (KHTML,like GeCKO) Chrome/45.0.2454.85 Safari/537.36 115Broswer/6.0.3',    'Referer':'https://movie.douban.com/',    'Connection':'keep-alive'}

r = requests.get('https://www.douban.com/search', params={'q': 'python', 'cat': '1001'},headers=headers)

r.status_code # 200

r.url # https://www.douban.com/search?q=python&cat=1001