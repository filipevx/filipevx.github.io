$(document).ready(function(){var e;$(".home__banner").slick({dots:!0,infinite:!0,slidesToShow:1,slidesToScroll:1,arrows:!1}),(e=sessionStorage.getItem("minicartCounter"))&&$(".header__minicart .minicart__counter span").html(e),$.ajax({url:"https://corebiz-test.herokuapp.com/api/v1/products",type:"GET"}).done(function(e){e.map(e=>$(".home__shelf .container ul.shelf").append(`<li class="shelf__item">
	        	<a href="#linkproduto" title="${e.productName}">
	          	<img class='shelf__image' loading='lazy' src="${e.imageUrl}" alt="${e.productName}" width="216" height="200"/>
	          </a>
			  ${e.listPrice?"<span class='shelf__flag shelf__flag--off'>off</span> </span>":""}
	          <div class='shelf__content'>
		          <a href="#linkproduto" title="${e.productName}"><p class='shelf__name'>${e.productName}</p></a>
		          <span class='shelf__rating shelf__rating--${e.stars}'>${e.stars}</span>
		          ${e.listPrice?`<span class='shelf__listprice'>de <span>${(e.listPrice/100).toLocaleString("pt-BR",{style:"currency",currency:"BRL"}).replace(".",",")}</span> </span>`:"<span class='shelf__listprice'></span>"}
		          ${e.listPrice?`<span class='shelf__bestprice'> por ${(e.price/100).toLocaleString("pt-BR",{style:"currency",currency:"BRL"}).replace(".",",")} </span>`:`<span class='shelf__bestprice'> ${(e.price/100).toLocaleString("pt-BR",{style:"currency",currency:"BRL"}).replace(".",",")} </span>`}
		          ${e.installments[0]?`<span class='shelf__installments'> ou ${e.installments[0].quantity}x de  ${(e.installments[0].value/100).toLocaleString("pt-BR",{style:"currency",currency:"BRL"}).replace(".",",")}</span>`:"<span class='shelf__installments'></span>"}
		          <button class='shelf__buybutton' type='button'>comprar</button>
	          </div>
	        </li>`)),$(".home__shelf .container ul.shelf").slick({dots:!1,infinite:!0,slidesToShow:4,slidesToScroll:1,arrows:!0,responsive:[{breakpoint:991,settings:{slidesToShow:2,slidesToScroll:1,dots:!0,arrows:!1}}]}),setTimeout(function(){$(".home__shelf .container ul.shelf").removeClass("shelf--loading")},150)}).fail(function(e,s){console.log("error loading products",s)}),$("body").on("click",".shelf__item .shelf__buybutton",function(){let e=$(this),s=$(".header__minicart .minicart__counter span");var t=s.html(),t=parseInt(t)+1;s.html(t),sessionStorage.setItem("minicartCounter",t),$(this).addClass("js-loading"),setTimeout(function(){e.removeClass("js-loading"),e.after("<span class='shelf__alert'>o produto foi adicionado!</span>")},800),setTimeout(function(){$(".shelf__alert").remove()},3e3)}),$("#newsletter").submit(function(e){e.preventDefault(),$("#newsletter").addClass("js-loading"),$("#newsletter input").each(function(){var e;$(this).val()?($(this).parent("div").removeClass("error"),e={email:$("#newsletter #email").val(),name:$("#newsletter #name").val()},$.ajax({contentType:"application/json; charset=utf-8",type:"POST",url:"https://corebiz-test.herokuapp.com/api/v1/newsletter",data:JSON.stringify(e)}).done(function(e){console.log(e,"success"),$(".footer__newsletter").addClass("success"),$("#newsletter").removeClass("js-loading")}).fail(function(e,s){console.log(s,"error"),$("#newsletter").removeClass("js-loading")})):($(this).parent("div").addClass("error"),$("#newsletter").removeClass("js-loading"))})}),$("body").on("click",".newsletter-reset",function(){$(".footer__newsletter").removeClass("success"),$("#newsletter input").val("")})});