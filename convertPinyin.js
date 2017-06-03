var fs =require("fs");
var csv = require('csv-parser');
var async = require('async');
var nodejieba = require("nodejieba");
var pinyin = require("pinyin");
var week="1";
var root="/tmp2/yckuan/data/"
var origFolder="filter3"
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
function pinyinWord(characters){
     return pinyin(characters).reduce(function(a,b){ return a + b;},"")
}
var outfile=root+folder+"/week"+week+".format.seg.csv"

var wstream = fs.createWriteStream(outfile);
var inputFile=root+origFolder+'/week'+week+'.format.new.csv';
var formatted=root+folder+'/week'+week+'.pinyin.csv';
var header ="category,text\n"
fs.appendFile(outfile,header,
function(){
	fs.createReadStream(inputFile)
  	.pipe(csv())
  	.on('data', function (data) {
        	var t=nodejieba.cut(data.text,false);
                var d= t.map(pinyinWord).join(' ')
//                console.log(d)      
		var newData=[data.category,"\""+d.replace(/\"/g,"\"\"")+"\""];
		var newline=newData.join(',')+"\n";
		fs.appendFileSync(outfile,newline)
//           console.log("ddd")
	})
   	.on("end", function () {  // done
    		console.log(week+" Done");
  	});
});


