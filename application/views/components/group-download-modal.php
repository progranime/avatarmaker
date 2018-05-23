<div class="modal fade" id="group-download-modal">
	<div class="modal-dialog modal-lg">
		 <div class="modal-content">
            
            <div class="modal-header align-self-end">
                <a href="#" data-dismiss="modal" style="z-index: 1;"><img src="<?=base_url('public/images/icons/close.png');?>"></a>
            </div>

            <div class="modal-body">
               	<div class="row group-download-container">
               		<div class="col-12 col-sm-6 align-self-center">
               			<?php $this->load->view('templates/group-download-list.html'); ?>
               		</div>
               		<div class="col-12 col-sm-6 align-self-center">
               			<div class="group-download-options">
                            <p class="my-2">SAVE AS</p>
                            <div class="group-download-type row m-0">
                                <a href="#" class="btn btn--shade btn-download-type col-6 is-active" data-option="jpg">JPG</a>
                                <a href="#" class="btn btn--shade btn-download-type col-6" data-option="png">PNG</a>
                            </div>

                            <p class="my-2">SIZE</p>
                            <div class="group-download-size row m-0">
                                <a href="#" class="btn btn--shade btn-download-size col-4 is-active" data-option="1">250 x 350</a>
                                <a href="#" class="btn btn--shade btn-download-size col-4" data-option="2">500 x 700</a>
                                <a href="#" class="btn btn--shade btn-download-size col-4" data-option="3">750 x 1050</a>
                            </div>
                        </div>
               		</div>
               	</div>

                <div class="row my-3">
                    <div class="col-12 text-center">
                        <input type="button" class="btn btn--standard btn-group-download" value="Group Download">
                    </div>
                </div>
            </div>
            
        </div>
	</div>
</div>