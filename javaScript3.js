window.addEventListener('load', function(event) {

// Variabler osv

let canvas = document.getElementById("myCanvas");
let context = canvas.getContext('2d');
let clearCanvas = document.getElementById("clearCanvas");
let menu = document.getElementById("menu");
let showMenu = document.getElementById("showMenu");
let status = document.getElementById("statusbar");
var cancelPainting = document.getElementById("cancel");
var selectColor = document.getElementById("hej");
var colorOption = document.getElementsByTagName("option");
var addColor = document.getElementById("addColor");
let hexColors = '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$';
let userHex;

// Menyn //
menu.style.display = "none";
showMenu.addEventListener("click", function(event){
  if (menu.style.display == "none")
   { menu.style.display = "block";}
  clicks = [];
})

menuList.addEventListener("mouseleave", function(event){
  
  menu.style.display = "none";
})

// Statusbar // 

showMenu.addEventListener("mouseenter", function(event){
  
  status.innerText = "Status: Öppna meny";
})

showMenu.addEventListener("mouseleave", function(event){
  status.innerText = "Status:";
})

status.addEventListener("mouseenter", function(event){
  status.innerText = "Status: Statusbar";
})

status.addEventListener("mouseleave", function(event){
  status.innerText = "Status:";
})

cancelPainting.addEventListener("mouseover", function(event){
  
  status.innerText = "Status: Klicka här för att avbryta ritningen";
})

cancelPainting.addEventListener("mouseleave", function(event){
  
  status.innerText = "Status:"
})

cancelPainting.addEventListener("click", function(event){
  
  status.innerText = "Status: Du avbröt ritningen";
})
                               

selectColor.addEventListener("mouseover", function(event){

  status.innerText = "Status: Välj färg";
})

canvas.addEventListener("mouseover", function(event){
	status.innerText = "Välj en figur i menyn för att börja rita";
})

addColor.addEventListener("mouseover", function(event){
	status.innerText = "Klicka här för att lägga till den nya färgen i listan";
})

addColor.addEventListener("click", function(event){
	status.innerText = "Fären lades till i listan";
})

newColor.addEventListener("click", function(event){
	status.innerText = "Ange en färg i hexkod-format";
	
})

// Prototyper till geometriska figurer // 
// Cirkel//
function Circle(centerX, centerY, radius){
	this.centerX = centerX;
	this.centerY = centerY;
	this.radius = radius; 
	
	this.draw= function(){
	
	context.beginPath();
	context.strokeStyle = selectColor.value;
    context.arc(this.centerX, this.centerY, this.radius, 0, 2*Math.PI);
    context.stroke(); 
      addToDrawings();
	};
}
// Triangel //
function Triangle(x1, y1, x2, y2, x3, y3){  //x1, y1 = 1 punkt. 
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2; 
	this.y2 = y2;
	this.x3 = x3; 
	this.y3 = y3; 
  
  this.draw = function() {         
context.beginPath();         
context.strokeStyle = selectColor.value;        
context.moveTo(this.x1, this.y1);         
context.lineTo(this.x2, this.y2);        
context.lineTo(this.x3, this.y3);        
context.closePath();       
context.stroke(); 
addToDrawings();
};
}


	
// Rektangel //
function Rectangle(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y1;
    this.x3 = x2;
    this.y3 = y2;
    this.x4 = x1;
    this.y4 = y2;
	
    this.draw = function() {
      context.beginPath();
      context.strokeStyle = selectColor.value;
      context.moveTo(this.x1, this.y1); 
      context.lineTo(this.x2, this.y2); 
      context.lineTo(this.x3, this.y3);
      context.lineTo(this.x4, this.y4);
      context.closePath();
      context.stroke();
      addToDrawings();
      
	};
}


function getMousePosition(canvas, event){

let canvasPosition = canvas.getBoundingClientRect();

 return {   
    x: event.clientX - canvasPosition.left,
    y: event.clientY - canvasPosition.top
  };
}

// hämtar figurknapparna från menyn och ger dem en variabel
var drawRectangle = document.getElementById("rectangle");
var drawTriangle = document.getElementById("triangle");
var drawCircle = document.getElementById("circle");

// Sätter alla knapptryck till false
let userClickedCircle = false;
let userClickedRectangle = false;
let userClickedTriangle = false;

// skapa en tom lista som skall fyllas med klick
let clicks = [];

// Sätter userClickedCircle till true när man trycker på cirkel i menyn. 
drawCircle.addEventListener("click", function(event){
userClickedRectangle = false;
userClickedTriangle = false;
userClickedCircle = true;
status.innerText = "Status: Rita en cirkel";
})

// Sätter userClickedRectangle till true när man trycker på rektangel i menyn. 
drawRectangle.addEventListener("click", function(event){
userClickedCircle = false;
userClickedTriangle = false;
userClickedRectangle = true;
status.innerText = "Status: Rita en rektangel";
})

// Sätter userClickedTriangle till true när man trycker på triangel i menyn. 
drawTriangle.addEventListener("click", function(event){
userClickedCircle = false;
userClickedRectangle = false;
userClickedTriangle = true;
status.innerText = "Status: Sätt ut den första punkten i triangeln";
})

// CANVAS // 
canvas.addEventListener("click", function(event){

let mousePosition = getMousePosition(canvas, event);
clicks.push(mousePosition);
 console.log(clicks.length);
  
if (userClickedTriangle === true)
{
	if (clicks.length == 1)
		{
		 status.innerText = "Sätt ut triangelns andra punkt";
		}
	else if (clicks.length == 2)
		{
			
			status.innerText = "Sätt ut triangelns tredje punkt";
		}
	else if (clicks.length == 3)
		{
			let newTriangle = new Triangle(clicks[0].x, clicks[0].y, clicks[1].x, clicks[1].y, clicks[2].x, clicks[2].y)
               newTriangle.draw();
			   clicks = [];
          console.log(newTriangle);
		}
}
else if (userClickedRectangle === true){
	
	if (clicks.length == 1)
		{
		 status.innerText = "Sätt ut rektangelns motsatta hörn";
		}
	else if (clicks.length == 2)
		{

			let newRectangle = new Rectangle(clicks[0].x, clicks[0].y, clicks[1].x, clicks[1].y)
               newRectangle.draw();
			   clicks = [];		
		}
}
else if (userClickedCircle === true){
	
	if (clicks.length == 1)
	{
		status.innerText = "Sätt ut cirkelns radie";
	}
	else if (clicks.length == 2)
	{
        let radius = Math.sqrt( Math.pow((clicks[0].x - clicks[1].x), 2) + Math.pow((clicks[0].y - clicks[1].y), 2) )
		let newCircle = new Circle(clicks[0].x, clicks[0].y, radius)
		newCircle.draw();
		clicks = [];
	}
}
})

// SPARA CANVAS

let drawings = [];
function addToDrawings(){
  let drawing = {
    coordinates: clicks,
    color: selectColor.value
  };
  drawings.push(drawing);
  console.log(drawings);
}

// clear canvas //

clearCanvas.addEventListener("click", function(event){
  
  context.clearRect(0, 0, 400, 400);
   jsonText.innerHTML = "";
   json.style.display = "none";
   drawings = [];

})

// EXPOERTERA TILL JSON

let exp = document.getElementById("expJSON");
let jsonText = document.getElementById("jsonText");
let json = document.getElementById("JSON");

json.style.display = "none";

exp.addEventListener("click", function(event){
  
  json.style.display = "block";
  let jsonObj = JSON.stringify(drawings);
  jsonText.innerHTML = jsonObj;
});


cancelPainting.addEventListener("click", function(event){
	
	clicks = [];
})


let okColor;
 
newColor.addEventListener('keyup', function (event) {
           
if (newColor.value.match(hexColors) !== null) {
               
okColor = true;
               status.innerHTML = "Giltig färg!";
               addColor.disabled = false;
           }
           else if (newColor.value.match(hexColors) == null || newColor.value == "") {
               okColor = false;
               status.innerHTML = "ogiltig färgkod...";
               addColor.disabled = true;
           }
       })


// Add Color to list

addColor.addEventListener('click',function(event){
   if (okColor === true){
       userHex = newColor.value.toLowerCase();
       
let newOption = document.createElement('option');
    
newOption.value = userHex;
       
newOption.innerHTML = userHex;
       selectColor.appendChild(newOption);
       status.innerHTML ="färg tillagd i listan";}
   else {
       status.innerHTML = "ogiltig färgkod..."
   }
})




function getColor(){
   let c = document.getElementById('hej').value;
   return c;
}

selectColor.addEventListener('change', function(event){
   context.strokeStyle = getColor();
})

});


