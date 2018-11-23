// n_C_m 通りの組み合わせを列挙する関数のテスト.
// クロージャで実現してみる??
// < combi_tes.js >





// クロージャ.
var combiMaker = function ( totalNum, combi, selectNum) {
    // 仮引数の情報も, makerに紐づけされ続ける.



    var nowStack = [0];   // 現在の経路
    var reached  = [false];   // 到達済みの節


    // 呼び出し元に返す関数
    var maker = function( ){
	
	// すべての要素をまず false に初期化.
	var i;
	for ( i=0; i<totalNum; i += 1) {
	    combi[i] = false;
	}
	

	// 選ぶ数( selectNum )再帰関数.
	var select = function( n ) {

	    // まだ選んでいない点をnowStackの末尾へ追加する.
	    for (i= nowStack[-1]; i<totalNum; i++) {
		if ( reached[i] === false ) {
		    nowStack.push(i);
		    reached.push(i);
		    break;
		}
	    }
	    if(i = totalNum){ // すべて選んでいるなら, もどる
		nowStack.pop();
		return; 
	    } 

	    




	    if( n === 1 ){ 
		return; 

	    }else{
		return select( n-1 );
	    }

	};//

	
	
	return  select( selectNum );
    };
    /////////////////////////


    return maker;
};




// Array.prototype.enumConmbinations = function(){};


var enumCombinations = function(array, selectNum) {

    //
    // 
    var i, j;
    var combi = []; 
    var sub;
    var len = array.length;
    
    if( len < selectNum ) { return ; } // 異常入力.
    
    
    if ( selectNum == 1 ) {        // 1つ選ぶだけなら, 各要素を1つ入れるだけ.
	for (i=0; i<len; i++) {
	    combi[i] = [ array[i] ];
	}
    } else {
	for(i=0; i <= (len - selectNum); i++ ){
	    sub = enumCombinations( array.slice(i+1) , selectNum-1);
	    for(j=0; j < sub.length; j++){
		combi.push( [array[i]].concat( sub[j] ) );
	    }
	}
	
    }
    
    return combi;
};






var i;
var possibleHbondNum = 6;
var pickHbondNum = 3;
var hbondIndexArray = [];

for(i=0; i< possibleHbondNum; i++){
    hbondIndexArray[i] = i;
}

console.log( hbondIndexArray );



result  = enumCombinations( hbondIndexArray, pickHbondNum );


for(i=0; i < result.length; i++){
    console.log( result[i] );
}