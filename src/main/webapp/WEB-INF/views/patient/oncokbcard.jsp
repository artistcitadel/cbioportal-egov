<%--
<div class="oncokb-card" data-test='oncokb-card'>
    <div>
        &lt;%&ndash;{!this.props.geneNotExist && (&ndash;%&gt;
        <span>
          <div class="tabs-wrapper">
            <div class="title" data-test="oncokb-card-title">
              title
            </div>
            <div class="tabs">
              <div key="oncogenicity" class="tab enable-hover">
                <a class="oncogenicity tab-title-a enable-hover-a enable-hover-active" onClick="handleOncogenicityTabSelect()">
                  <span class="tab-title">clinical implications</span>
                  <span class="tab-subtitle">
                        Likely Oncogenic
                  </span>
                </a>
              </div>
              <div key="mutationEffect" class="tab enable-hover">
                  <a class="mutation-effect tab-title-a enable-hover-a"
                     &lt;%&ndash;this.activeTab === "mutationEffect" ? mainStyles["enable-hover-active"] : '')&ndash;%&gt;
                  onClick="handleMutationEffectTabSelect()" >
                      <span class="tab-title">Biological Effect</span>
                      <span class="tab-subtitle">
                          Likely Gain-of-function
                      </span>
                  </a>
              </div>
              <div class="indicator"/>
            </div>





         </div>
        </span>
     </div>
  </div>--%>


<%--<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp"
          crossorigin="anonymous">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB"
          crossorigin="anonymous">
    &lt;%&ndash;<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.css" />&ndash;%&gt;

</head>--%>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB"
      crossorigin="anonymous">
<body>
<div class="container">
    <header id="main-header">
        <div class="row no-gutters">
            <div class="col-lg-8 col-md-7">
                <div class="d-flex flex-column">


                    <div class="p-4 bg-black">

                    </div>

                    <div>
                        <p class="p-2 mb-3 bg-dark text-white" style="width:425px;-webkit-margin-after-collapse: discard">
                            GENE NAME * PROTEIN Change
                        </p>
                        <div class="d-flex flex-row text-white align-items-stretch text-center">
                            <div class="port-item p-4 bg-primary" data-toggle="collapse" data-target="#home">
                                <span class="d-none d-sm-block">CLINICAL IMPLCATIONS</span>
                                <span class="d-none d-sm-block">LIkely Oncogenic</span>
                            </div>
                            <div class="port-item p-4 bg-success" data-toggle="collapse" data-target="#resume">
                                <span class="d-none d-sm-block">BIOLOGICAL EFFECT</span>
                                <span class="d-none d-sm-block">Likely Loss-of-function</span>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- HOME -->
    <div id="home" class="collapse show" style="width:425px;">
        <div class="card-deck">
        <div class="card">
            <div class="card-body">
                <%--<h4 class="card-title">Devmasters</h4>--%>
                <p class="card-text">gene desc</p>

            </div>
            <div class="card-footer">
                <%--<h6 class="text-muted">
                  Levels
                </h6>--%>
                <%--<h6 class="text-muted">

                </h6>--%>
                <div id="accordion">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <div href="#collapse1" data-toggle="collapse" data-parent="#accordion">
                                    <i class="fas fa-arrow-circle-down"></i> Levels
                                </div>
                            </h5>
                        </div>

                        <div id="collapse1" class="collapse hide">
                            <div class="card-body">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit odit laborum qui, debitis, sequi dolores nobis mollitia
                                labore quasi earum laboriosam nihil cupiditate magnam iusto nostrum doloremque accusantium repudiandae
                                expedita autem et, repellendus suscipit consequatur! Alias, maiores amet sunt ab inventore illo, deleniti
                                facilis consequatur tenetur nam pariatur fuga nisi!
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        </div>


    </div>

    <!-- RESUME -->
    <div id="resume" class="collapse">
        <div class="card-deck">
            <div class="card">
                <div class="card-body">
                    <%--<h4 class="card-title">Devmasters</h4>--%>
                    <p class="card-text">PMID</p>

                </div>
                <div class="card-footer">
                    <%--<h6 class="text-muted">
                      Levels
                    </h6>--%>
                    <%--<h6 class="text-muted">

                    </h6>--%>
                    <div id="accordion">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">
                                    <div href="#collapse2" data-toggle="collapse" data-parent="#accordion">
                                        <i class="fas fa-arrow-circle-down"></i> Levels
                                    </div>
                                </h5>
                            </div>

                            <div id="collapse2" class="collapse show">
                                <div class="card-body">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit odit laborum qui, debitis, sequi dolores nobis mollitia
                                    labore quasi earum laboriosam nihil cupiditate magnam iusto nostrum doloremque accusantium repudiandae
                                    expedita autem et, repellendus suscipit consequatur! Alias, maiores amet sunt ab inventore illo, deleniti
                                    facilis consequatur tenetur nam pariatur fuga nisi!
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>

    <!-- WORK -->
    <div id="work" class="collapse">
        <div class="card card-body bg-warning text-white py-5">
            <h2>My Work</h2>
            <p class="lead">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, ut!</p>
        </div>

        <div class="card card-body py-5">
            <h3>What Have I Built?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum nostrum repudiandae debitis, nam iste amet.</p>
            <div class="row no-gutters">
                <div class="col-md-3">
                    <a href="https://unsplash.it/1200/768.jpg?image=252" data-toggle="lightbox">
                        <img src="https://unsplash.it/600.jpg?image=252" alt="" class="img-fluid">
                    </a>
                </div>
                <div class="col-md-3">
                    <a href="https://unsplash.it/1200/768.jpg?image=253" data-toggle="lightbox">
                        <img src="https://unsplash.it/600.jpg?image=253" alt="" class="img-fluid">
                    </a>
                </div>
                <div class="col-md-3">
                    <a href="https://unsplash.it/1200/768.jpg?image=254" data-toggle="lightbox">
                        <img src="https://unsplash.it/600.jpg?image=254" alt="" class="img-fluid">
                    </a>
                </div>
                <div class="col-md-3">
                    <a href="https://unsplash.it/1200/768.jpg?image=255" data-toggle="lightbox">
                        <img src="https://unsplash.it/600.jpg?image=255" alt="" class="img-fluid">
                    </a>
                </div>
            </div>

            <div class="row no-gutters">
                <div class="col-md-3">
                    <a href="https://unsplash.it/1200/768.jpg?image=256" data-toggle="lightbox">
                        <img src="https://unsplash.it/600.jpg?image=256" alt="" class="img-fluid">
                    </a>
                </div>
                <div class="col-md-3">
                    <a href="https://unsplash.it/1200/768.jpg?image=257" data-toggle="lightbox">
                        <img src="https://unsplash.it/600.jpg?image=257" alt="" class="img-fluid">
                    </a>
                </div>
                <div class="col-md-3">
                    <a href="https://unsplash.it/1200/768.jpg?image=258" data-toggle="lightbox">
                        <img src="https://unsplash.it/600.jpg?image=258" alt="" class="img-fluid">
                    </a>
                </div>
                <div class="col-md-3">
                    <a href="https://unsplash.it/1200/768.jpg?image=259" data-toggle="lightbox">
                        <img src="https://unsplash.it/600.jpg?image=259" alt="" class="img-fluid">
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- CONTACT -->
    <div id="contact" class="collapse">
        <div class="card card-body bg-danger text-white py-5">
            <h2>Contact</h2>
            <p class="lead">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, ut!</p>
        </div>

        <div class="card card-body py-5">
            <h3>Get In Touch</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quos illo, dicta id voluptates enim.</p>
            <form>
                <div class="form-group">
                    <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                <span class="input-group-text bg-danger text-white">
                  <i class="fas fa-user"></i>
                </span>
                        </div>
                        <input type="text" class="form-control bg-dark text-white" placeholder="Name">
                    </div>
                </div>

                <div class="form-group">
                    <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                <span class="input-group-text bg-danger text-white">
                  <i class="fas fa-envelope"></i>
                </span>
                        </div>
                        <input type="email" class="form-control bg-dark text-white" placeholder="Email">
                    </div>
                </div>

                <div class="form-group">
                    <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                <span class="input-group-text bg-danger text-white">
                  <i class="fas fa-pencil-alt"></i>
                </span>
                        </div>
                        <textarea class="form-control bg-dark text-white" placeholder="Name"></textarea>
                    </div>
                </div>

                <input type="submit" value="Submit" class="btn btn-danger btn-block btn-lg">
            </form>
        </div>
    </div>


    <!-- FOOTER -->
    <footer id="main-footer" class="p-5 text-black" style="width:425px;">
        <div class="row">
            <div class="col-md-6">
             <img src="/js/page/patient/images/oncokb_logo.png" class="oncokb-logo" />
            </div>
        </div>
    </footer>
</div>


<%--<script src="http://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T"
        crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.min.js"></script>--%>

<script>
    $('.port-item').click(function () {
        $('.collapse').collapse('hide');
    });

    // $(document).on('click', '[data-toggle="lightbox"]', function (e) {
    //     e.preventDefault();
    //     $(this).ekkoLightbox();
    // });
</script>
</body>

<%--
</html>--%>
