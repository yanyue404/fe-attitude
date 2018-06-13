/**
 * 
 * 
 * @method main
 */
function main() {
    //path=knowledge-base%2Fknowledge-lib%2F部门知识库&size=100&page=1
    //slingshot/doclib/treenode/site/knowledge-base/knowledge-lib/部门知识库/工程项目管理部?perms=false&children=false&max=100
	/*var params = ["size":10000,"page":"1"];
	for (var name in args)
    {
       params.push(name + "=" + args[name]);
    }
	var uri = "rf/repo/statistic/knowledge/count/by-path?" + params.join("&");
	*/
    //
    var path = args["path"];
    var list = {};
    var uri = "/rf/repo/statistic/knowledge/folder/by-path?path=" + path + "&page=1&size=10000";
    var connector = remote.connect("alfresco");
    var result = connector.get(encodeURI(uri));
    if (result.status.code == status.STATUS_OK) {
        // Strip out possible malicious code


        var data = eval("(" + result.response + ")");
        list.totalRecords = data.totalRecords ? data.totalRecords : 0;
        list.startIndex = data.startIndex ? data.startIndex : 0;
        list.items = [];
        if (data && data.items) {

            var num = path.split("/").length;

            var count = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            for (var i = 0, il = data.items.length; i < il; i++) {
                var path = data.items[i].path;

                //TODO
                list.items[i] = {};
                var c = path.split("/");
                if (c.length > num + 1) {
                    c = c.slice(num + 1);

                }

                if (c.length > 5) {
                    break;
                }
                list.items[i]["idx"] = i + 1;

                for (var j = 0, jl = c.length; j < jl; j++) {
                    if (j > 5) {
                        break;
                    }

                    if (i > 0 && list.items[i - count[j]]["c" + j] == c[j]) {
                        list.items[i]["c" + j] = "--";
                        count[j] = count[j] + 1;
                        list.items[i - count[j] + 1]["rp" + j] = count[j];
                    } else {
                        list.items[i]["c" + j] = c[j];
                        count[j] = 1
                        list.items[i]["rp" + j] = count[j];
                    }

                }


            }
        }

    }
    else {
        status.code = result.status.code;
        status.message = msg.get("message.failure");
        status.redirect = true;
    }
    model.catalogs = jsonUtils.toJSONString(list);
}
main();