var fs =require("fs");
var csv = require('csv-parser');
var async = require('async');
var nodejieba = require("nodejieba");
var week="1";
var root="/tmp2/yckuan/data/"
process.argv.forEach(function (val, index, array) {
  //console.log(index + ': ' + val);
  if(index=="2"){
	week=val;
	}
   else if(index=="3"){
	folder=val;
	}
});
nodejieba.load({
	userDict: './dict.txt.big'
})
var outfile=root+folder+"/week"+week+".format.seg.csv"
var wstream = fs.createWriteStream(outfile);
var inputFile=root+folder+'/week'+week+'.format.new.csv';
var header ="category,text"

fs.appendFile(outfile,header,
function(){
	fs.createReadStream(inputFile)
  	.pipe(csv())
  	.on('data', function (data) {
        	var t=nodejieba.cut(data.text,false);
		var newData=[data.category,"\""+t.join(' ').replace(/\"/g,"\"\"")+"\""];
		var newline=newData.join(',')+"\n";
		fs.appendFileSync(outfile,newline)
	})
   	.on("end", function () {  // done
    		console.log(week+" Done");
  	});
});

