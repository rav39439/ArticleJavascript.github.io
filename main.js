const newsData = [
    "Breaking news: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "New study shows that cats rule and dogs drool!",
    "Tech giant XYZ announces record-breaking profits.",
    "Local sports team wins the championship.",
    "Weather forecast: Sunny skies with a chance of rain later.",
];
let globalLength
let updatedData
let keys
let goBackData
let updateOnRefresh
let allArticlesData
let lastSavedTopic
let currentIndex = 1

let lastSavedGrade
loadInitialData()
setTimeout(() => {
    gi()

    getAlldata()
}, 4000)

function gi() {
    let goback = document.getElementById('goBack').innerText
    let timeago
    let html = ``
    let topicDetailsWords = ''
    goBackData = JSON.parse((document.getElementById('goBack').innerText).trim())
    if(!goBackData){
        goBackData='default'
    }
    if (document.getElementById('gr') != null) {
        let gr = JSON.parse((document.getElementById('gr').innerText).trim())
        document.getElementById('grade').value = gr

    } else{
        document.getElementById('grade').value = 'default'

    }

    if(!document.getElementById('tp')){
        document.getElementById('tp').innerText='default'
    }
    if (document.getElementById('tp') != null) {
        let tp = JSON.parse((document.getElementById('tp').innerText).trim())
        document.getElementById('topicnames').value = tp

    }

    if (document.getElementById('goBack') != null) {
        let t = JSON.parse((document.getElementById('goBack').innerText).trim())
        document.getElementById('Subject').value = t

    }

    let updatedOptions = JSON.parse(document.getElementById('ndata').innerText)
    if (goBackData.trim() != 'All') {
        updateTopics(updatedOptions, document.getElementById('topicnames').value)
    } else {
        console.log('all')
    }
    let a = JSON.parse(document.getElementById('ndata').innerText)
    console.log(a)
    updatedData = a
    let b = checkData(a)
    globalLength = a.length
    let fi = a.filter(d => Object.keys(d).includes('topicName'))
    a.forEach((article, index) => {
        let rootdata = article
        if (typeof (article.Topicdetails) != "undefined") {
            topicDetailsWords = article.Topicdetails.split(' ').slice(0, 20).join(' ');

        }
        else {
            topicDetailsWords = ''
        }
        if (article.time) {
            timeago = getTimeDifference(article.time)

        }
        else {
            timeago = ''
        }

        html += `

<a href="#" style="text-decoration:none;color:black" id=${index} >

<div class="card" style="width:100% ; background-color:rgb(226, 226, 241);border-radius:12px;position:relative;height:300px">
  <div class="card-body" style="background-color: rgb(245, 245, 250); margin:20px;border-radius:15px">
      <div style="display:flex;gap:0.75rem">
  <div style="flex-shrink:0;width:50px;height:50px;border-radius:50%;overflow:hidden">
      <img src="https://media.istockphoto.com/id/915681526/photo/bandra-worli-sea-link-mumbai.webp?b=1&s=612x612&w=0&k=20&c=rLQ4xR3AMjH-LhMuoT_DOCxiT9BlMoCmnZ4CCRAQByk=" alt="Your Image">
      </div>
<div style="display:flex;flex-direction:column;margin-left:10px">
  <p style="font-size:1rem;font-weight:500 ;margin-bottom:0px;padding-bottom:0px">Ravish Kumar</p>
  <p style="font-size:0.875rem;color:#6b7280;text-align:left">${timeago}</p>
  </div>
  </div>
  <div style="padding-top:5px">
    <h5 class="card-title" style="text-align:left;margin-bottom:5px">${article.topicName}</h5>
    <div class="card-text" style="text-align:left;margin-bottom:18px">${topicDetailsWords}</div>
</div>
  </div>
</div>
</a>
`
    })
    document.getElementById('articles').innerHTML = html
    attachEventListeners()
}

function fetchdata(data) {
    let d = []
    data.forEach((e) => {
        if (Object.keys(e).length != 0) {
            let keys = Object.keys(e)
            keys.forEach((key) => {
                d.push(e[key])
            })
        }
    })
    return d
}

function fetchdata1(data) {
    let d = []
    for (const e in data) {
        d.push(data[e])
    }
    return d
}

function gettime(index, timedata) {
    return (getTimeDifference(timedata))
}

function checkData(d) {
    let mapped = d.map(e => e.Subject)
    return removeDuplicates(mapped)
}

function getData(event) {
    goBackData = event.target.value
    console.log(event.target.value)
    document.getElementById('articles').innerHTML = ``
    $.ajax({
        url: "https://articleapiapp.onrender.com/docdata",
        method: "POST",
        data: { subject: event.target.value },
        success: function (response) {
            updatedData = response.articles
            if (typeof (response.articles.length) == 'undefined') {
                keys = Object.keys(response.articles)
                let allartilces = Object.keys(response.articles)
                let subject = event.target.value
                globalLength = allartilces.length

                let filterd = response.topics.filter(t => t.subject == event.target.value)
                updateTopics(filterd)
                allartilces.forEach((elem, index) => {
                    let rootdata = response.articles[elem]
                    let time = response.articles[elem]?.time
                    let timeago = getTimeDifference(time)


                    document.getElementById('articles').innerHTML +=
                        `
                        <a href="#" style="text-decoration:none;color:black" id=${index} >
      <div class="card" style="width:100% ; background-color:rgb(226, 226, 241);border-radius:12px;position:relative;height:300px">
       
            <div class="card-body" style="background-color: rgb(245, 245, 250); margin:20px;border-radius:15px">
                <div style="display:flex;gap:0.75rem">
            <div style="flex-shrink:0;width:50px;height:50px;border-radius:50%;overflow:hidden">
                <img src="https://media.istockphoto.com/id/915681526/photo/bandra-worli-sea-link-mumbai.webp?b=1&s=612x612&w=0&k=20&c=rLQ4xR3AMjH-LhMuoT_DOCxiT9BlMoCmnZ4CCRAQByk=" alt="Your Image">
                </div>
        <div style="display:flex;flex-direction:column;margin-left:10px">
            <p style="font-size:1rem;font-weight:500 ;margin-bottom:0px;padding-bottom:0px">Ravish Kumar</p>
            <p style="font-size:0.875rem;color:#6b7280;text-align:left">${timeago}</p>
            </div>
            </div>
            <div style="padding-top:5px">
              <h5 class="card-title" style="text-align:left;margin-bottom:5px">${elem}</h5>
              <div class="card-text" style="text-align:left;margin-bottom:18px">${rootdata.Topicdetails}</div>
    </div>
            </div>
          </div>
        </a>
      `


                })
                attachEventListeners(); // Call the function to attach event listeners
            }
            else {
                let resdata = fetchdata(response.articles)
                updateTopics(resdata)
                useArr(response.articles)
            }
        }
    })

}

function updateTopics(alltopics, topic) {
    const selectElement1 = document.getElementById("topicnames");

    selectElement1.innerHTML = "";
    const optiond1 = document.createElement("option");
    optiond1.value = 'default'
    optiond1.textContent = '-----select your topic-----';
    // optiond1.selected = true
    selectElement1.appendChild(optiond1);
    if (alltopics.length > 0) {
        alltopics.forEach(function (elem, index) {
            const option1 = document.createElement("option");
            option1.value = elem.topicName;
            option1.textContent = elem.topicName;
            selectElement1.appendChild(option1);
        });
        document.getElementById('topicnames').value = topic
    }
}

function attachEventListeners() {
    let updata
    for (let i = 0; i < globalLength; i++) {
        document.getElementById(i).addEventListener('click', (event) => {
            if (typeof (updatedData.length) != 'undefined') {
                updata = updatedData[i]
            }
            else {
                updata = updatedData[i]

            }
            $.ajax({
                url: "https://articleapiapp.onrender.com/fetchPage",
                method: "POST",
                data: { articlevalue: updata },
                success: function (response) {
                    let currentIndex = 1
                    let numberofbuttons = response.articledata.Text.length
                    let buttons = ``
                    response.articledata.Text.forEach((buttonT, index) => {

                        buttons += `<button class='btn btn-primary ml-4' style="margin-left:12px" id=button${index} value=${index}>${index + 1}</button>`
                    })
                    document.getElementById('majordata').innerHTML = `

                    <div id="ndata" style="display: none;">
                    </div>
            
                    <div id="goBack" style="display: none;">
                    </div>
                    <div id="gr" style="display: none;">
                    </div>
                    <div id="tp" style="display: none;">
                    </div>
                    <div id="alltopics" style="display: none;">
                    </div>
                    <div id="majordata" style="width: 100%;">
                    <div id="ndata" style="display: none;">
                    </div>
            
                    <div id="goBack" style="display: none;">
                    </div>
                    <div id="gr" style="display: none;">
                    </div>
                    <div id="tp" style="display: none;">
                    </div>
                    <div id="alltopics" style="display: none;">
                    </div>
            
            
                <div style="width: 100%; margin-top: 20px; display=none" id="dduu">
                    <div class="container " style="width: 60%;  margin-bottom:40px; border-radius:12px;">
                        <div style="display:grid; grid-template-columns: 60% 20% 20%; gap: 30px;">
                            <select name="grade" style=" border-radius:10px;" id="grade" class="form-control"
                                onchange="getTopic(event)">
                                <option value="default" selected>---select your level----</option>
                                <option value="8">class 8</option>
                                <option value="5">class 5</option>
                                <option value="9">class 9</option>
                                <option value="10">class 10</option>
                                <option value="11">class 11</option>
                            </select>
                
                            <select name="Subjects" style=" border-radius:10px;" id="Subject" class="form-control"
                                onchange="getTopic(event)">
                                <option value="default" selected>---select a subject---</option>
                                <option value="All">All</option>
                                <option value="History">History</option>
                                <option value="Geography">Geography</option>
                                <option value="Physics">Physics</option>
                                <option value="Technology">Technology</option>
                            </select>
                
                            <select name="topicnames" style=" border-radius:10px;" id="topicnames" class="form-control"
                                onchange="getTopic(event)">
                                <option value="default" selected>---select your topic ----</option>
                                <option value="<%= elem.topic %>">
                                </option>
                            </select>
                        </div>
                    </div>
                    <div id="articles" class=""
                        style="width: 100%; display: grid; grid-template-columns: 32% 32% 32%; gap: 15px; margin-left:20px ;">
                
                    </div>
                </div>
                </div>
            <div class="container  " style="width: 100%;  margin-bottom:40px;margin-top:20px" id="lluu">
                <button class="btn btn-primary" style=" border-radius:17px;">
                 <a href="#" style="text-decoration:none;color:black"id="getInitial" >
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>

                    </a></button>
        <div class="" style=" background-color: rgb(230, 230, 250);width: 100%;border-radius:16px" id="">
            <h1> ${response.articledata.topicName}</h1>
            <br>
            <div id="textcontent">
                ${response.articledata.Text[0]}

                </div>

                <div style="display:flex;flex-direction:row;  justify-content:center;align-items:center">
                <button class='btn btn-primary' id=Previous style="background:none;color:black; margin-bottom:16px;border:none;cursor:pointer;width:max-content" >Previous</button>
                <p id='buttontext' style="padding:5px;margin-right:16px">${currentIndex}</p>

                <button class='btn btn-primary' id=Next style="background:none;color:black;margin-bottom:16px;border:none;cursor:pointer;width:max-content" >Next</button>
                </div>
        </div>
       
        <button class='btn btn-primary' id=download style="background:none;color:black;margin-bottom:16px;border:none;cursor:pointer;width:max-content" >download</button>
    </div>              
            `
                    document.getElementById('getInitial').addEventListener('click', (event) => {
                        //http://localhost:8700/goBack?data=${goBackData}
                        let f=document.getElementById('grade').value
                        let p=document.getElementById('Subject').value
                        let j=document.getElementById('topicnames').value
                        let pdata={
                            grade:f,
                            subject:p,
                            topicnames:j
                        }

                        $.ajax({
                            url: `https://articleapiapp.onrender.com/goBack`,
                            method: "POST",
                            data:pdata,
                            success: function (response) {
                                console.log(JSON.parse(response.articles))
                                document.getElementById('goBack').innerText = response.goback
                                document.getElementById('gr').innerText = response.grade
                                document.getElementById('tp').innerText = response.topic
                                document.getElementById('alltopics').innerText = response.alltopics
                                document.getElementById('ndata').innerText = response.articles
                                document.getElementById('lluu').style.display = 'none'
                                document.getElementById('dduu').style.display = 'block'
                                gi()

                            }
                        })

                    })

                    for (let i = 0; i < numberofbuttons; i++) {
                        let p = document.getElementById('download').addEventListener('click', (event) => {
                            html = response.articledata.Text[currentIndex - 1]
                            var htmlData = '<p>Your HTML content here</p>'; // Replace with your HTML data
                            var htmlDocument = '<!DOCTYPE html>' +
                                '<html>' +
                                '<head>' +
                                '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">' +
                                '</head>' +
                                '<body>' +
                                html +
                                '</body>' +
                                '</html>';
                            Export2Doc(html, 'new.docX')
                        })
                    }

                    document.getElementById('Next').addEventListener('click', (event) => {
                        if (currentIndex >= 0 && currentIndex < numberofbuttons) {
                            currentIndex = currentIndex + 1
                            document.getElementById('buttontext').innerText = currentIndex
                            document.getElementById('Previous').disabled = false;
                        }
                        else {
                            document.getElementById('Next').disabled = true;
                        }
                        document.getElementById('textcontent').innerHTML = response.articledata.Text[currentIndex - 1]

                    })

                    document.getElementById('Previous').addEventListener('click', (event) => {
                        console.log(currentIndex)

                        if (currentIndex > 1) {
                            currentIndex = currentIndex - 1
                            document.getElementById('buttontext').innerText = currentIndex
                            document.getElementById('Next').disabled = false;

                        }
                        else {
                            document.getElementById('Previous').disabled = true;
                        }
                        document.getElementById('textcontent').innerHTML = response.articledata.Text[currentIndex - 1]

                    })

                }
            })
        });
    }
}

function getTimeDifference(timestamp) {
    const currentTime = Date.now();
    const timeDifference = currentTime - timestamp;
    // Convert milliseconds to seconds, minutes, hours, days, and years
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);
    if (years >= 1) {
        return `${years} years ago`;
    } else if (years === 1) {
        return `1 year ago`;
    } else if (days >= 1) {
        return `${days} days ago`;
    } else if (hours >= 1) {
        return `${hours} hours ago`;
    } else if (minutes >= 1) {
        return `${minutes} mins ago`;
    } else {
        return `${seconds} seconds ago`;
    }
}

function removeDuplicates(arr) {
    return arr.filter((value, index, self) => self.indexOf(value) === index);
}

function useArr(d) {
    let html = ``
    const data = fetchdata(d)
    updatedData = data
    globalLength = data.length
    data.forEach((article, index) => {
        let rootdata = article
        if (typeof (article.Topicdetails) != "undefined") {
            topicDetailsWords = article.Topicdetails.split(' ').slice(0, 20).join(' ');
        }
        else {
            topicDetailsWords = ''
        }
        if (article.time) {
            timeago = getTimeDifference(article.time)

        }
        else {
            timeago = ''
        }

        html += `

<a href="#" style="text-decoration:none;color:black" id=${index} >

<div class="card" style="width:100% ; background-color:rgb(226, 226, 241);border-radius:12px;position:relative;height:300px">

  <div class="card-body" style="background-color: rgb(245, 245, 250); margin:20px;border-radius:15px">
      <div style="display:flex;gap:0.75rem">
  <div style="flex-shrink:0;width:50px;height:50px;border-radius:50%;overflow:hidden">
      <img src="https://media.istockphoto.com/id/915681526/photo/bandra-worli-sea-link-mumbai.webp?b=1&s=612x612&w=0&k=20&c=rLQ4xR3AMjH-LhMuoT_DOCxiT9BlMoCmnZ4CCRAQByk=" alt="Your Image">
      </div>
<div style="display:flex;flex-direction:column;margin-left:10px">
  <p style="font-size:1rem;font-weight:500 ;margin-bottom:0px;padding-bottom:0px">Ravish Kumar</p>
  <p style="font-size:0.875rem;color:#6b7280;text-align:left">${timeago}</p>
  </div>
  </div>
  <div style="padding-top:5px">
    <h5 class="card-title" style="text-align:left;margin-bottom:5px">${article.topicName}</h5>
    <div class="card-text" style="text-align:left;margin-bottom:18px">${topicDetailsWords}</div>
</div>
  </div>
</div>
</a>
`            })
    document.getElementById('articles').innerHTML = html
    attachEventListeners()
}

function getAlldata() {
    $.ajax({
        url: "https://articleapiapp.onrender.com/getAll",
        method: "POST",
        // data: { subject: goBackData },
        success: function (response) {
            // allArticlesData=fetchdata(response.allarticles)

            let d = ` <select name="Subjects" style=" border-radius:10px;" id="Subject" class="form-control"
                    onchange="getData(event)">
                    <option value="All">All</option>

                    <option value="History">History</option>
                    <option value="Geography">Geography</option>
                    <option value="Physics">Physics</option>
                    <option value="Technology">Technology</option>
                </select>`

        }
    })
}

function getTopic(event) {
    //  goBackData = event.target.value
    lastSavedTopic = document.getElementById('topicnames').value

    lastSavedGrade = document.getElementById('grade').value
    document.getElementById('articles').innerHTML = ``
    $.ajax({
        url: "https://articleapiapp.onrender.com/docdata",
        method: "POST",
        data: { grade: document.getElementById('grade').value, subject: document.getElementById('Subject').value, topic: document.getElementById('topicnames').value },
        success: function (response) {
            updatedData = response.articles
            console.log(response.sendata)
            if (response.sendata.length > 0) {
                //  keys = Object.keys(response.articles)
                // let allartilces = Object.keys(response.articles)
                let subject = document.getElementById('Subject').value
                goBackData = document.getElementById('Subject').value
                globalLength = response.sendata.length
                let allarticlesmap = response.sendata
                updateTopics(allarticlesmap, document.getElementById('topicnames').value)
                updatedData = allarticlesmap

                //let filterallarticles = allarticlesmap.filter(t => t.class == event.target.value)
                allarticlesmap.forEach((article, index) => {

                    if (typeof (article.Topicdetails) != "undefined") {
                        topicDetailsWords = article.Topicdetails.split(' ').slice(0, 20).join(' ');
                    }
                    else {
                        topicDetailsWords = ''
                    }
                    if (article.time) {
                        timeago = getTimeDifference(article.time)

                    }
                    else {
                        timeago = ''
                    }

                    document.getElementById('articles').innerHTML +=
                        `
                        <a href="#" style="text-decoration:none;color:black" id=${index} >

      <div class="card" style="width:100% ; background-color:rgb(226, 226, 241);border-radius:12px;position:relative ; height:300px">
       
            <div class="card-body" style="background-color: rgb(245, 245, 250); margin:20px;border-radius:15px">
                <div style="display:flex;gap:0.75rem">
            <div style="flex-shrink:0;width:50px;height:50px;border-radius:50%;overflow:hidden">
                <img src="https://media.istockphoto.com/id/915681526/photo/bandra-worli-sea-link-mumbai.webp?b=1&s=612x612&w=0&k=20&c=rLQ4xR3AMjH-LhMuoT_DOCxiT9BlMoCmnZ4CCRAQByk=" alt="Your Image">
                </div>
        <div style="display:flex;flex-direction:column;margin-left:10px">
            <p style="font-size:1rem;font-weight:500 ;margin-bottom:0px;padding-bottom:0px">Ravish Kumar</p>
            <p style="font-size:0.875rem;color:#6b7280;text-align:left">${timeago}</p>
            </div>
            </div>
            <div style="padding-top:5px">
              <h5 class="card-title" style="text-align:left;margin-bottom:5px">${article.topicName}</h5>
              <div class="card-text" style="text-align:left;margin-bottom:18px">${topicDetailsWords}</div>

              </div>
            </div>
          </div>
        </a>
      `
                })
                attachEventListeners(); // Call the function to attach event listeners
            }
            else {
                updateTopics(response.sendata, document.getElementById('topicnames').value)
                useArr(response.sendata)
            }
        }
    })
}


function filterDuplicates(d) {
    let b = []
    let m = []
    d.forEach(e => {
        let j = m.find(p => p == e.class)
        if (!j) {
            b.push(e)
            m.push(e.class)
        }

    })
    return b
}


function Export2Doc(element, filename = '') {

    var customCSS = `
<style>
div {
  /* Add your CSS styles for div tags here */
  font-size: 16px;
  color: #333;
  background-color: #eee;
}
p {
  /* Add your CSS styles for p tags here */
  font-size: 14px;
  color: #444;
}
/* Add more CSS rules as needed */
</style>
`;

    var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
        "xmlns:w='urn:schemas-microsoft-com:office:word' " +
        "xmlns='http://www.w3.org/TR/REC-html40'>" +
        "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    var footer = "</body></html>";
    var sourceHTML = header + element + footer;

    var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    var fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'document.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
}

function loadInitialData() {
    $.ajax({
        url: "https://articleapiapp.onrender.com/",
        method: "GET",
        data: {},
        success: function (response) {
            document.getElementById('goBack').innerText = response.goback
            document.getElementById('gr').innerText = response.grade
            document.getElementById('tp').innerText = response.topic
            document.getElementById('alltopics').innerText = response.alltopics.filter(d => Object.keys(d).length != 0)
            document.getElementById('ndata').innerText = response.articles

        }
    })
}




