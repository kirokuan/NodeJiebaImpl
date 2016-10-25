var fs =require("fs");
var csv = require('csv-parser');
var async = require('async');
var nodejieba = require("nodejieba");
var week="1";
var root="/tmp2/yckuan/data/";
process.argv.forEach(function (val, index, array) {
  //console.log(index + ': ' + val);
  if(index=="2"){
	week=val;
	}
});
nodejieba.load({})
var outfile=root+"filter_new/week"+week+".csv"
var wstream = fs.createWriteStream(outfile);
var inputFile=root+'filter/week'+week+'.len.csv';
var header= "mid,retweeted_status_mid,uid,retweeted_uid,source,image,text,geo,created_at,deleted_last_seen,permission_denied,category,text_leng\r\n";

fs.appendFile(outfile,header,
function(){
	fs.createReadStream(inputFile)
  	.pipe(csv())
  	.on('data', function (data) {
        	var t=nodejieba.cut(data.text,false);
		var newData=[data.mid,data.retweeted_status_mid,data.uid,data.retweeted_uid,data.source,data.image,"\""+t.join(' ').replace(/\"/g,"\"\"")+"\"",data.geo,data.created_at,data.deleted_last_seen,data.permission_denied,data.category,data.text_leng];
		var newline=newData.join(',')+"\n";
		fs.appendFileSync(outfile,newline)
	})
   	.on("end", function () {  // done
    		console.log(week+" Done");
  	});
});

