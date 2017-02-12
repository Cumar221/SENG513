function getStats(txt) {
    test(txt);
    return {
        nChars: txt.length,
        nWords: txt.split(/[^0-9'a-zA-Z_]/).filter(Boolean).length,
        nLines: txt.split(/\r\n|\r|\n/).length,
        nNonEmptyLines: txt.replace(/ /g, '').replace(/\t/, '').split(/\r\n|\r|\n/).filter(Boolean).length,
        maxLineLength:  maxLineLength(txt),
        averageWordLength: avgWordLength(txt),
        palindromes: palindromes(txt),
        longestWords: longestWords(txt),
        mostFrequentWords: mostFrequentWords(txt)
    };
}
function test(txt) {
    console.log(txt.split(/[^0-9'a-zA-Z_]/).filter(Boolean));
}
function maxLineLength(txt){
    var arr = txt.split(/\r\n|\r|\n/).filter(Boolean);
    var length = 0;

    for(var i = 0; i < arr.length; i++) {
        if (arr[i].length > length) {
            length = arr[i].length;
        }
    }
    return length;
}
function avgWordLength(txt){
    var arr = txt.split(/[^0-9'a-zA-Z_]/).filter(Boolean)
    var sum = 0;

    for(var i = 0; i < arr.length; i++){
        sum = sum + arr[i].length
    }
    return (sum/arr.length)
}
function palindromes(txt) {
    var arr = txt.split(/[^0-9'a-zA-Z_]/).filter(Boolean);
    var palindromes = [];
    for(var i = 0; i < arr.length; i++){
        if (arr[i].length > 2){
            for(var x = 0 , z = arr[i].length-1; x < arr[i].length/2; x++ , z--){
                if (arr[i][x].toLowerCase() == arr[i][z].toLowerCase()){
                    if((x + 1) == z || x == z) {
                        if(!palindromes.includes(arr[i].toLowerCase())) {
                            palindromes.push(arr[i].toLowerCase());
                        }
                    }
                }
                else{
                    x = arr[i].length;
                }
            }
        }
    }
    return palindromes;
}
function longestWords(txt) {
    var words = txt.toLowerCase().split(/[^0-9'a-zA-Z_]/).filter(Boolean);
    var longestWords = [];
    var x = 0;
    var descSortedWords = words.sort(function(a,b){
        return b.length - a.length;
    });


    while(longestWords.length < 10 && x < descSortedWords.length){
        if(descSortedWords[x] != undefined) {
            if(!(longestWords.includes(descSortedWords[x])))
                longestWords.push(descSortedWords[x]);
        }
        x++;
    }
    var ans = longestWords.sort(function (a,b) {
        if(a.length == b.length){
            return a < b ? -1 : a > b ? 1 : 0;
        }
    });
    return ans;
}
function mostFrequentWords(txt) {
    var words = txt.toLowerCase().split(/[^0-9'a-zA-Z_]/).filter(Boolean);
    var list = [];
    var mostFreqWords = [];
    var ans = [];

    for(var i = 0; i < words.length; i++) {
        if (words[i] != undefined) {
            var wordFreq = new Object();
            wordFreq.name = words[i];
            wordFreq.count = 0;
            for (var x = i; x < words.length; x++) {
                if (wordFreq.name === words[x]) {
                    wordFreq.count = wordFreq.count + 1;
                    words[x] = undefined;
                }
            }
            list.push(wordFreq);
        }
    }
    var sortedWords = list.sort(function (a,b) {
        return b.count - a.count;
    });
    var x = 0;
    while(mostFreqWords.length < 10 && x < sortedWords.length){
        mostFreqWords.push(sortedWords[x]);
        x++;
    }

    var aSorted = mostFreqWords.sort(function (a,b) {
        if(a.count == b.count){
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        }
    });

    for(var i =0; i < aSorted.length; i++){
        ans.push(aSorted[i].name + "(" + aSorted[i].count + ")");
    }
    return ans;
}