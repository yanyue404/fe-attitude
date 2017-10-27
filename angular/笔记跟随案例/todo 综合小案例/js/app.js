angular.module('myApp',[])

	.controller('demoCtrl',['$scope','$http',function($scope,$http){

		/*
			1.展示数据

				1.获取数据
				2.将数据展示到页面中

					当前的JS文件最后会被引入到html文件中,那么这个文件里面写的路径都要相对于html文件

		 */
		
		$scope.taskList = [];
		
		$http({
			url:'./js/data.json',
			method:'get'
		}).then(function(res){

			for(var i=0;i<res.data.length;i++){
				res.data[i].isEdit = false;
			}

			$scope.taskList = res.data;
			console.log(res.data)

		})

		/*
			2.添加数据

				1.获取任务名称(ng-model)
				2.监控表单提交事件(ng-submit)
				3.将获取到的任务名字放到任务列表中

		 */
		
		$scope.submitTask = function(){

			$scope.taskList.push({
				id:Math.random(),
				name:$scope.task,
				isCompleted:false
			});

			$scope.task = '';

		}

		/*
			3.删除任务(单个)

				1.给删除按钮添加点击事件
				2.将当前删除的任务ID传入到事件函数中
				3.根据ID删除任务

		 */
		
		$scope.deleteTask = function(id){

			for(var i=0;i<$scope.taskList.length;i++){

				if($scope.taskList[i].id == id){

					$scope.taskList.splice(i,1);

				}

			}

		}

		/*
			4.更改任务状态

				1.将复选框和数据做关联
				2.将数据和类名做关联(就是利用数据的值[true|false] 来决定是否添加类名)

		 */


		/*
		
			5.增加筛选功能

				1.给筛选按钮添加点击事件
				2.区别点击的是哪一个按钮
				3.使用filter过滤器将数据过滤
				4.找到过滤条件

		 */
		
		$scope.condition = '';
		
		$scope.filterTask = function(type){

			switch(type){

				case 'All' :

					$scope.condition = '';

					break;

				case 'Active' :

					$scope.condition = false;

					break;

				case 'Completed' :

					$scope.condition = true;

					break;

			}

		}


		/*
			6.计算未完成任务的数量

				1.循环任务列表
				2.在循环的过程中找到未完成的任务
				3.计算

		 */
		
		 /*
		 	important:当页面中的数据发生改变的时候 angular会重新解析模板
		 	以达到数据更新的目的

		  */
		
		$scope.calcNumber = function(){

			var result = 0;

			for(var i=0;i<$scope.taskList.length;i++){

				if(!$scope.taskList[i].isCompleted){

					result++;

				}

			}

			return result;

		}


		/*
		
			7.清空已完成任务

				1.给清空按钮添加点击事件
				2.循环任务列表
				3.做判断 找到已完成的数据
				4.删除

		 */
		
		/*['吃饭','睡觉','打豆豆']

			0      1        2

		['睡觉','打豆豆']

			0       1*/
		
		$scope.clearData = function(){

			for(var i=0;i<$scope.taskList.length;i++){

				if($scope.taskList[i].isCompleted){

					$scope.taskList.splice(i,1);

					i--;

				}

			}

		}

		/*
			8.批量更改任务状态
				
				1.给全选按钮添加点击事件
				2.给全选按钮绑定一个变量
				3.用变量的值来决定当前是全选 还是 全不选
				4.循环任务列表 


		 */
		
		$scope.changeStatus = function(){

			/*if($scope.status){

				for(var i=0;i<$scope.taskList.length;i++){

					$scope.taskList[i].isCompleted = true;

				}

			}else{

				for(var i=0;i<$scope.taskList.length;i++){

					$scope.taskList[i].isCompleted = false;

				}

			}*/


			for(var i=0;i<$scope.taskList.length;i++){

				$scope.taskList[i].isCompleted = $scope.status;

			}

		}

		/*
			循环数据 看 有没有 未选中的数据 如果有未选中的数据 取消高亮状态

		 */

		$scope.changeLight = function(){

			for(var i=0;i<$scope.taskList.length;i++){

				if(!$scope.taskList[i].isCompleted){

					$scope.status = false;

					return;

				}

			}

			$scope.status = true;

		}


		/*
			9.修改任务名称

				1.给任务名称所在的label标签注册双击事件
				2.给当前双击的li添加editing类名
				3.循环任务列表 找到当前双击的那一条数据

		 */

		$scope.modifyData = function(id){

			for(var i=0;i<$scope.taskList.length;i++){

				if($scope.taskList[i].id == id){

					$scope.taskList[i].isEdit = true;

				}else{

					$scope.taskList[i].isEdit = false;

				}

			}

		}


		$scope.blurFn = function(){

			for(var i=0;i<$scope.taskList.length;i++){

				$scope.taskList[i].isEdit = false;

			}

		}

	}])






