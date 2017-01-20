var $pad;
var widthSquareCount = 0;
var heightSquareCount = 0;
var totalGridSquares = 0;
var penColour = "black";
var isDrawOn = true;

const MIN_SIZE = 1;
const MAX_SIZE = 50;

function onClickClearGrid(){
  $('.grid-square').css("background-color", "white");
}

function onClickResizeGrid(){

  var newWidth = prompt("Enter a new width ("+MIN_SIZE +"-"+MAX_SIZE+") for the sketch-pad");
  var newHeight = prompt("Enter a new height ("+MIN_SIZE +"-"+MAX_SIZE+") for the sketch-pad");

  if( (newWidth <=MIN_SIZE || newWidth > MAX_SIZE) || (newHeight <=MIN_SIZE || newHeight > MAX_SIZE) ){
    alert("Sorry, one of the values you have entered is not useable.\n" +
          "Please enter a value between "+MIN_SIZE+" and " +MAX_SIZE);
    return;
  }

  widthSquareCount = newWidth;
  heightSquareCount = newHeight;
  totalGridSquares = newWidth * newHeight;

  insertGridSquareDivs();
}

$(document).ready(function() {

  $pad = $('#pad');
  widthSquareCount = 16;
  heightSquareCount = 16;
  totalGridSquares = widthSquareCount * heightSquareCount;

  insertGridSquareDivs();

  var colourPriorToMouseEnter;

  $('#pad').on("mouseenter","div",function (){
    if(isDrawOn){
      $(this).css("background-color",penColour);
    }else{
      colourPriorToMouseEnter = $(this).css("background-color");
      $(this).css("background-color", "rgba(100, 128,128,128)");
    }
  });

  $('#pad').on("mouseleave","div",function (){
    if(!isDrawOn){
      $(this).css("background-color", colourPriorToMouseEnter);
    }
  });

  $('#pad').on("click","div",function (){
    isDrawOn = !isDrawOn;
    if(isDrawOn){
      $(this).css("background-color",penColour);
    }
  });

  $("input:radio[name=colours]").filter("[value=black]").prop("checked",true);

  $("#radio-black").on("click", function() {
    penColour = "black";
  });

  $("#radio-grey").on("click", function() {
    penColour = "grey";
  });

  $("#radio-white").on("click", function() {
    penColour = "white";
  });

  $("#radio-red").on("click", function() {
    penColour = "red";
  });

  $("#radio-green").on("click", function() {
    penColour = "green";
  });

  $("#radio-blue").on("click", function() {
    penColour = "blue";
  });
});

function insertGridSquareDivs(){

  $pad.empty();
  var $gridSquare = buildGridSquare();

  for(var a=0; a<totalGridSquares; a++){
      $pad.append($gridSquare.clone());
  }
}

function buildGridSquare(){

  var $gridSquare = $('<div></div>');
  $gridSquare.addClass('grid-square');
  $gridSquare.width(getGridSquareWidth($pad.width(), widthSquareCount));
  $gridSquare.height(getGridSquareWidth($pad.height(), heightSquareCount));
  return $gridSquare;

}

function getGridSquareWidth(padWidth, squares){
  return padWidth/squares+"px";
}

function getGridSquareHeight(padHeight, squares){
  return padHeight/squares+"px";
}
