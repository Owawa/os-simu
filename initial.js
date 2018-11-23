﻿// <initial.js>
// Similator of 2D Oritatami System.
// initialize OS-simulator's name space.
//  and a bit more..

//////////
// Grobal な 値の定義
INITIAL_GRID_SIZE_X = 32;
INITIAL_GRID_SIZE_Y = 32;

var nonDetRoutes = [];   // nondeterministic なとき, 複数のRouteを保存する用.
var nonDetHbonds = [];   // nondeterministic なとき, 複数のHbondの組を保存する用.


var adjacents = [ {x: 1, y: 0}, {x: -1, y: 0},
		  {x: 0, y: 1}, {x: 0,  y: -1},
		  {x: 1, y: 1}, {x: -1, y: -1} ];

// Oritataim System が持つべき変数群を収める名前空間.
var OSVars = {
    cons : {
	     alpha : 2,         // alpha, deltaはこの値を上書きする.
             delta : 3,
             len   : 15,        // 高分子鎖の長さ (seedも含める) .
	     beadTypeNum : 0    // 高分子の種類.
    },

    mode : { 
	indexEqualBeadtype : false
    },

    word   :   [ ],    // 高分子の鎖を順にならべたリスト.
    w_path :   [ ],    // 高分子の鎖が辿った点のリスト

    ruleset :  [],     // 高分子種どうしが水素結合を結べるかどうか定める. 2dMatrix.

    occupied : [],     // 点の占有情報. [(高分子種,index,hbond数)/false] を２次元配列で保存.
                       

    oc_size  : { x: INITIAL_GRID_SIZE_X, 
		 y: INITIAL_GRID_SIZE_Y },   // occupied配列の[縦/横]幅

    // bond_num :   [],   // 各高分子が結んでいるhbondの数(現在未使用)
    hbonds   :   [],   // 実際に形成されたhbondの情報 [pi,pj] (i != j) をもつ 

    step :   0,         // 最適化ステップの段階.1ずつ増える.
                       // 現在, indexいくつの高分子位置を最適化しているかを表す.
    initialStep : 0
};
//
//////////

initOccupied( INITIAL_GRID_SIZE_X, INITIAL_GRID_SIZE_Y );


// 追加点(いじわるケース)
// OSVars.occupied[17][9] = { beadType: 21, index : -1, bondNum : 0 };
// OSVars.occupied[18][9] = { beadType: 21, index : -2, bondNum : 0 };
// OSVars.occupied[19][10] = { beadType: 40, index : -3, bondNum : 0 };
// OSVars.occupied[20][11] = { beadType: 40, index : -3, bondNum : 0 };


// occupied配列の初期設定(seed)
// 左上
setSeed(21, 20 , { beadType: 60, index : -3, bondNum : 0 } );

// 真上
setSeed(22, 20 , { beadType: 29, index : -3, bondNum : 1 } );
setSeed(23, 20 , { beadType: 28, index : -3, bondNum : 1 } );
setSeed(24, 20 , { beadType: 27, index : -3, bondNum : 1 } );
setSeed(25, 20 , { beadType: 26, index : -3, bondNum : 1 } );

// 右上
setSeed(26, 20 , { beadType: 80, index : -3, bondNum : 0 } );

// 左
//// T

setSeed(22, 23 , { beadType: 49, index : 0, bondNum : 0 } );
setSeed(22, 22 , { beadType: 50, index : 1, bondNum : 0 } );
setSeed(21, 21 , { beadType: 51, index : 2, bondNum : 0 } );


//// F
/*
setSeed(21, 21 , { beadType: 49, index : 0, bondNum : 0 } );
setSeed(22, 22 , { beadType: 50, index : 1, bondNum : 0 } );
setSeed(22, 23 , { beadType: 51, index : 2, bondNum : 0 } );
*/

// 左のブロック(経路を塞ぐだけ)
setSeed(20, 20 , { beadType: 99, index : -4, bondNum : 0 } );
setSeed(20, 21 , { beadType: 99, index : -4, bondNum : 0 } );
setSeed(21, 22 , { beadType: 99, index : -4, bondNum : 0 } );


// T

setSeed(21, 23 , { beadType: 48, index : -4, bondNum : 0 } );

// F

// setSeed(21, 23 , { beadType: 99, index : -4, bondNum : 0 } );


/////////////////////////

// T

OSVars.w_path = [

    {x: 22, y: 23},
    {x: 22, y: 22},
    {x: 21, y: 21}
];


// F
/*
OSVars.w_path = [

    {x: 21, y: 21},
    {x: 22, y: 22},
    {x: 22, y: 23}
];
*/
// seedとの境目がここで決まる.
OSVars.step = 3;
OSVars.initialStep = 3;

// len = 65??
