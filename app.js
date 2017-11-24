var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.engine('.html',require('ejs').__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));

app.use('/', index);
app.use('/users', users);


/* 模拟接口数据 */
var mockData = {"currentPage":0,"pageSize":10,"total":12,"totalPage":1,"records":[{"core":"1006","deleted":false,"departmentName":"局领导","description":"领导、负责全局工作","id":147,"inNum":4,"leader":"吴海平","parentId":1,"sortNum":1},{"core":"1007","deleted":false,"departmentName":"办公室","description":"协助局领导协调处理日常工作；组织制订各项规章制度并对执行情况进行监督检查；负责文秘档案、组织人事、劳动工资、社会保障、信访接待、后勤管理、网络（站）管理等其他事务的管理工作。","id":267,"inNum":11,"leader":"蔡伟民","parentId":1,"sortNum":2},{"core":"1002","deleted":false,"departmentName":"工程技术管理科","description":" 负责乌引灌区抗旱防汛与水闸（枢纽）的工程建设与维护的技术管理工作；负责工程招投标、施工管理、工程预（决）算工作；负责乌引灌区与水闸（枢纽）工程的运作安全、工程防洪抢险和事故隐患、事故的调查处理工作；负责对乌引灌区二区一县乌引管理处的业务指导与检查督促工作；负责工程技术资料的收集、整编、分析和归档工作。","id":3,"inNum":5,"leader":"毛昌俊","parentId":1,"sortNum":3},{"core":"1003","deleted":false,"departmentName":"灌区水调科","description":"制定乌引灌区用水计划，编制年度、阶段用水运行、流量分配方案；实施调水，水闸防汛排水调度，传递有关调度信息；负责对乌引灌区二区一县、金华、干渠沿线工业及城镇用水的调研、监督，参与协调用水纠纷，处理用水矛盾，用水流量的统计等工作；负责水调、水控信息化建设、数据库建设及运用；负责水调、水控工作质量管理、操作安全、事故处理及设备维护；负责调水用水各类技术资料整编、分析、归档管理工作。","id":4,"inNum":8,"leader":"朱红利","parentId":1,"sortNum":4},{"core":"1004","deleted":false,"departmentName":"财务与资产管理科","description":"   制定和健全财务和资产管理制度，编制财务收支计划和年度预（决）算并组织实施；负责会计核算和会计监督；其他财务与资产的管理工作。","id":5,"inNum":4,"leader":"励红","parentId":1,"sortNum":5},{"core":"1005","deleted":false,"departmentName":"水安全保卫科","description":"在乌引局管理范围内，负责水资源、水域、水工程、水土保持、生态环境和防汛抗旱、水安全监督的安全保卫工作；受水政主管部门委托，负责对水事活动进行监督检查、维护正常水事秩序，对公民、法人或其他组织违反水法规的行为实施行政处罚或采取其他行政措施；参与处理乌引灌区范围内水事纠纷，并配合公安部门查处水事纠纷而引起的治安和刑事案件；参与局管理范围内工程的有关政策处理；负责水安全保卫资料的台账建立，资料整编、归档和管理工作。","id":6,"inNum":4,"leader":"吴秀生","parentId":1,"sortNum":6}]}
app.get('/tablefind',function(req,res){
	res.json(mockData)
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
