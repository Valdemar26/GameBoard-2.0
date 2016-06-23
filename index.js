var game_array = ['lime','lime', 'crimson','crimson', 'goldenrod','goldenrod', 'indigo', 'indigo','aqua', 'aqua', 'fuchsia', 'fuchsia', 'DarkGreen','DarkGreen', 'Silver','Silver'];

var colors_values = [];
var color_tile_ids = [];
var tiles_flipped = 0;

Array.prototype.color_tile_shuffle = function(){
    var counter = this.length,
        index,
        temp;

    // While there are elements in the array
    while(counter > 0){
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;
        // And change the last element with it
        temp = this[counter];
        this[counter] = this[index];
        this[index] = temp;
    }
};

function newBoard(){
    document.getElementById("count-click").innerHTML = 0;
    document.getElementById("round-click").innerHTML = 0;
    tiles_flipped = 0;
    var output = '';
    game_array.color_tile_shuffle();
    for(var i = 0; i < game_array.length; i++){
        output +=
            '<div id="tile_'+i+'" onclick="colorFlipTile(this,\''+game_array[i]+'\')"></div>';
    }
    document.getElementById('game_board').innerHTML = output;
}

// Counter for clicks and rounds
var clicks = 0;
function onClick() {
    clicks += 1;
    document.getElementById("count-click").innerHTML = clicks;
}

var round = 0;
function onRound() {
    round = Math.floor(clicks/2);
    document.getElementById("round-click").innerHTML = round;
}
// end counter


function clearBothArrays(){
    colors_values = [];
    color_tile_ids = [];
}



function colorFlipTile(tile,val){
    onClick();
    onRound();
    if(tile.innerHTML == "" && colors_values.length < 2){
        tile.style.background = '#fff';
        tile.style.backgroundColor = val;
        if(colors_values.length == 0){
            colors_values.push(val);
            color_tile_ids.push(tile.id);
        } else if(colors_values.length == 1){
            colors_values.push(val);
            color_tile_ids.push(tile.id);
            if(colors_values[0] == colors_values[1]){
                tiles_flipped += 2;
                // Clear both arrays
                clearBothArrays();
                // Check to see if the whole board is cleared
                if(tiles_flipped == game_array.length){
                    alert("Congrats! You win! Generate new board!");
                    document.getElementById('game_board').innerHTML = "";
                    newBoard();
                }
            } else {
                function flip2Back(){
                    // Flip the 2 tiles back over
                    var tile_1 = document.getElementById(color_tile_ids[0]);
                    var tile_2 = document.getElementById(color_tile_ids[1]);
                    tile_1.style.background = 'url(ball.png) no-repeat';
                    tile_1.style.backgroundPosition = "center";
                    tile_1.style.backgroundSize = "100%";
                    tile_1.innerHTML = "";
                    tile_2.style.background = 'url(ball.png) no-repeat';
                    tile_2.style.backgroundPosition = "center";
                    tile_2.style.backgroundSize = "100%";
                    tile_2.innerHTML = "";
                    // Clear both arrays
                    clearBothArrays();
                }
                setTimeout(flip2Back, 700);
            }
        }
    }
}
