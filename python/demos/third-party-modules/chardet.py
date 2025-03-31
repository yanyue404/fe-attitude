import chardet
# 可以猜测任意一段文本的字符集编码。对于编码类型未知的文本，chardet可以猜测出其编码类型。

chardet.detect(b'Hello, world!')
# {'encoding': 'ascii', 'confidence': 1.0, 'language': ''}
# 检测出的编码是ascii，注意到还有个confidence字段，表示检测的概率是1.0（即100%）

# 检测GBK编码的中文

data = '离离原上草，一岁一枯荣'.encode('gbk')
chardet.detect(data)
# {'encoding': 'GB2312', 'confidence': 0.7407407407407407, 'language': 'Chinese'}

# 检测的编码是GB2312，注意到GBK是GB2312的超集，两者是同一种编码，检测正确的概率是74%，language字段指出的语言是'Chinese'。