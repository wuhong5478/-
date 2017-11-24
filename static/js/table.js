
//初始化表格，需要先定义tableModel
(function() {
    tableModel.table.bootstrapTable({
        url: tableModel.url,
        responseHandler: function(res) {
            //FastJson.format(res);
            return { rows: res.records, total: res.total };
        },
        cache: true,
        pagination: tableModel.hasOwnProperty("pagination") ? tableModel.pagination : true,
        sidePagination: "server",
        queryParamsType: "",
        queryParams: queryParams, //参数
        pageNumber: 1,
        pageSize: 10,
        pageList: [5, 10, 20, 50],
        search: false,
        striped: true,
        showRefresh: false,
        showToggle: false,
        showColumns: false,
        clickToSelect: true,
        uniqueId: "id",
        icons: {
            refresh: 'glyphicon-repeat',
            toggle: 'glyphicon-list-alt',
            columns: 'glyphicon-list'
        },
        onClickRow: function(row, td) {
            if (tableModel.hasOwnProperty("onClickRow")) {
                var func = eval(tableModel.onClickRow);
                new func(row, td);
            }
        }
    });

})();

function commonDelete(id) {
    //询问框
    parent.layer.confirm('删除之后不可恢复，您确定要删除吗？', {
        icon: 0,
        title: '提示',
        btn: ['删除', '取消'], //按钮
        btnAlign: 'c',
        shadeClose: true,
        shade: [0.8, '#000'] //显示遮罩
    }, function() {
        $.ajax({
            url: tableModel.deleteUrl + "/" + id,
            type: "post",
            async: false,
            success: function(response) {
                if (response.code == 1) {
                    parent.layer.msg(response.message, { icon: 1 });
                    tableModel.table.bootstrapTable("refresh");
                } else {
                    parent.layer.msg(response.message, { icon: 2 });
                }
            },
            error: function() {
                parent.layer.msg("删除失败", { icon: 2 });
            }
        });
    });
}

function indexFormatter(value, row, index) {
    var pageSize = $('#paginationTable').bootstrapTable('getOptions').pageSize,
        pageNum = $('#paginationTable').bootstrapTable('getOptions').pageNumber;
    return pageSize * (pageNum - 1) + index + 1;
}

function queryParams(params) {
    var temp = {
        pageSize: params.pageSize, //页面大小
        pageNumber: params.pageNumber, //页码

        sort: params.sort, //排序列名
        sortOrder: params.order //排位命令（desc，asc）
    };

    //文本输入框
    var fields = $(".form-inline.searchBox input").serializeArray();
    //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
    jQuery.each(fields, function(i, field) {
        if (field.value != '') {
            temp[field.name] = field.value.trim();
        }
    });

    //select下拉框
    var fields = $(".form-inline.searchBox select").serializeArray();
    //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
    jQuery.each(fields, function(i, field) {
        if (field.value != '') {
            temp[field.name] = field.value;
        }
    });
    //console.log(temp)
    return temp;
}

//value：被截取的字符串
//length：截取的长度
function substringForTable(value, length) {
    if (value != null) {
        if (value.length > length) {
            return value.substring(0, length) + "...";
        } else {
            return value;
        }
    } else {
        return "";
    }
}


function timeFormatter(value) {
    if (value == null || value == "") {

    } else {
        return new Date(parseInt(value)).Format("yyyy-MM-dd");
    }
}

/**
 * 日期格式转换
 * @param value      日期值
 * @param type       转换后的日期格式
 */
function timeFormatterByType(value, type) {
    if (value == null || value == "") {

    } else {
        return new Date(parseInt(value)).Format(type);
    }
}