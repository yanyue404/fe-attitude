/**
 *
 * @param {*} file input.files[0]
 * @returns 本地缓存 blob 路径
 */
function getFileURL(file) {
  var url = null;
  if (window.createObjectURL != undefined) {
    // basic
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}

/**
 * 获取图片以 base64 的格式读取
 *
 * @param {*} img
 * @param {*} callback
 */
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.onabort = () => console.log('file reading was aborted');
  reader.onerror = () => console.log('file reading has failed');
  // 也可以直接指定  reader.onload
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

/**
 * 通过 formData 的形式获取 file 文件
 * @param {*} file
 * @param {*} key 传递 forData 的 参数 键
 * @returns
 */
function getFileByFormData(file, key) {
  var formdata = new FormData();
  formData.append(key, file[0]);
  return formdata;
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    console.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    console.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}
