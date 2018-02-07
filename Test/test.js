 function queryCompany() {
             var url = URL + "/app/bill/checkCompany",
              paramJsonStr = "";
            
             $.ajax({
                type : 'post',
                url : url,
                data : paramJsonStr,
                async : false,
                success : function(data) {
                
            if ( typeof data == "string") {
                data = eval("(" + data + ")");
            }

            var html = template('checkcity', {
                list : data
            })

            $("#gyfgs").html(html);
                }
            })
           
               
           } 