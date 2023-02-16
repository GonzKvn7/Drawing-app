const canvas = document.getElementById("canvas")
canvas.height = window.innerHeight
canvas.width = window.innerWidth

//ctx is the context of our canvas
// we use ctx to draw on the canvas

const ctx = canvas.getContext("2d")

//previous mouse positions
//they will be null intially

let prevX = null
let prevY = null

// How thick the lines should be
ctx.lineWidth = 5

let draw = false

let clrs = document.querySelectorAll(".clr")
clrs = Array.from(clrs)
clrs.forEach(clr => {
    clr.addEventListener("click", () => {
        ctx.strokeStyle = clr.dataset.clr
    })
})

let clearBtn = document.querySelector(".clear")
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0,0, canvas.width, canvas.height)
})

//Saving drawing as image
let saveBtn = document.querySelector(".save")
saveBtn.addEventListener("click",() => {
    let data = canvas.toDataUrl("imag/png")
    let a = document.createElement("a")
    a.href = data
    //whatever name you specify here
    //the image will be saved as that name
    a.download = "sketch.png"
    a.click()
})



//Set Draw to true when mouse is pressed
window.addEventListener("mousedown", (e) => draw = true)
// Set draw to false when mouse is released
window.addEventListener("mouseup", (e) => draw = false)

window.addEventListener("mousemove", (e) => {

//if draw is false then we don't draw    
    if(prevX == null || prevY == null || !draw){
        prevX = e.clientX
        prevY = e.clientY
        return
    }
    
    //Current mouse position
    let currentX = e.clientX
    let currentY = e.clientY

    //Drawing a line from the previous mouse position to the current mouse position
    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()

    //Update previous mouse position 
    prevX = currentX
    prevY = currentY
})
