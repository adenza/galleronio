var imgLoadOrigin = function(item) {
    var image = new Image();
    image.addEventListener('load', function () {
        item.classList.remove("loading"); item.src = image.src;
    });
    image.src = item.dataset.origsrc;
}

var galleries = document.getElementsByClassName("galleronio");

for (var galleryIdx=0; galleryIdx < galleries.length; galleryIdx++) {
    (function(gallery){
    gallery.dataset.idx = 0;
    var ul =  gallery.getElementsByTagName("ul")[0];
    var lis = gallery.getElementsByTagName("li");
    var img = gallery.getElementsByTagName("img");
    for (var i=0;i<img.length;i++) {
         var item = img.item(i);
         item.dataset.origsrc = item.src;
         item.classList.add("loading");
         // blank transparent pixel as default image instead
         item.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
     }

     if (lis.length > 1) {
         // create next button
         gallery.nextBtn = document.createElement('BUTTON');
         gallery.nextBtn.innerHTML = "&#10094;";
         gallery.nextBtn.classList.add("btn-prev");
         gallery.nextBtn.tabIndex = -1;
         gallery.nextBtn.onclick = function (ev) { gallery.transit(-1); }
         ul.appendChild(gallery.nextBtn);

         // create prev btn
         gallery.prevBtn = document.createElement('BUTTON');
         gallery.prevBtn.innerHTML = "&#10095;";
         gallery.prevBtn.classList.add("btn-next");
         gallery.prevBtn.tabIndex = -1;
         gallery.prevBtn.onclick = function (ev) { gallery.transit(1); }
         ul.appendChild(gallery.prevBtn);
     }
     gallery.timeout = null;

     var getNextIdx = function(shift) {
           var idx = parseInt(gallery.dataset.idx) + shift;
           if (idx == lis.length) idx = 0;
           if (idx == -1) idx = lis.length-1;
           return idx;
     }

     gallery.transit = function(shift) {
       window.clearTimeout(gallery.timeout);
       lis.item(this.dataset.idx).classList.remove("active");
       this.dataset.idx = getNextIdx(shift);
       lis.item(this.dataset.idx).classList.add("active");
       var img = lis.item(this.dataset.idx).getElementsByTagName("img")[0];
       if ( img.dataset.origsrc != img.src ) imgLoadOrigin( img );
       // preload next image
       var nextImg = lis.item(getNextIdx(1)).getElementsByTagName("img")[0];
       if ( nextImg.dataset.origsrc != nextImg.src ) imgLoadOrigin( nextImg );
       gallery.timeout = window.setTimeout(function(){ gallery.transit(1); }, 10000);
     }

     gallery.transit(gallery,0);

     })(galleries.item(galleryIdx));
}