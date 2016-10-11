var fs =require("fs");
var csv = require('csv-parser');
var async = require('async');
var nodejieba = require("nodejieba");
var week="1";
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
  if(index=="2"){
	week=val;
	}
});
nodejieba.load({})
var outfile="/tmp2/yckuan/data/new/week"+week+".csv"
var wstream = fs.createWriteStream(outfile);

var inputFile='/tmp2/yckuan/data/raw/week'+week+'.csv';
fs.appendFileSync(outfile, "mid,retweeted_status_mid,uid,retweeted_uid,source,image,text,geo,created_at,deleted_last_seen,permission_denied\n");

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', function (data) {
        //console.log(data.text)
        var t=nodejieba.cut(data.text,false);
//        console.log( t.join(' '))
//mid,retweeted_status_mid,uid,retweeted_uid,source,image,text,geo,created_at,deleted_last_seen,permission_denied
	var newData=[data.mid,data.retweeted_status_mid,data.uid,data.retweeted_uid,data.source,data.image,"\""+t.join(' ').replace(/\"/g,"\"\"")+"\"",data.geo,data.created_at,data.deleted_last_seen,data.permission_denied];
	var newline=newData.join(',')+"\n";
	fs.appendFileSync(outfile, newline);
//console:.log(nodejieba.extract(data.text, 10));
  })
   .on("end", function () {  // done
    console.log("Done");
  });



