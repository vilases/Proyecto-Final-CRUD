document.getElementById("header").innerHTML=` 
<div class="p-3 mb-2 bg-info-subtle text-emphasis-info" style="background-color: rgb(5, 254, 221)">
    <p class="text-center fs-1" >Bruma Sahumerios <img id="indeximg" src="../img/Bruma.png" style="width: 130px; height: 130px ;" /></p>
</div>
<nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container">
        <a class="navbar-brand" href="index.html">HOME</a>
        <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
            <ul class="navbar-nav me-auto mt-2 mt-lg-0">

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">MENU</a>
                    <div class="dropdown-menu" aria-labelledby="dropdownId">
                        <a class="dropdown-item" href="productos.html">Productos</a>
                        <a class="dropdown-item" href="#">Nosotros</a>
                        <a class="dropdown-item" href="#">Locales</a>
                    </div>
                </li>
            </ul>
            <form class="d-flex my-2 my-lg-0" action="productos1.html" method="GET">
                <input id="nombredato" name="nombre" class="form-control me-sm-2" type="text" placeholder="Search">
                <button class="btn btn-outline-success my-2 my-sm-0"type="submit">Search</button>
        </div>
    </div>
</nav>
`
document.getElementById("footer").innerHTML=`<h2><u><font size="3">Contactanos:</font></u></h2>
<div id="container1">
  <img id="image1" src="../img/wap.png" style="width:50px"/>
  <a id="text1" href="https://api.whatsapp.com/send?phone=541131258499">Bruma Wap</a>
</div>

<div id="container1">
  <img id="image1" src="../img/inst.png"style="width:50px" />
  <a id="text1" href = "https://instagram.com/bruma_sahumerios?igshid=YmMyMTA2M2Y=">@bruma_sahumerios</a>
</div>
<p>
    <br>
</p>`