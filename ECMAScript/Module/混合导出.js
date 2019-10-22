export default const  example3 = {
  birthday : '2018 09 20'
}
export let name  = 'my name'
export let age  = 'my age'
export let getName  = function(){ return 'my name'}

// 导入默认与部分
import example3, {name, age} from './example1.js'