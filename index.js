
const fs = require("fs");

const request = require('request');
const options = {
  url: 'https://api.github.com/repos/wangsq-web/wangsq-web/issues',
  headers: {
    'User-Agent': 'getIssues'
  }
};
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    const info = JSON.parse(body);
    // console.log(info);
    let data = `## 最新 :new: \n\n`
    
    info.forEach( item => {
      data += `#### [${item.title}](${item.html_url}) <sup>  评论：${item.comments}</sup> 	 ${item.created_at.replace(/[T,Z]/g, ' ')}\n\n`
      if(item.labels.length > 0){
        item.labels.forEach(lab => {
          data += `:label: : [${lab.name}](${lab.url})`
        });
      }
      data += `\n\n${item.body}\n\n[更多>>>](${item.html_url})\n\n---\n\n`
    })
    
    fs.writeFile('README.md', data,  function(err) {
       if (err) {
           return console.error(err);
       }
       fs.readFile('README.md', function (err, data) {
          if (err) {
             return console.error(err);
          }
          // console.log(data.toString());
       });
    });
  }
}
request(options, callback);

