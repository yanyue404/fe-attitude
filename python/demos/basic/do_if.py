# -*- coding: utf-8 -*-

# 注意:
# input()返回的是字符串
# 必须通过int()将字符串转换为整数
# 才能用于数值比较:
age = int(input('Input your age: '))

if age >= 18:
    print('adult')
elif age >= 6:
    print('teenager')
else:
    print('kid')


height = float(input("Please input your height(cm):"))
weight = float(input("Please input your weight(kg):"))

bmi = float(f'{weight / ((height/100) **2):.2f}')

print(f"You height {height}, and your weight {weight}, the BMI is {bmi}")
if bmi > 32:
    print(f"You are very fat! {bmi}严重肥胖")
elif bmi > 28:
    print(f"You are fat! {bmi}肥胖")
elif bmi > 25:
    print(f"You are overweight, 过重")
elif bmi > 18.5:
    print(f"Pass, {bmi}体重正常")
else:
    print(f"You are underweight, {bmi}体重过轻")