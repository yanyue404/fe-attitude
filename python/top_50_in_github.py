# pip install bs4 requests
import requests
from bs4 import BeautifulSoup
import json

def get_top_projects():
    url = 'https://github.com/trending'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    project_list = []

    projects = soup.select('article.Box-row')
    for project in projects[:50]:
        project_data = {}
        
        # 获取项目名称
        name_elem = project.select_one('.h3')
        project_data['name'] = name_elem.text.replace(' ','').replace('\n','').strip()

        # 获取项目描述
        desc_elem = project.select_one('p')
        if desc_elem:
            project_data['description'] = desc_elem.text.strip()
        else:
            project_data['description'] = None

        # 获取项目链接
        link_elem = project.select_one('.h3 a')
        project_data['url'] = 'https://github.com' + link_elem['href']

        project_list.append(project_data)

    return project_list

def save_to_json(data, filename):
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)

if __name__ == '__main__':
    projects = get_top_projects()
    save_to_json(projects, 'top_projects.json')