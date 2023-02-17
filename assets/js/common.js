//초성중성종성을 나누는 함수 
String.prototype.toKorChars = function() { 
    var cCho = [ 'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ], 
    cJung = [ 'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ' ], 
    cJong = [ '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ], cho, jung, jong; 
    var str = this, 
    cnt = str.length, 
    chars = [], 
    cCode; 
    for (var i = 0; i < cnt; i++) { 
        cCode = str.charCodeAt(i); 
        if (cCode == 32) { 
          chars.push(" ");
          continue;
        } // 한글이 아닌 경우 
        if (cCode < 0xAC00 || cCode > 0xD7A3) { 
            chars.push(str.charAt(i)); continue; 
            } 
        cCode = str.charCodeAt(i) - 0xAC00; 

        jong = cCode % 28; 
        // 종성 
        jung = ((cCode - jong) / 28 ) % 21 

        // 중성 
        cho = (((cCode - jong) / 28 ) - jung ) / 21 
        // 초성 

        //기본 코드 테스트가 ㅌㅔㅅ-ㅌ- 형식으로 저장됨 
        // chars.push(cCho[cho], cJung[jung]); 
        // if (cJong[jong] !== '') { 
        //     chars.push(cJong[jong]); 
        //     } 

        // 이부분을 원하는 방향으로 바꿈.
        // 테스트라는 문장이 
        // ㅌ,ㅔ,ㅅ,-,ㅌ,- 형식으로 저장되던 코드를 
        // ㅌ,테,ㅅ,스,ㅌ,트 형식으로 저장되도록함 (타이핑효과를 위해서)
        chars.push(cCho[cho]);
        chars.push(String.fromCharCode( 44032 + (cho * 588) + (jung  * 28)));
        if (cJong[jong] !== '') { 
            chars.push(String.fromCharCode( 44032 + (cho * 588) + (jung  * 28) + jong ));
        }
       
    } 
    
    return chars; 
}


//타이핑할 문장
var result  = "AfreSh<br>PORTFOLIO.";
var typeing1=[];
result = result.split(''); // 한글자씩자름

//각글자 초성,중성,종성으로 나눠서 배열로 저장함.
for(var i =0; i<result.length; i++){
    typeing1[i]=result[i].toKorChars();
}

//출력할 엘리먼트요소 가져옴 -result클래스에 출력
var resultDiv = document.getElementsByClassName("type-text")[0];

var text = "";
var i=0; 
var j=0; 
var text = '';


//총글자수
var imax = typeing1.length;

//setInterval을 이용해 반복적으로 출력 
var inter = setInterval(typi,150);


function typi(){
    //글자수만큼 반복후 종료 
    if(i<=imax-1){
        //각 글자가 초성 중성 종성 순서대로 추가되도록 
        var jmax = typeing1[i].length;
        resultDiv.innerHTML = text + typeing1[i][j];
        j++;
        if(j==jmax){
            text+=  typeing1[i][j-1];
            //초성중성종성 순서대로 출력된 후 글자는 저장 ( 다음 글자와 이어붙이기 위해서 )
            
           
            i++;
            j=0;
        }
    } else{
        clearInterval(inter);
    }
}

var wrapper = document.querySelector('.logo svg')

// We are only adding and removing the 'active' class,
// the entire animation is defined in the CSS code
function draw() {
  wrapper.classList.add('active')
}

function erase() {
  wrapper.classList.remove('active')
}

// Play draw animation once
setTimeout(draw, 300)

// modal window

const modal = document.getElementById("modal");
const btnModal = document.querySelectorAll(".imgs");
const modalImage = document.getElementById("modalImg");
const title = document.querySelector(".title h2");
const body = document.querySelector("body");
const modalwin = document.querySelector(".modal-window");

window.onload = function() {
    let bigPic = document.getElementById("modalImg");
    let smallPics = document.querySelectorAll(".imgs");
    let bigPicTitle = document.querySelector(".title h2");


    for(let i = 0; i < smallPics.length; i++) {
        smallPics[i].onclick = changepic;
    }

    function changepic() {
        let smallPicsAttribute = this.getAttribute('src');
        let smallPicsAttributealt = this.getAttribute('alt');
        bigPic.setAttribute('src', smallPicsAttribute);
        bigPicTitle.innerHTML = smallPicsAttributealt;
    }
}

btnModal.forEach( (list) => {
    list.addEventListener("click", e => {
        modal.classList.remove('fadeOut');
        modal.classList.add('fadeIn');
        modal.style.display = "flex";
        modal.classList.toggle("hidden");

        if (!modal.classList.contains("hidden")) {
            // Disable scroll
            body.style.overflow = "hidden";
        } else {
            // Enable scroll
            body.style.overflow = "auto";
        }
        modalwin.scrollTo( 0, 0 );
    })
});

const closeBtn = modal.querySelector(".close-area")
closeBtn.addEventListener("click", e => {
    modal.classList.remove('fadeIn');
    modal.classList.add('fadeOut');
    setTimeout(function(){
        modal.style.display = "none";
    }, 500); 
    modal.classList.toggle("hidden");
    if (!modal.classList.contains("hidden")) {
        // Disable scroll
        body.style.overflow = "hidden";
    } else {
        // Enable scroll
        body.style.overflow = "auto";
    }
})

modal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.classList.contains("modal-overlay")) {
        modal.classList.remove('fadeIn');
        modal.classList.add('fadeOut');
        modal.classList.toggle("hidden");
        setTimeout(function(){
            modal.style.display = "none";
        }, 500);
        if (!modal.classList.contains("hidden")) {
            // Disable scroll
            body.style.overflow = "hidden";
        } else {
            // Enable scroll
            body.style.overflow = "auto";
        }
    };
})

window.addEventListener("keyup", e => {
    if(modal.style.display === "flex" && e.key === "Escape") {
        modal.classList.remove('fadeIn');
        setTimeout(function(){
            modal.style.display = "none";
        }, 500);
        modal.classList.add('fadeOut');
        modal.classList.toggle("hidden");
        if (!modal.classList.contains("hidden")) {
            // Disable scroll
            body.style.overflow = "hidden";
        } else {
            // Enable scroll
            body.style.overflow = "auto";
        }
    }
})

document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages;    
  
    if ("IntersectionObserver" in window) {
      lazyloadImages = document.querySelectorAll(".lazy");
      var imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var image = entry.target;
            image.src = image.dataset.src;
            image.classList.remove("lazy");
            image.classList.add("lazyOn");
            imageObserver.unobserve(image);
          }
        });
      });
  
      lazyloadImages.forEach(function(image) {
        imageObserver.observe(image);
      });
    } else {  
      var lazyloadThrottleTimeout;
      lazyloadImages = document.querySelectorAll(".lazy");
      
      function lazyload () {
        if(lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }    
  
        lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('lazyOn');
              }
          });
          if(lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
        }, 20);
      }
  
      document.addEventListener("scroll", lazyload);
      window.addEventListener("resize", lazyload);
      window.addEventListener("orientationChange", lazyload);
    }
})

window.scroll({
    top: 0,
    left: 100,
    behavior: 'smooth'
});

const preload = (images) => () => {
    images.forEach((image) => {
        const img = new Image();
        img.src = image;
    });
};