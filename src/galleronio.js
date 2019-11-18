var imgLoadOrigin = function(item) {
    var image = new Image();
    image.addEventListener('load', function () { item.src = image.src; });
    image.src = item.dataset.origsrc;
}

var galleries = document.getElementsByClassName("galleronio");

for (var galleryIdx=0; galleryIdx < galleries.length; galleryIdx++) {
    (function(gallery){
    gallery.dataset.idx = 0;
    var lis = gallery.getElementsByTagName("li");
    var img = gallery.getElementsByTagName("img");
    for (var i=0;i<img.length;i++) {
         var item = img.item(i);
         item.dataset.origsrc = item.src;
         item.src = "images/loader.gif";
     }

     gallery.nextBtn = gallery.getElementsByClassName("btn-next")[0];
     gallery.prevBtn = gallery.getElementsByClassName("btn-prev")[0];
     gallery.nextBtn.tabIndex = gallery.prevBtn.tabIndex = -1;

     gallery.transit = function(shift) {
       lis.item(this.dataset.idx).classList.remove("active");
       this.dataset.idx = parseInt(this.dataset.idx) + shift;
       if (this.dataset.idx == lis.length) this.dataset.idx = 0;
       if (this.dataset.idx == -1) this.dataset.idx = lis.length-1;
       lis.item(this.dataset.idx).classList.add("active");
       var img = lis.item(this.dataset.idx).getElementsByTagName("img")[0];
       if ( img.dataset.origsrc != img.src ) imgLoadOrigin( img );


     }

     gallery.nextBtn.onclick = function (ev) { console.log(ev); gallery.transit(1); }
     gallery.prevBtn.onclick = function (ev) { gallery.transit(-1); }

     gallery.transit(gallery,0);
     })(galleries.item(galleryIdx));
}