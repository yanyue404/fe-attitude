// 内联描述
function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object 1" };
printLabel(myObj);


// 使用接口描述

interface labelleObjValue {
  label: string;
}
function printLabel2(labelledObj: labelleObjValue) {
  console.log(labelledObj.label);
}

let myObj2 = { size: 10, label: "Size 10 Object 2" };
printLabel2(myObj2);

