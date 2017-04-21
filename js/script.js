function blochainInfoLoading() {
    url = 'https://bitcoin.mubiz.com/blockchaininfo';
    elementID = 'blockChainInfo';
    functionAPI(url, elementID);
}

function miningInfoLoading() {
    url = 'https://bitcoin.mubiz.com/mininginfo';
    elementID = 'miningInfo';
    functionAPI(url, elementID);
}

function peerInfoLoading() {
    url = 'https://bitcoin.mubiz.com/peerinfo';
    elementID = 'peerInfo';
    functionAPI(url, elementID);
}

function bitcoinInfoLoading() {
    url = 'https://bitcoin.mubiz.com/info';
    elementID = 'bitcoinInfo';
    functionAPI(url, elementID);
}


function getByAdrees() {

    var adress;

    adress = document.getElementById("search_key").value;
    if (urlCorrect(adress)) {

        functionAPI(adress);
    }
}

function urlCorrect(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$', 'i');
    if (!pattern.test(str)) {
        alert("Merci d'entrer un URL");
    }
    return pattern.test(str);
}

function functionAPI(search) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = this.responseText;
            var jsonPretty = JSON.stringify(JSON.parse(myObj), null, 2);
            document.getElementById("result").innerHTML = syntaxHighlight(jsonPretty);
        }
    };
    xmlhttp.open("GET", search, true);
    xmlhttp.send();
}

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}