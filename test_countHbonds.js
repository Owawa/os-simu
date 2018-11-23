// 組み合わせの列挙関数.
// array配列の要素を selectNum 個 選んだものを要素とする二次元配列を返す.
var enumCombinations = function( array, selectNum ) {

    var i,j;
    var combi = [];
    var sub;
    var len = array.length;

    if ( len < selectNum ) { return; } // 異常入力


    if ( selectNum === 1 ) {
	for (i=0; i<len; i++) {
	    combi[i] = [array[i]];
	}
    } else {
	for (i=0; i <= (len - selectNum); i++) {
	    sub = enumCombinations( array.slice(i+1), selectNum-1);
	    for (j=0; j < sub.length; j++) {
		combi.push( [array[i]].concat( sub[j] ) );
	    }
	}
    }
    return combi;
};


var setCombination  = function (c, array) {
    var i;
    for(i=0; i<array.length; i++){ array[i] = false; }      // 初期化.

    for(i=0; i<c.length; i++){ // 適用
	    array[ c[i] ] = true;
    }
    return;
}


var i, j, k, x;

var positionNum = 10; 
var nowMax = -1;           
var combi = new Array( positionNum ); // 要素pN個の配列
var combinationList = [];  
var status;
var numArray = [];
for(i=0; i<positionNum; i++){  numArray[i] = i; }


for (i = positionNum; i>0; i--) {

    combinationList = enumCombinations(numArray, i);  // 組み合わせのリスト.
    // for(x=0; x<combinationList.length; x++){ console.log( combinationList[x] ); }

    for(j=0, N=0; j < combinationList.length; j++){
	
	setCombination( combinationList[j], combi );    // j番目を combi に適用.

	console.log( combi );
	for(k=0; k < positionNum ; k++){
	    if ( combi[k] ){
		console.log( k + ' :  true.' );
	    }
	}
    }
}

