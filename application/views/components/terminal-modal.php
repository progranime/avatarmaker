<div class="modal fade" id="terminal-modal" role="dialog">
    <div class="modal-dialog modal-lg">

        <!-- Group Download Modal content-->
        <div class="modal-content terminal-modal--container">
            
            <div class="modal-header">
                <div class="align-self-start p-4">
                    <i class="fa fa-arrow-left fa-2x btn-back icon icon--md"></i>
                </div>
                <div class="align-self-end">
                    <a href="#" data-dismiss="modal"><img src="<?=base_url('public/images/icons/close.png');?>"></a>
                </div>
            </div>

            <div class="modal-body">
                <div class="row">
                	<div class="col-12 col-sm-6">
                		<div class="img-holder">
                			<!-- Output the svg here -->
                		</div>
                	</div>
                	<div class="col-12 col-sm-6 align-self-center text-center" >
                		<!-- Download and Saving Options -->
                		<h1 class="header">Congratulations!</h1>
                		<p class="sub-header">You successfully made your own Avatar</p>

                		<ul class="terminal-modal--options" style="margin: 30px 0px;">
                			<li class="downloads">
                				<img src="<?=base_url('public/images/icons/finish-download.png');?>" /> 
                				<p><strong>Downloads</strong></p>
                				<div class="downloads-dropdown">
                					<p class="text-center"><strong>Save As</strong></p>
                					<div class="download-options download-type">
                						<a href="#" class="btn btn--shade btn-download-type is-active" data-option="png">PNG</a>
                						<a href="#" class="btn btn--shade btn-download-type" data-option="jpg">JPG</a>
                					</div>

                					<p class="text-center mar-top"><strong>Size</strong></p>
                					<div class="download-options download-size">
                						<a href="#" class="btn btn--shade btn-download-size is-active" data-option="1">250 x 350</a>
		                                <a href="#" class="btn btn--shade btn-download-size" data-option="2">500 x 700</a>
		                                <a href="#" class="btn btn--shade btn-download-size" data-option="3">750 x 1050</a>
                					</div>
									
									<div class="mt-3">
										<a href="#" class="btn btn--standard btn-download">Download</a>
									</div>
                				</div>
                			</li>
                			<li class="save <?=$this->session->has_userdata('username') ? '' : 'is-disabled--link' ;?>">
                				
                                <img src="<?=base_url('public/images/icons/finish-save.png');?>" />
                				<p><strong>Save</strong></p>
                				<div class="save-dropdown">
                					<form action="<?=base_url('post/saveAvatar');?>" method="post" id="saveForm" class="form-container">
                                        <input type="hidden" name="svg" class="txt-svg">
                						<input type="hidden" name="gender" class="txt-gender">
                						<div class="form-section">
                							<label for="name">AVATAR NAME</label>
                							<input type="text" class="text-center" name="name" id="name" placeholder="Sample Name" required>
                						</div>
                						<div class="form-section">
                							<label for="description">DESCRIPTION</label>
                							<input type="text" class="text-center" name="description" id="description" placeholder="Sample Description" required>
                						</div>
                						<div class="form-section">
                							<input type="submit" class="btn btn--standard btn-save" name="save" value="SUBMIT">
                						</div>
                					</form>
                				</div>
                			</li>
                			<li data-dismiss="modal">
                				<img src="<?=base_url('public/images/icons/finish-design.png');?>" />
                				<p><strong>Keep Designing</strong></p>
                			</li>
                		</ul>
                	</div>
                </div>
            </div>

            <div class="modal-footer">
            	<p class="flash-message"></p>
            </div>
            
        </div>

    </div>
</div>