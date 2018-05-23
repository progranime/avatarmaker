<!-- Thumbnail Modal -->
<div class="modal fade" id="thumbnail-modal" role="dialog">
    <div class="modal-dialog modal-lg">

        <!-- Group Download Modal content-->
        <div class="modal-content thumbnail-modal-container">
            
            <div class="modal-header align-self-end">
                <a href="#" data-dismiss="modal"><img src="<?=base_url('public/images/icons/close.png');?>"></a>
            </div>

            <div class="modal-body row">
                <div class="col-12 col-sm-6 align-self-center">
                    <div class="img-holder">
                        <!-- SVG will be put here -->
                    </div>
                </div>
                <div class="col-12 col-sm-6 align-self-center">
                    <div class="row">
                        <div class="col-12 col-sm-12">
                            <!-- <span class="title"></span> -->
                            <h1 class="title text-uppercase"> </h1> 
                            <!-- <a href="javascript:void(0)" data-toggle="popover" data-content="" data-placement="bottom" class="description"><img src="img/info.png" /></a> -->
                            <p class="description"></p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <div class="download-options">
                                <p class="my-4">SAVE AS</p>
                                <div class="thumbnail-download-type row m-0">
                                    <a href="#" class="btn btn--shade btn-download-type col-6 is-active" data-option="jpg">JPG</a>
                                    <a href="#" class="btn btn--shade btn-download-type col-6" data-option="png">PNG</a>
                                </div>

                                <p class="my-4">SIZE</p>
                                <div class="thumbnail-download-size row m-0">
                                    <a href="#" class="btn btn--shade btn-download-size col-4 is-active" data-option="1">250 x 350</a>
                                    <a href="#" class="btn btn--shade btn-download-size col-4" data-option="2">500 x 700</a>
                                    <a href="#" class="btn btn--shade btn-download-size col-4" data-option="3">750 x 1050</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                
            </div>

            <div class="my-3 text-center">
                <input type="button" class="btn btn--standard btn-download" value="Download">
            </div>
            
        </div>

    </div>
</div>